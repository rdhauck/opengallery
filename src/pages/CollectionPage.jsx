// PAGE: browse and search. The search lives in the address (?q=river&type=Print),
// so results can be bookmarked, shared, and reached with the back button.

import { useSearchParams } from 'react-router';

import { PAGE_SIZE } from '../api/artworks.js';
import ArtworkGrid from '../components/ArtworkGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import LoadingGrid from '../components/LoadingGrid.jsx';
import Pagination from '../components/Pagination.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TypeFilter from '../components/TypeFilter.jsx';
import { useArtworkSearch } from '../hooks/useArtworks.js';
import GridTemplate from '../templates/GridTemplate.jsx';

export default function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') ?? '';
  const type = searchParams.get('type') ?? '';
  const page = Math.max(1, Number.parseInt(searchParams.get('page'), 10) || 1);

  const { status, data, error, retry } = useArtworkSearch({ query, type, page });

  // Changing the search or filter updates the address and returns to page 1.
  function updateSearch(changes) {
    const next = new URLSearchParams(searchParams);
    next.delete('page');
    Object.entries(changes).forEach(([name, value]) => {
      if (value) next.set(name, value);
      else next.delete(name);
    });
    setSearchParams(next);
  }

  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <title>The collection | Open Gallery</title>
      <GridTemplate
        heading={
          <>
            <h1>The collection</h1>
            <p className="result-count" role="status">
              {status === 'loading' && 'Loading works…'}
              {status === 'success' &&
                `${total.toLocaleString('en-US')} ${total === 1 ? 'work' : 'works'}`}
              {status === 'error' && 'Works unavailable'}
            </p>
          </>
        }
        controls={
          <>
            <SearchBar query={query} onSearch={(q) => updateSearch({ q })} />
            <TypeFilter selected={type} onSelect={(value) => updateSearch({ type: value })} />
          </>
        }
        results={
          <>
            {status === 'loading' && <LoadingGrid count={12} />}
            {status === 'error' && <ErrorState error={error} onRetry={retry} />}
            {status === 'success' && data.artworks.length > 0 && (
              <ArtworkGrid artworks={data.artworks} />
            )}
            {status === 'success' && data.artworks.length === 0 && (
              <EmptyState query={query} onClear={() => setSearchParams({})} />
            )}
          </>
        }
        pagination={
          status === 'success' && totalPages > 1 ? (
            <Pagination page={page} totalPages={totalPages} searchParams={searchParams} />
          ) : null
        }
      />
    </>
  );
}
