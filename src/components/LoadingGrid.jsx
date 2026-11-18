// LOADING STATE: gray placeholders hold the layout while data is on its way.

export default function LoadingGrid({ count }) {
  return (
    <div
      className="artwork-grid"
      role="status"
      aria-label="Loading artworks"
      data-part="component"
      data-name="LoadingGrid"
    >
      {Array.from({ length: count }, (_, index) => (
        <div className="card" key={index} aria-hidden="true">
          <div className="mat skeleton" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </div>
      ))}
    </div>
  );
}
