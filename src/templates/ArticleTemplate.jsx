// TEMPLATE: a reading layout. "How it works" and the 404 page both use it,
// which is the point of templates: design once, reuse everywhere.

export default function ArticleTemplate({ heading, aside, children }) {
  return (
    <article className="article" data-part="template" data-name="ArticleTemplate">
      <header className="article__heading" data-part="slot" data-name="slot: heading">
        {heading}
      </header>
      <div className={aside ? 'article__columns' : 'article__columns article__columns--single'}>
        {aside && (
          <aside className="article__aside" data-part="slot" data-name="slot: aside">
            {aside}
          </aside>
        )}
        <div className="article__body" data-part="slot" data-name="slot: body">
          {children}
        </div>
      </div>
    </article>
  );
}
