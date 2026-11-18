// Width and height from the API let the browser reserve the right space,
// so the page doesn't jump around as images arrive.

export default function ArtworkImage({ artwork, priority = false }) {
  if (!artwork.image) {
    return <p className="no-image">No image available</p>;
  }

  return (
    <img
      src={artwork.image.url}
      width={artwork.image.width}
      height={artwork.image.height}
      alt={`${artwork.title} by ${artwork.artist}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
