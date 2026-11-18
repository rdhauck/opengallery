// EMPTY STATE: the request worked, but nothing matched.

export default function EmptyState({ query, onClear }) {
  return (
    <div className="state" data-part="component" data-name="EmptyState">
      <h2 className="state__title">
        {query ? `Nothing matches “${query}”` : 'Nothing matches these filters'}
      </h2>
      <p>Try a broader word, such as river, portrait or gold.</p>
      <button type="button" className="button" onClick={onClear}>
        Clear search
      </button>
    </div>
  );
}
