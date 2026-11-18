import { Link, NavLink } from 'react-router';

import BlueprintSwitch from '../blueprint/BlueprintSwitch.jsx';

export default function SiteHeader() {
  return (
    <header className="site-header" data-part="layout" data-name="SiteLayout: header">
      <Link to="/" className="brand">
        Open Gallery
      </Link>
      <nav className="site-nav" aria-label="Main">
        <NavLink to="/collection">Collection</NavLink>
        <NavLink to="/how-it-works">How it works</NavLink>
      </nav>
      <BlueprintSwitch />
    </header>
  );
}
