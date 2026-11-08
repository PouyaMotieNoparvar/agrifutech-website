# AgriFuTech website

Public introduction site for the AgriFuTech project (University of Galway, supported by the Research Ireland ARC Hub).
Plain HTML, CSS and JavaScript, with no build step, cookies, trackers or third-party scripts. Published with GitHub Pages.

This repository holds the website only. The AgriFuTech platform code is kept in a separate private repository.

## Updating the content

| What | Where |
|---|---|
| Platform stages, progress timeline, news and events | `content.js` (plain data; each field is explained at the top of the file) |
| Text of the page, team, partners and contact | `index.html` |
| Colours and layout | `styles.css` (light and dark themes at the top) |

An event looks like this in `content.js`:

```js
events: [
  { date: "2027-02-12", title: "AgriFuTech demonstration", place: "Ryan Institute, University of Galway" }
]
```

Dates are `YYYY-MM-DD`, or `YYYY-MM` when only the month is known. Commit and push to `main`; GitHub Pages republishes
the site within a minute or two.

## Preview locally

```bash
python -m http.server 8765
```

Then open http://127.0.0.1:8765.

## Content rules

- Describe capabilities and progress at a high level. Do not publish confidential method details, partner data, or
  results on third-party datasets before their owners have been contacted.
- Example figures must be synthetic and labelled as such.
