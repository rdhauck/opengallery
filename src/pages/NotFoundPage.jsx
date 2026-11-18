// PAGE: shown for any address the site doesn't recognize.

import { Link, useLocation } from 'react-router';

import ArticleTemplate from '../templates/ArticleTemplate.jsx';

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <>
      <title>Page not found | Open Gallery</title>
      <ArticleTemplate
        heading={
          <>
            <p className="eyebrow">Error 404</p>
            <h1>This room is empty.</h1>
          </>
        }
      >
        <p className="lede">
          There’s no page at <code>{pathname}</code>. The catch-all route in <code>App.jsx</code>{' '}
          sent you here instead of showing a blank screen.
        </p>
        <p>
          <Link to="/" className="button">
            Return to the entrance
          </Link>
        </p>
      </ArticleTemplate>
    </>
  );
}
