// PAGE: the written guide. It uses the same ArticleTemplate as the 404 page.

import { Link } from 'react-router';

import { useBlueprint } from '../blueprint/BlueprintContext.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import ArticleTemplate from '../templates/ArticleTemplate.jsx';

const SECTIONS = [
  { id: 'big-picture', label: 'The big picture' },
  { id: 'routing', label: 'Routing' },
  { id: 'templates', label: 'Templates' },
  { id: 'components', label: 'Components' },
  { id: 'data', label: 'Data from an API' },
  { id: 'tokens', label: 'Design tokens' },
];

const FLOW = [
  ['Address', 'The visitor goes to /collection/94979'],
  ['Route', 'App.jsx matches it to the artwork route'],
  ['Page', 'ArtworkPage asks the API for work 94979'],
  ['Template', 'DetailTemplate arranges the slots'],
  ['Components', 'Images, text and cards fill the slots'],
];

export default function HowItWorksPage() {
  const { on, toggle } = useBlueprint();

  return (
    <>
      <title>How it works | Open Gallery</title>
      <ArticleTemplate
        heading={
          <>
            <p className="eyebrow">The guide</p>
            <h1>How this website is built</h1>
            <p className="lede">
              A modern website is a system of reusable parts. If you’ve used components and
              variables in a design tool, you already know the main ideas.
            </p>
            <button type="button" className="button" onClick={toggle}>
              {on ? 'Turn off Blueprint' : 'Turn on Blueprint'}
            </button>
          </>
        }
        aside={
          <nav aria-label="On this page" className="toc">
            <p className="toc__title">On this page</p>
            <ol>
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ol>
          </nav>
        }
      >
        <section id="big-picture">
          <h2>The big picture</h2>
          <p>Every page on this site comes together in the same five steps.</p>
          <ol className="flow">
            {FLOW.map(([name, text]) => (
              <li key={name}>
                <strong>{name}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="routing">
          <h2>Routing</h2>
          <p>
            A <strong>route</strong> connects a web address to a page. Think of it as a site map the
            browser can follow. Moving between pages swaps only the middle of the screen, which is
            why the header never flickers.
          </p>
          <CodeBlock file="src/App.jsx">{`<Route index element={<HomePage />} />
<Route path="collection" element={<CollectionPage />} />
<Route path="collection/:id" element={<ArtworkPage />} />`}</CodeBlock>
          <p>
            The <code>:id</code> is a blank that the address fills in. That single line creates a
            page for every artwork in the collection.
          </p>
          <p className="try">
            <strong>Try it:</strong> open <Link to="/collection/94979">one artwork</Link>, then change
            the number in the address bar to <code>151904</code>.
          </p>
        </section>

        <section id="templates">
          <h2>Templates</h2>
          <p>
            A <strong>template</strong> decides where content goes without knowing what the content
            is. Each named slot works like an empty frame. Pages fill the frames.
          </p>
          <CodeBlock file="Simplified from src/pages/ArtworkPage.jsx">{`<DetailTemplate
  media={<ArtworkImage artwork={artwork} />}
  summary={<ArtworkDetails artwork={artwork} />}
  related={<RelatedWorks department={artwork.department} />}
/>`}</CodeBlock>
          <p className="try">
            <strong>Try it:</strong> turn on Blueprint and visit each page. Solid light blue outlines
            are templates, and dashed white outlines are slots.
          </p>
        </section>

        <section id="components">
          <h2>Components</h2>
          <p>
            A <strong>component</strong> is a reusable piece of interface, just like a component in
            Figma. <code>ArtworkCard</code> is designed once and appears on the home page, in the
            collection and under each artwork. Change that file and all of them update.
          </p>
          <CodeBlock file="src/components/ArtworkGrid.jsx">{`{artworks.map((artwork) => (
  <ArtworkCard key={artwork.id} artwork={artwork} />
))}`}</CodeBlock>
        </section>

        <section id="data">
          <h2>Data from an API</h2>
          <p>
            An <strong>API</strong> is a web address that returns data instead of a designed page.
            This site asks the Cleveland Museum of Art for artworks, then designs the answer.
          </p>
          <CodeBlock file="Simplified from src/api/artworks.js">{`const response = await fetch(url);
const json = await response.json();`}</CodeBlock>
          <p>
            Data takes time to arrive and sometimes never does, so one screen really needs several
            designs: <strong>loading</strong>, <strong>success</strong>, <strong>empty</strong> and{' '}
            <strong>error</strong>.
          </p>
          <p className="try">
            <strong>Try it:</strong> in Blueprint’s Network section, choose Slow and then Failing.
            Then <Link to="/collection?q=zzzz">search for something that doesn’t exist</Link>.
          </p>
        </section>

        <section id="tokens">
          <h2>Design tokens</h2>
          <p>
            <strong>Tokens</strong> are named design decisions, like variables in Figma. Every color,
            font and space on this site comes from one file.
          </p>
          <CodeBlock file="src/styles/tokens.css">{`:root {
  --color-accent: #b8321b;
  --font-display: 'Instrument Serif', Georgia, serif;
}`}</CodeBlock>
          <p className="try">
            <strong>Try it:</strong> change <code>--color-accent</code>, save the file and watch every
            button and link update. Blueprint’s blue theme works the same way, by swapping these
            tokens.
          </p>
        </section>
      </ArticleTemplate>
    </>
  );
}
