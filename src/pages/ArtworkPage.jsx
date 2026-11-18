// PAGE: reads the artwork's id from the address, requests that artwork,
// and pours the answer into DetailTemplate.

import { Link, useLocation, useParams } from 'react-router';

import ArtworkDetails from '../components/ArtworkDetails.jsx';
import ArtworkImage from '../components/ArtworkImage.jsx';
import ErrorState from '../components/ErrorState.jsx';
import RelatedWorks from '../components/RelatedWorks.jsx';
import { useArtwork } from '../hooks/useArtworks.js';
import DetailTemplate from '../templates/DetailTemplate.jsx';

export default function ArtworkPage() {
  const { id } = useParams();
  const location = useLocation();
  const { status, data: artwork, error, retry } = useArtwork(id);

  const back = (
    <Link to={location.state?.from ?? '/collection'} className="text-link text-link--back">
      {location.state?.from ? 'Back' : 'All works'}
    </Link>
  );

  if (status === 'loading') {
    return (
      <DetailTemplate
        back={back}
        media={<div className="skeleton skeleton--media" />}
        summary={
          <div role="status" aria-label="Loading artwork">
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line skeleton--short" />
          </div>
        }
      />
    );
  }

  if (status === 'error') {
    const isMissing = [400, 404, 422].includes(error.status);
    return (
      <>
        <title>Artwork unavailable | Open Gallery</title>
        <DetailTemplate
          back={back}
          summary={
            isMissing ? (
              <div className="state">
                <h1 className="state__title">We can’t find that artwork</h1>
                <p>The address may be mistyped, or the work may no longer be in the open collection.</p>
                <Link to="/collection" className="button">
                  Browse the collection
                </Link>
              </div>
            ) : (
              <ErrorState error={error} onRetry={retry} />
            )
          }
        />
      </>
    );
  }

  return (
    <>
      <title>{`${artwork.title} | Open Gallery`}</title>
      <DetailTemplate
        back={back}
        media={
          <figure className="detail-image">
            <ArtworkImage artwork={artwork} priority />
          </figure>
        }
        summary={<ArtworkDetails artwork={artwork} />}
        related={
          artwork.department ? (
            <RelatedWorks department={artwork.department} currentId={artwork.id} />
          ) : null
        }
      />
    </>
  );
}
