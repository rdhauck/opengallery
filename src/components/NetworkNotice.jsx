// Tells visitors when the site isn't using the live connection.

import { setScenario, useNetworkScenario } from '../blueprint/networkLab.js';

const MESSAGES = {
  slow: 'Simulating a slow connection.',
  fail: 'Simulating a failed connection.',
  sample: 'Showing saved sample artworks, not the live museum API.',
};

export default function NetworkNotice() {
  const scenario = useNetworkScenario();
  if (scenario === 'live') return null;

  return (
    <div className="network-notice" role="status">
      <span>{MESSAGES[scenario]}</span>
      <button type="button" onClick={() => setScenario('live')}>
        Return to live data
      </button>
    </div>
  );
}
