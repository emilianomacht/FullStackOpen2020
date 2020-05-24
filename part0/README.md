### 0.4: new note

`title New Note`

`browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note`
`server-->browser: HTTP 302: URL redirect: "/notes"`
`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes`
`server-->browser: HTML-code`
`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css`
`server-->browser: main.css`
`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js`
`server-->browser: main.js`

`note over browser:`
`browser starts executing js-code`
`that requests JSON data from server` 
`end note`

`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json`
`server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]`

`note over browser:`
`browser executes the event handler`
`that renders notes to display`
`end note`

![](/0.4_new_note.png)

### 0.5: Single page app

`title Single Page App`

`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa`
`server-->browser: HTML-code`
`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css`
`server-->browser: main.css`
`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js`
`server-->browser: spa.js`

`note over browser:`
`browser starts executing js-code`
`that requests JSON data from server` 
`end note`

`browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json`
`server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]`

`note over browser:`
`browser executes the event handler`
`that renders notes to display`
`end note`

![](/0.5_single_page_app.png)

### 0.6: New note on single page app

`title New note on single Page App`

`note over browser:`
`browser parses content and` 
`date of new post as JSON`
`end note`

`note over browser:`
`"Content type" header tells`
`server it's JSON data`
`end note`

`browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa`
`server-->browser: HTTP 201: Created`

`end note`

![](/0.6_new_note_single_page_app.png)

