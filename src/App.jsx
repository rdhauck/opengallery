// ROUTES: the site map, written as code.
// Each <Route> says "when the address looks like this, show this page."

import { Route, Routes } from 'react-router';

import SiteLayout from './layouts/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import ArtworkPage from './pages/ArtworkPage.jsx';
import HowItWorksPage from './pages/HowItWorksPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      {/* Every route inside this one shares the header and footer. */}
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="collection" element={<CollectionPage />} />

        {/* ":id" is a blank to fill in. /collection/94979 sets id to 94979,
            so this one route can show every artwork in the museum. */}
        <Route path="collection/:id" element={<ArtworkPage />} />

        <Route path="how-it-works" element={<HowItWorksPage />} />

        {/* "*" catches any address not listed above. */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
