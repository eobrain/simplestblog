import fs from 'node:fs/promises'
import { glob } from 'glob'
import showdown from 'showdown'
import { mkdirIfNecessary } from './file.js'
import Mustache from 'mustache'
import { extractFrontMatter } from './frontmatter.js'
import { pp } from 'passprint'
import util from 'util'
import childProcess from 'child_process'

const exec = util.promisify(childProcess.exec)

const converter = new showdown.Converter({ tables: true })

// Read metadata
const config = JSON.parse(await fs.readFile('content/config.json'))
const pageMetadata = []
for (const path of await glob('content/pages/*.md')) {
  const { frontMatter } = extractFrontMatter(await fs.readFile(path, 'utf8'))
  frontMatter.slug = path.match(/^content\/pages\/(.*)\.md$/)[1]
  pageMetadata.push(pp(frontMatter))
}
const postMetadata = []
for (const path of await glob('content/posts/*.md')) {
  const { frontMatter } = extractFrontMatter(await fs.readFile(path, 'utf8'))
  frontMatter.slug = path.match(/^content\/posts\/(.*)\.md$/)[1]
  postMetadata.push(pp(frontMatter))
}
postMetadata.sort((a, b) => a.created < b.created ? 1 : -1)

const draftMetadata = []
for (const path of await glob('content/drafts/*.md')) {
  const { frontMatter } = extractFrontMatter(await fs.readFile(path, 'utf8'))
  frontMatter.slug = path.match(/^content\/drafts\/(.*)\.md$/)[1]
  draftMetadata.push(pp(frontMatter))
}

const siteDir = '_site'
await mkdirIfNecessary(siteDir)
await exec(`(cd content && tar -cf - img) | (cd ${siteDir} && tar -xf -)`)

const head = await fs.readFile('layout/head.html', 'utf8')

async function renderWrite (markdown, { slug, title, created, image }, template, description, prev, next) {
  const contentHtml = converter.makeHtml(markdown)
  const rendered = Mustache.render(template, {
    title,
    description,
    // author,
    created,
    image,
    siteName: config.siteName,
    site: config.host,
    slug,
    // me
    pageMetadata,
    contentHtml,
    prev,
    next
  }, { head })
  await fs.writeFile(`${siteDir}/${slug}.html`, rendered)
}

async function readRenderWrite (dir, { slug, title, created, image }, template, prev, next) {
  const { markdown } = extractFrontMatter(await fs.readFile(`content/${dir}/${slug}.md`, 'utf8'))
  const descriptionMatch = markdown.match(/[A-Z].*\./)
  const description = descriptionMatch ? descriptionMatch[0] : title
  await renderWrite(markdown, { slug, title, created, image }, template, description, prev, next)
}

const pageTemplate = await fs.readFile('layout/page.html', 'utf8')
const postTemplate = await fs.readFile('layout/post.html', 'utf8')
const homeTemplate = await fs.readFile('layout/home.html', 'utf8')

// Convert markdown to HTML and write to site directory
for (const { slug, title } of pageMetadata) {
  pp(slug)
  await readRenderWrite('pages', { slug, title }, pageTemplate, title)
}
for (let i = 0; i < postMetadata.length; i++) {
  await readRenderWrite('posts', postMetadata[i], postTemplate, postMetadata[i - 1], postMetadata[i + 1])
}

// Generate home page
let homeContent = ''
for (const { slug, title, created } of postMetadata) {
  homeContent += `* [${title}](${slug}.html) - <time>${created}</time>\n`
}
await renderWrite(homeContent, { slug: 'index', title: config.siteName }, homeTemplate)
