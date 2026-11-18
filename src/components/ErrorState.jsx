// ERROR STATE: says what happened and offers a way forward.

import { setScenario, useNetworkScenario } from '../blueprint/networkLab.js';

export default function ErrorState({ error, onRetry }) {
  const scenario = useNetworkScenario();
  const detail = error?.status
    ? `The museum’s server answered with status ${error.status}.`
    : 'Your browser couldn’t reach the museum’s server.';

  return (
    <div className="state" role="alert" data-part="component" data-name="ErrorState">
      <h2 className="state__title">The artworks didn’t arrive</h2>
      <p>{detail}</p>
      <div className="state__actions">
        <button type="button" className="button" onClick={onRetry}>
          Try again
        </button>
        {scenario !== 'sample' && (
          <button type="button" className="button button--quiet" onClick={() => setScenario('sample')}>
            Use saved sample artworks
          </button>
        )}
      </div>
    </div>
  );
}
