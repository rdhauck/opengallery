export default function SearchBar({ query, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(new FormData(event.currentTarget).get('q').trim());
  }

  return (
    <form
      className="search"
      role="search"
      onSubmit={handleSubmit}
      data-part="component"
      data-name="SearchBar"
    >
      <label className="visually-hidden" htmlFor="artwork-search">
        Search artworks
      </label>
      {/* The key refills the box when the address changes, such as on Back. */}
      <input
        key={query}
        id="artwork-search"
        name="q"
        type="search"
        defaultValue={query}
        placeholder="Search by title, artist or subject"
      />
      <button type="submit" className="button">
        Search
      </button>
    </form>
  );
}
