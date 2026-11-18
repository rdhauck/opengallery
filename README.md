# Open Gallery

A small museum website that teaches design students how modern websites are built. It shows routing, page templates, reusable components, design tokens and a live API call.

Artwork data and images come from the [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/). This project is not affiliated with the museum.

## Run it

You need [Node.js](https://nodejs.org/) 22.12 or newer.

```bash
npm install
npm run dev
```

Then open the address shown in the terminal, usually http://localhost:5173.

## Where to look

| Idea | File |
| --- | --- |
| Routes (the site map) | `src/App.jsx` |
| Shared header and footer | `src/layouts/SiteLayout.jsx` |
| Page templates | `src/templates/` |
| Pages that fill the templates | `src/pages/` |
| Reusable components | `src/components/` |
| The API call | `src/api/artworks.js` |
| Loading, success and error logic | `src/hooks/useArtworks.js` |
| Colors, type and spacing | `src/styles/tokens.css` |

`src/blueprint/` holds the Blueprint Mode teaching overlay. A production site wouldn't include it.

## Classroom exercises

1. **Restyle the site.** Change the color and font values in `src/styles/tokens.css`.
2. **Redesign a template.** Move the image to the right in `src/styles/templates.css`, then open several artworks.
3. **Redesign a component.** Change `src/components/ArtworkCard.jsx` and find everywhere it appears.
4. **Add a page.** Create a page in `src/pages/`, add its route to `src/App.jsx`, and link to it from `src/components/SiteHeader.jsx`. Add it to `src/blueprint/routeMap.js` too, so the Blueprint panel can name it.
5. **Show new data.** Add the `culture` field to the card in `ArtworkCard.jsx`.
6. **Design for failure.** Use Blueprint's Network section to review the slow, failed and empty states.

## No internet?

Choose **Sample** in Blueprint's Network section, or press **Use saved sample artworks** on the error screen. The site then runs from artworks saved in this project.
