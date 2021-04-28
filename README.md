# ankiJS
Simple script for converting html output (from Markdown) to Anki CSV.


https://cdn.jsdelivr.net/gh/dominikue/ankiJS@main/ankiJS.js

https://docs.ankiweb.net/#/importing?id=importing

## How-to

1. Include download button for flashcard in the html site.

```html
<button id="btn_dowload">Download flashcards as csv</button>
```

2. Include jquery and ankiJS to html file.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/dominikue/ankiJS@main/ankiJS.js"></script>
```

3. Include Q & A inside your file.

```markdown code
> > 210428-164027
> > Question with **bold**
> > and a second line.
> > > This is the _answer_.
```

4. Click on the download button and download all questions as CSV file.
