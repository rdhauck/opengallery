export default function ArtworkDetails({ artwork }) {
  const facts = [
    ['Type', artwork.type],
    ['Technique', artwork.technique],
    ['Culture', artwork.culture],
    ['Department', artwork.department],
    ['Measurements', artwork.measurements],
    ['Credit', artwork.creditLine],
    ['License', artwork.license],
  ].filter(([, value]) => value);

  return (
    <div className="artwork-details" data-part="component" data-name="ArtworkDetails">
      <h1>{artwork.title}</h1>
      <p className="artwork-details__maker">{artwork.artistDetail || artwork.artist}</p>
      <p className="artwork-details__date">{artwork.date}</p>

      {artwork.description && <p className="artwork-details__text">{artwork.description}</p>}

      {artwork.didYouKnow && (
        <aside className="did-you-know">
          <strong>Did you know?</strong>
          <p>{artwork.didYouKnow}</p>
        </aside>
      )}

      <dl className="facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {artwork.museumUrl && (
        <a href={artwork.museumUrl} target="_blank" rel="noreferrer" className="text-link">
          View on the museum’s website
        </a>
      )}
    </div>
  );
}
