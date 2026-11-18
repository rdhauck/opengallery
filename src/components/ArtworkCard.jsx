// COMPONENT: designed once, used everywhere an artwork is listed.
// `artwork` is a prop: the content this copy of the card should display.

import { Link, useLocation } from 'react-router';

import ArtworkImage from './ArtworkImage.jsx';

export default function ArtworkCard({ artwork }) {
  const location = useLocation();

  return (
    <article className="card" data-part="component" data-name="ArtworkCard">
      <Link
        to={`/collection/${artwork.id}`}
        state={{ from: location.pathname + location.search }}
        className="card__link"
      >
        <div className="mat">
          <ArtworkImage artwork={artwork} />
        </div>
        <h3 className="card__title">{artwork.title}</h3>
        <p className="card__meta">
          {artwork.artist}, {artwork.date}
        </p>
      </Link>
    </article>
  );
}
