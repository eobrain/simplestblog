---
created: 2024-02-28
title: Classless Tufte CSS
---
Dave Liepmann (with classless modifications by Éamonn O'Brien-Strain)

Classless Tufte CSS provides tools to style web articles using the ideas demonstrated by Edward Tufte’s books and handouts. Tufte’s style is known for its simplicity, extensive use of sidenotes, tight integration of graphics with text, and carefully chosen typography.

The original Tufte CSS was created by [Dave Liepmann][1] and is now an Edward Tufte project. The original idea was cribbed from [Tufte-LaTeX][2] and [R Markdown’s Tufte Handout format][3]. Dave gave hearty thanks to all the people who have contributed to those projects.

Classless Tufte CSS is a small modification by Éamonn O'Brien-Strain to remove reliance on `class` attributes, so that it can be applied to fully semantic HTML. Éamonn in turn gives a hearty thanks to Dave for all the work in putting together the Tufte CSS tools.

If you see anything that Classless Tufte CSS could improve, Éamonn welcomes your contribution in the form of an issue or pull request on the GitHub project: [tufte-css][4]. Please note the [contribution guidelines][5].

The majority of the text on this page is by Dave. Éamonn has changed it only where the classless differences required.

Finally, a reminder about the goal of this project. The web is not print. Webpages are not books. Therefore, the goal of Tufte CSS is not to say “websites should look like this interpretation of Tufte’s books” but rather “here are some techniques Tufte developed that we’ve found useful in print; maybe you can find a way to make them useful on the web”. Tufte CSS is merely a sketch of one way to implement this particular set of ideas. It should be a starting point, not a design goal, because any project should present their information as best suits their particular circumstances.

<!--/section><section-->

## Getting Started

To use Classless Tufte CSS, simply add the following to your HTML document’s `head` block[^1]:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/eobrain/classless-tufte-css@v1.0.1/tufte.min.css">
```

[^1]: Alternatively, you can download the CSS and font files and host them yourself.  copy `tufte.css` and the `et-book` directory of font files to your project directory, then add the following to your HTML document’s `head` block:

```html
<link rel="stylesheet" href="tufte.css">
```

All other files in the repository can be ignored, as they are merely used by the demonstration document.</aside>

Now you just have to structure your semantic HTML as described in this document. For best results, View Source and Inspect Element frequently.

<!--/section><section-->

## Fundamentals

### Sections and Headings

Organize your document with an `article` element inside your `body` tag. Inside that, use `section` tags around each logical grouping of text and headings.

Tufte CSS uses `h1` for the document title, an immediatly following `p` for the document subtitle, `h2` for section headings, and `h3` for low-level headings. More specific headings are not supported. If you feel the urge to reach for a heading of level 4 or greater, consider redesigning your document:

> [It is] notable that the Feynman lectures (3 volumes) write about all of physics in 1800 pages, using only 2 levels of hierarchical headings: chapters and A-level heads in the text. It also uses the methodology of *sentences* which then cumulate sequentially into *paragraphs*, rather than the grunts of bullet points. Undergraduate Caltech physics is very complicated material, but it didn’t require an elaborate hierarchy to organize. <footer>[Edward Tufte, forum post, ‘Book design: advice and examples’ thread][6]</footer>

As a bonus, this excerpt regarding the use of headings provides an example of block quotes. In Tufte CSS they are just lightly styled, semantically correct HTML using `blockquote` and `footer` elements. See page 20 of <a href="https://www.edwardtufte.com/tufte/books_vdqi">The Visual Display of Quantitative Information</a> for an example in print,

<!--/section><section-->

In his later books[^2], Tufte starts each section with a bit of vertical space, a non-indented paragraph, and the first few words of the sentence set in small caps.

[^2] *[Beautiful Evidence][7]*

For this we simply start a `section` element with a paragraph (`p`), as demonstrated at the beginning of this section. Be consistent: though we do so in this section for the purpose of demonstration, do not alternate starting sections with a header elements and starting sections with a paragraph element. Pick one approach and stick to it.

### Text

Although paper handouts obviously have a pure white background, the web is better served by the use of slightly off-white and off-black colors. Tufte CSS uses `#fffff8` and `#111111` because they are nearly indistinguishable from their ‘pure’ cousins, but dial down the harsh contrast. We stick to the greyscale for text, reserving color for specific, careful use in figures and images.

In print, Tufte has used the proprietary Monotype Bembo font. A similar effect is achieved in digital formats with the now open-source <a href="https://github.com/edwardtufte/et-book">ETBook</a>, which Tufte CSS supplies with a `@font-face` reference to a .ttf file. In case ETBook somehow doesn’t work, Tufte CSS shifts gracefully to other serif fonts like Palatino and Georgia.[^3]

[^3]: See Tufte’s comment in the [Tufte book fonts][8] thread.

Also notice how Tufte CSS includes separate font files for bold (strong) and italic (emphasis), instead of relying on the browser to mechanically transform the text. This is typographic best practice.

<mark>If you want sans-serifs, use the `mark` element. It relies on Gill Sans, Tufte’s sans-serif font of choice.</mark>

Links in Tufte CSS match the body text in color and do not change on mouseover or when clicked.[^4] Here is a [dummy example][9] that goes nowhere. These links are underlined, since this is the most widely recognized indicator of clickable text.

[^4]: Blue text, while also a widely recognizable clickable-text indicator, is crass and distracting. Luckily, it is also rendered unnecessary by the use of underlining.

However, because most browsers’ default underlining does not clear descenders and is so thick and distracting, the underline effect is instead achieved using CSS trickery involving background gradients instead of standard `text-decoration`. Credit goes to Adam Schwartz for that technique.

As always, these design choices are merely one approach that Tufte CSS provides by default. Other approaches can also be made to work. The goal is to make sentences readable without interference from links, as well as to make links immediately identifiable even by casual web users.

<!--/section><section-->

## Epigraphs

> The English language . . . becomes ugly and inaccurate because our thoughts are foolish, but the slovenliness of our language makes it easier for us to have foolish thoughts.
> <footer>George Orwell, “Politics and the English Language”</footer>

> For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.
> <footer>Richard P. Feynman, <cite>“What Do You Care What Other People Think?”</cite></footer>
          
> I do not paint things, I paint only the differences between things.</p><footer>Henri Matisse, <cite>Henri Matisse Dessins: thèmes et variations</cite> (Paris, 1943), 37</footer>

If you’d like to introduce your page or a section of your page with some quotes, use epigraphs. Modeled after chapter epigraphs in Tufte’s books (particularly *Beautiful Evidence*), these are `blockquote` elements with a bit of specialized styling that only happens when they are immediatly after a `h2` header element. Quoted text is italicized. The source goes in a `footer` element inside the `blockquote`. We have provided three examples in the epigraph of this section, demonstrating shorter and longer quotes, with and without a paragraph tag, and showing how multiple quotes within an epigraph fit together with the use of a wrapper class.

<!--/section><section-->

## Sidenotes: Footnotes and Marginal Notes

One of the most distinctive features of Tufte’s style is his extensive use of sidenotes.[^5]

[^5] This is a sidenote.

Sidenotes are like footnotes, except they don’t force the reader to jump their eye to the bottom of the page, but instead display off to the side in the margin, if the page is wide enough.[^6] Perhaps you have noticed their use in this document already. You are very astute.

[^6]: If the page is not wide enough to have a margin, such as on a phone, then the marginal material will be presented indented in the main flow.

Sidenotes are a great example of the web not being like print. On sufficiently large viewports, Tufte CSS uses the margin for sidenotes, margin notes, and small figures. On smaller viewports, elements that would go in the margin are hidden until the user toggles them into view. The goal is to present related but not necessary information such as asides or citations *as close as possible* to the text that references them. At the same time, this secondary information should stay out of the way of the eye, not interfering with the progression of ideas in the main text.

Sidenotes consist of two elements: a superscript reference number that goes inline with the text, and a sidenote with content. To add the former, just put a label in a `sup` into the text where you want the reference to go, like so:

```html
<sup>3</sup>
```

You must manually assign a label to each side or margin note, replacing “3” in the example.

After the paragraph containing the sidenote reference in the main text goes the sidenote content itself, startign with the same `sup` label in an `aside`. This tag cannot be inserted directly in the middle of the body text. Make sure to position your sidenotes correctly by keeping the label close to the sidenote itself.

Lists that follow a paragraph are also put in the margin.

* `aside` elements are put in the margin
* `ol` elements immediatly after a `p` are put in the margin
* `ul` elements immediatly after a `p` are put in the margin
* `dl` elements immediatly after a `p` are put in the margin
        
Figures in the margin are created as margin notes, as demonstrated in the next section.
        
<!--/section><section-->

## Figures
        
Tufte emphasizes tight integration of graphics with text. Data, graphs, and figures are kept with the text that discusses them. In print, this means they are not relegated to a separate page. On the web, that means readability of graphics and their accompanying text without extra clicks, tab-switching, or scrolling.


Figures should try to use the `figure` element, which by default are constrained to the main column. Don’t wrap figures in a paragraph tag. Any label or margin note goes in a regular margin note inside the figure. For example, most of the time one should introduce a figure directly into the main flow of discussion, like so:
        
<figure>[^7]![Exports and Imports to and from Denmark & Norway from 1700 to 1780][10]</figure>

[^7]: From Edward Tufte, *Visual Display of Quantitative Information*, page 92.


[^8]: [Image of a Rhinoceros][11]F.J. Cole, “The History of Albrecht Dürer’s Rhinoceros in Zooological Literature,” *Science, Medicine, and History: Essays on the Evolution of Scientific Thought and Medical Practice* (London, 1953), ed. E. Ashworth Underwood, 337-356. From page 71 of Edward Tufte’s *Visual Explanations*.


But tight integration of graphics with text is central to Tufte’s work even when those graphics are ancillary to the main body of a text. In many of those cases, a margin figure may be most appropriate. To place figures in the margin, just wrap an image (or whatever) in a margin note inside a `p` tag, as seen to the right of this paragraph.

If you need a full-width figure, put it outside the `section` directly under an `article`, and it will take up (almost) the full width of the screen. This approach is demonstrated below using Edward Tufte’s English translation of the Napoleon’s March data visualization. From *Beautiful Evidence*, page 122-124.
        
<!--/section><section-->
      
One obstacle to creating elegant figures on the web is the difficulty of handling different screen sizes, especially on the fly. Embedded `iframe` elements are particularly troublesome. For these instances simply put the `iframe` inside a `figure` element. The most common use for this is probably YouTube videos, e.g.
      
```html
<figure>
  <iframe width="853" height="480" src="https://www.youtube.com/embed/YslQ2625TR4" frameborder="0" allowfullscreen></iframe>
</figure>
```
<figure><iframe width="853" height="480" src="https://www.youtube.com/embed/YslQ2625TR4" frameborder="0" allowfullscreen></iframe></figure>
        
You can use this class on a `div` instead of a `figure`, with slightly different results but the same general effect. Experiment and choose depending on your application.
        
<figure>![Figurative map of the successive losses of the French Army in the Russian campaign, 1812-1813][12]</figure>

## Code
        
Technical jargon, programming language terms, and code samples are denoted with the `code` class, as I’ve been using in this document to denote HTML. Code needs to be monospace for formatting purposes and to aid in code analysis, but it must maintain its readability. To those ends, Tufte CSS follows GitHub’s font selection, which shifts gracefully along the monospace spectrum from the elegant but rare Consolas all the way to good old reliable Courier.

Extended code examples should live in a `code` element within a `pre` element. This adds control over indentation and overflow as well:
        
```html
;; Some code examples in Clojure. This is a comment.

;; applying a function to every item in the collection
(map tufte-css blog-posts)
;;;; if unfamiliar, see http://www.lispcast.com/annotated-map

;; side-effecty loop (unformatted, causing text overflow) - from https://clojuredocs.org/clojure.core/doseq
(doseq [[[a b] [c d]] (map list (sorted-map :1 1 :2 2) (sorted-map :3 3 :4 4))] (prn (* b d)))

;; that same side-effecty loop, formatted
(doseq [[[a b] [c d]] (map list
                           (sorted-map :1 1 :2 2)
                           (sorted-map :3 3 :4 4))]
  (prn (* b d)))

;; If this proselytizing has worked, check out:
;; http://howistart.org/posts/clojure/1
```
<!--/section><section-->

## ImageQuilts
        
Tufte CSS provides support for Edward Tufte and Adam Schwartz’s [ImageQuilts][13]. See the [ET forum announcement thread][14] for more on quilts. Some have ragged edges, others straight. Include these images just as you would any other `figure`.

This is an ImageQuilt surveying Chinese calligraphy, placed in a full-width figure to accomodate its girth:
        
<figure>![Image of Chinese Calligraphy][15]</figure>

Here is an ImageQuilt of 47 animal sounds over and over, in a figure constrained to the main text region. This quilt has ragged edges, but the image itself is of course still rectangular.
      
<figure>![Image of animal sounds][16]</figure>

<!--/section><section-->

## Tables
        
Tables are a necessary evil. They are a powerful way to present data, but they are also a powerful way to present data poorly. Tufte CSS provides a few simple styles to make tables more readable while keeping the focus on the data itself.

Tables should be used sparingly, and only when the data would be difficult to understand in paragraph form. If you find yourself using tables often, consider whether your data would be better presented in a different format, or whether you are providing too much data at once.

Tables in Tufte CSS are styled to be readable and clear, but not overly styled. They are not meant to be the focus of the page, but rather a way to present data in a structured way. The goal is to make the data easy to read and understand, not to make the table itself the focus of the page.
        
Front-end web developer course 2021
|Person|Most interest in|Age|
|------|----------------|---|
|Chris|HTML tables|22|
|Dennis|Web accessibility|45|
|Sarah|JavaScript frameworks|29|
|Karen|Web performance|36|
||Average age|33|


## Epilogue
        
Many thanks go to Edward Tufte for leading the way with his work. It is only through his kind and careful editing that this project accomplishes what it does. All errors of implementation are of course mine.


[1]: http://www.daveliepmann.com
[2]: https://tufte-latex.github.io/tufte-latex/
[3]: http://rmarkdown.rstudio.com/tufte_handout_format.html
[4]: https://github.com/eobrain/classless-tufte-css
[5]: https://github.com/eobrain/classless-tufte-css#contributing
[6]: http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000hB
[7]: http://www.edwardtufte.com/tufte/books_be
[8]: http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0000Vt
[9]: #
[10]: img/exports-imports.png
[11]: img/rhino.png
[12]: img/napoleons-march.png
[13]: http://imagequilts.com/
[14]: http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0003wk
[15]: img/imagequilt-chinese-calligraphy.png
[16]: img/imagequilt-animal-sounds.png
