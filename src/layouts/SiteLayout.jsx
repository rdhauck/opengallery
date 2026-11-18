// LAYOUT: the frame around every page.
// The header and footer stay put. <Outlet /> is the opening where the current
// page appears, so moving between pages only swaps what is inside it.

import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';

import BlueprintPanel from '../blueprint/BlueprintPanel.jsx';
import { useBlueprint } from '../blueprint/BlueprintContext.jsx';
import { useNetworkScenario } from '../blueprint/networkLab.js';
import NetworkNotice from '../components/NetworkNotice.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import SiteHeader from '../components/SiteHeader.jsx';

export default function SiteLayout() {
  const { on } = useBlueprint();
  const scenario = useNetworkScenario();
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  const previousAddress = useRef(pathname + hash);

  // A new page should start at the top, and keyboard and screen reader users
  // should land on the new content.
  useEffect(() => {
    if (previousAddress.current === pathname + hash) return;
    previousAddress.current = pathname + hash;

    const target = hash ? document.querySelector(hash) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NetworkNotice />
      <SiteHeader />
      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="site-main"
        data-part="layout"
        data-name="SiteLayout: <Outlet />"
      >
        {/* The key reloads the page when Blueprint's network setting changes. */}
        <Outlet key={scenario} />
      </main>
      <SiteFooter />
      {on && <BlueprintPanel />}
    </div>
  );
}
