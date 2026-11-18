// TEMPLATE: one design that becomes a page for every artwork in the museum.
// Slots left empty disappear, and the layout adjusts around them.

export default function DetailTemplate({ back, media, summary, related }) {
  return (
    <div className="detail" data-part="template" data-name="DetailTemplate">
      {back && <div className="detail__back">{back}</div>}
      <div className={media ? 'detail__main' : 'detail__main detail__main--text-only'}>
        {media && (
          <div className="detail__media" data-part="slot" data-name="slot: media">
            {media}
          </div>
        )}
        <div className="detail__summary" data-part="slot" data-name="slot: summary">
          {summary}
        </div>
      </div>
      {related && (
        <section className="detail__related" data-part="slot" data-name="slot: related">
          {related}
        </section>
      )}
    </div>
  );
}
