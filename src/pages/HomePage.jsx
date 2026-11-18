// PAGE: connects a route to a template and fills its slots with real content.

import { Link } from 'react-router';

import ArtworkGrid from '../components/ArtworkGrid.jsx';
import ErrorState from '../components/ErrorState.jsx';
import Hero from '../components/Hero.jsx';
import IdeaList from '../components/IdeaList.jsx';
import LoadingGrid from '../components/LoadingGrid.jsx';
import { useArtworkSearch } from '../hooks/useArtworks.js';
import LandingTemplate from '../templates/LandingTemplate.jsx';

const HOME_REQUEST = { highlight: true, type: 'Painting', limit: 7 };

export default function HomePage() {
  const { status, data, error, retry } = useArtworkSearch(HOME_REQUEST);
  const [heroArtwork, ...featured] = data?.artworks ?? [];

  return (
    <>
      <title>Open Gallery: a museum you can take apart</title>
      <LandingTemplate
        hero={<Hero artwork={heroArtwork} status={status} />}
        intro={<IdeaList />}
        featured={
          <>
            <div className="section-heading">
              <h2>From the collection</h2>
              <Link to="/collection" className="text-link">
                View all works
              </Link>
            </div>
            {status === 'loading' && <LoadingGrid count={6} />}
            {status === 'error' && <ErrorState error={error} onRetry={retry} />}
            {status === 'success' && <ArtworkGrid artworks={featured} />}
          </>
        }
      />
    </>
  );
}
