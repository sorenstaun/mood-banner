Banner for MooD solutions
----
This repository provides a solution for MooD Active Enterprise to get a dismissable banner at the top of the page in different colours. 
The banner is produceded if needed based on data in a banner.json file, which allows a non-intrusive way to show a banner or remove it 
for releases or performance issues on your network etc.

```jsonc
   [
     {
      "type": "warning",
      "start": "2 Apr 2024 12:00:00 GMT", //Banner is only shown between this date
      "end": "31 Dec 2024 12:00:00 GMT",  //and this date
      "text": "This is a text directly from the json file - try <a href='https://google.com' target='_new'>Google</a>!",
      "title": "Test warning banner",
      "button": "Close"
     }
   ]
```

Installation
---
- Create an XHTML block on your screen
- Copy banner.html to HTML section
- Copy the banner.css to the CSS section
- Create a banner.json file in your Active Publisher root (see example provided in this repository)

![MooD Banner example](https://raw.githubusercontent.com/sorenstaun/mood-banner/main/example.png)
