// A "hook" is reusable behavior that a page can plug into.
//
// Data takes time to arrive, so every request is always in one of three states:
//   loading  we asked and are waiting
//   success  the data arrived
//   error    something went wrong
// Each state needs its own design. Pages read `status` and choose what to show.

import { useCallback, useEffect, useState } from 'react';

import { getArtwork, searchArtworks } from '../api/artworks.js';

function useRequest(load, requestKey) {
  const [result, setResult] = useState({ key: null, status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // If the visitor moves on before the reply arrives, cancel the request.
    const controller = new AbortController();

    setResult({ key: requestKey, status: 'loading' });

    load(controller.signal)
      .then((data) => setResult({ key: requestKey, status: 'success', data }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ key: requestKey, status: 'error', error });
        }
      });

    return () => controller.abort();
    // Run again whenever the request changes or the visitor presses "Try again".
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  // A result from an earlier request is never shown for the current one.
  const current = result.key === requestKey ? result : { status: 'loading' };

  return { ...current, retry };
}

// Many artworks: const { status, data } = useArtworkSearch({ query: 'river' });
export function useArtworkSearch(options) {
  return useRequest((signal) => searchArtworks(options, signal), JSON.stringify(options));
}

// One artwork: const { status, data } = useArtwork(94979);
export function useArtwork(id) {
  return useRequest((signal) => getArtwork(id, signal), id);
}
