// A second, separate API request. If it fails the rest of the page still works,
// so this section simply stays hidden.

import { useArtworkSearch } from '../hooks/useArtworks.js';
import ArtworkGrid from './ArtworkGrid.jsx';
import LoadingGrid from './LoadingGrid.jsx';

export default function RelatedWorks({ department, currentId }) {
  const { status, data } = useArtworkSearch({ department, highlight: true, limit: 5 });

  const artworks = (data?.artworks ?? [])
    .filter((artwork) => artwork.id !== currentId)
    .slice(0, 4);

  if (status === 'error' || (status === 'success' && artworks.length === 0)) {
    return null;
  }

  return (
    <div data-part="component" data-name="RelatedWorks">
      <div className="section-heading">
        <h2>More from {department}</h2>
      </div>
      {status === 'loading' ? <LoadingGrid count={4} /> : <ArtworkGrid artworks={artworks} />}
    </div>
  );
}
