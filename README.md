# Simplest Blog

Create a blog by editing markdown files.

## Hosting your own blog on GitHub

1. Fork this repo if you have not already done so
2. On the repo page, click "Actions"
3. Click the button to enable actions
4. On the repo page, click "Settings --> Pages -> Source" and choose "GitHub Actions"
5. Add content in the `content/` directory following the pattern in `content-demo`:
    1. "Edit file --> Create new file"  `content/config.json` and add content of the form:
      ```json
      {
        "siteName": "Blog Name",
        "siteDescription": "A description of the blog",
        "host": "https://some-blog-site.com"
      }
      ```
    2. At least one file ending in `.md` in the `pages/` directory with content of the form
    ```markdown
    ---
    index: 0
    title: About
    ---
    Something about this blog
    ```
    3. At least one file ending in `.md` in the `posts/` directory with content of the form
    ```markdown
    ---
    created: 2024-02-20
    title: Some title
    ---
    Some text
    ```
6. Go to https://eobrain.github.io/simplestblog/ but replace "eobrain" with your GitHub username. You should see the content.
 
## See a Demo

1. Fork this repo
2. At command line:
  ```sh
  nvm use
  npm install
  npm run demo
  ```
3. This will copy `content-demo/` to `content/` and starts a development server that you can view in your browser. 
4. To create your own entries, edit the markdown files in `content/posts` and `content/pages` and then at the command line:   
  ```sh
  npm start
  ```


