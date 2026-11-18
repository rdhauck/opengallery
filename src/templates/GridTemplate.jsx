// TEMPLATE: a browsing page with a heading, controls, results and page numbers.

export default function GridTemplate({ heading, controls, results, pagination }) {
  return (
    <div className="grid-page" data-part="template" data-name="GridTemplate">
      <header className="grid-page__heading" data-part="slot" data-name="slot: heading">
        {heading}
      </header>
      <div className="grid-page__controls" data-part="slot" data-name="slot: controls">
        {controls}
      </div>
      <div className="grid-page__results" data-part="slot" data-name="slot: results">
        {results}
      </div>
      {pagination && (
        <div className="grid-page__pagination" data-part="slot" data-name="slot: pagination">
          {pagination}
        </div>
      )}
    </div>
  );
}
