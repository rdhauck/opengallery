// Lets the Blueprint panel describe the current page.
// If you add a route to App.jsx, add it here too.

import { matchPath } from 'react-router';

const ROUTES = [
  { pattern: '/', page: 'HomePage', template: 'LandingTemplate' },
  { pattern: '/collection', page: 'CollectionPage', template: 'GridTemplate' },
  { pattern: '/collection/:id', page: 'ArtworkPage', template: 'DetailTemplate' },
  { pattern: '/how-it-works', page: 'HowItWorksPage', template: 'ArticleTemplate' },
];

const NOT_FOUND = { pattern: '*', page: 'NotFoundPage', template: 'ArticleTemplate', params: {} };

export function findRoute(pathname) {
  for (const route of ROUTES) {
    const match = matchPath({ path: route.pattern, end: true }, pathname);
    if (match) return { ...route, params: match.params };
  }
  return NOT_FOUND;
}
