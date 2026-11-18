// TEMPLATE: decides where things go, but not what they are.
// Like a Figma frame with empty slots, each prop below is a slot that a page fills.

export default function LandingTemplate({ hero, intro, featured }) {
  return (
    <div className="landing" data-part="template" data-name="LandingTemplate">
      <section className="landing__hero" data-part="slot" data-name="slot: hero">
        {hero}
      </section>
      <section className="landing__intro" data-part="slot" data-name="slot: intro">
        {intro}
      </section>
      <section className="landing__featured" data-part="slot" data-name="slot: featured">
        {featured}
      </section>
    </div>
  );
}
