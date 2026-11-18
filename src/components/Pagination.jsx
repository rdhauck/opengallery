import { Link } from 'react-router';

export default function Pagination({ page, totalPages, searchParams }) {
  function linkTo(pageNumber) {
    const next = new URLSearchParams(searchParams);
    if (pageNumber > 1) next.set('page', String(pageNumber));
    else next.delete('page');
    return `?${next}`;
  }

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <nav className="pagination" aria-label="Pages" data-part="component" data-name="Pagination">
      {page > 1 ? (
        <Link to={linkTo(page - 1)} className="button button--quiet" onClick={scrollToTop}>
          Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="pagination__label">
        Page {page.toLocaleString('en-US')} of {totalPages.toLocaleString('en-US')}
      </span>
      {page < totalPages ? (
        <Link to={linkTo(page + 1)} className="button button--quiet" onClick={scrollToTop}>
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
