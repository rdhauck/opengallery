// The side panel that explains whichever page is on screen.

import { useState } from 'react';
import { useLocation } from 'react-router';

import { setScenario, useNetworkRequests, useNetworkScenario } from './networkLab.js';
import { findRoute } from './routeMap.js';

const SCENARIOS = [
  { value: 'live', label: 'Live' },
  { value: 'slow', label: 'Slow' },
  { value: 'fail', label: 'Failing' },
  { value: 'sample', label: 'Sample' },
];

const LEGEND = [
  ['layout', 'Layout', 'The frame on every page'],
  ['template', 'Template', 'Arranges a type of page'],
  ['slot', 'Slot', 'An opening in a template'],
  ['component', 'Component', 'A reusable piece'],
];

const MAX_JSON_LENGTH = 5000;

function shortUrl(url) {
  const { pathname, search } = new URL(url);
  return decodeURIComponent(pathname + search);
}

function statusLabel(request) {
  if (request.status === 'pending') return 'Loading';
  if (request.httpStatus) return String(request.httpStatus);
  return 'Failed';
}

function formatJson(json) {
  const text = JSON.stringify(json, null, 2) ?? '';
  return text.length > MAX_JSON_LENGTH
    ? `${text.slice(0, MAX_JSON_LENGTH)}\n\n… shortened for display`
    : text;
}

export default function BlueprintPanel() {
  const location = useLocation();
  const route = findRoute(location.pathname);
  const scenario = useNetworkScenario();
  const allRequests = useNetworkRequests();
  const [selectedId, setSelectedId] = useState(null);

  const here = location.pathname + location.search;
  const requests = allRequests.filter((request) => request.page === here).slice(-4).reverse();
  const selected = requests.find((request) => request.id === selectedId) ?? requests[0];

  const details = [...Object.entries(route.params), ...new URLSearchParams(location.search).entries()];

  return (
    <aside className="bp-panel" aria-label="Blueprint">
      <section>
        <h2>You are here</h2>
        <dl className="bp-facts">
          <div>
            <dt>Address</dt>
            <dd>{here}</dd>
          </div>
          <div>
            <dt>Route</dt>
            <dd>{route.pattern}</dd>
          </div>
          {details.map(([name, value]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd className="bp-facts__value">{value}</dd>
            </div>
          ))}
          <div>
            <dt>Page</dt>
            <dd>src/pages/{route.page}.jsx</dd>
          </div>
          <div>
            <dt>Template</dt>
            <dd>src/templates/{route.template}.jsx</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2>Outlines</h2>
        <ul className="bp-legend">
          {LEGEND.map(([kind, name, text]) => (
            <li key={kind}>
              <span className={`bp-legend__swatch bp-legend__swatch--${kind}`} aria-hidden="true" />
              <strong>{name}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 id="bp-network">Network</h2>
        <div className="bp-segments" role="radiogroup" aria-labelledby="bp-network">
          {SCENARIOS.map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="bp-scenario"
                value={option.value}
                checked={scenario === option.value}
                onChange={() => setScenario(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2>API requests on this page</h2>
        {requests.length === 0 ? (
          <p className="bp-note">None. The words on this page are written directly in the code.</p>
        ) : (
          <>
            <ul className="bp-requests">
              {requests.map((request) => (
                <li key={request.id}>
                  <button
                    type="button"
                    aria-pressed={selected?.id === request.id}
                    onClick={() => setSelectedId(request.id)}
                  >
                    <span className={`bp-status bp-status--${request.status}`}>{statusLabel(request)}</span>
                    <span className="bp-requests__url">{shortUrl(request.url)}</span>
                    {request.ms != null && <span className="bp-requests__time">{request.ms} ms</span>}
                  </button>
                </li>
              ))}
            </ul>
            {selected?.json && (
              <>
                <h3>The raw response</h3>
                <pre className="bp-json" tabIndex={0}>
                  {formatJson(selected.json)}
                </pre>
              </>
            )}
          </>
        )}
      </section>
    </aside>
  );
}
