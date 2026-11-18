import ArtworkCard from './ArtworkCard.jsx';

export default function ArtworkGrid({ artworks }) {
  return (
    <div className="artwork-grid" data-part="component" data-name="ArtworkGrid">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
