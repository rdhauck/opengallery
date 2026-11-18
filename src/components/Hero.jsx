import { Link } from 'react-router';

import { useBlueprint } from '../blueprint/BlueprintContext.jsx';
import ArtworkImage from './ArtworkImage.jsx';

export default function Hero({ artwork, status }) {
  const { on, toggle } = useBlueprint();

  return (
    <div className="hero" data-part="component" data-name="Hero">
      <div className="hero__text">
        <p className="eyebrow">A working example for design students</p>
        <h1>
          A museum you can <em>take apart.</em>
        </h1>
        <p className="lede">
          Browse real artworks from the Cleveland Museum of Art, then switch on Blueprint to see the
          routes, templates and live data behind every page.
        </p>
        <div className="hero__actions">
          <button type="button" className="button" onClick={toggle}>
            {on ? 'Turn off Blueprint' : 'Turn on Blueprint'}
          </button>
          <Link to="/collection" className="button button--quiet">
            Browse the collection
          </Link>
        </div>
      </div>

      <figure className="hero__art">
        {status === 'success' && artwork ? (
          <Link
            to={`/collection/${artwork.id}`}
            state={{ from: '/' }}
            className="hero__art-link"
            aria-label={`View ${artwork.title}`}
          >
            <div className="mat mat--hero">
              <ArtworkImage artwork={artwork} priority />
            </div>
            <figcaption>
              <strong>{artwork.title}</strong>
              <span>
                {artwork.artist}, {artwork.date}
              </span>
            </figcaption>
          </Link>
        ) : (
          <div className={status === 'loading' ? 'mat mat--hero skeleton' : 'mat mat--hero'} />
        )}
      </figure>
    </div>
  );
}
