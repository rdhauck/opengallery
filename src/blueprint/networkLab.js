// The teaching tool behind Blueprint's Network section.
// It wraps the browser's fetch() so students can watch each request and
// simulate slow, failed or offline connections. A production site wouldn't
// need this file. It would call fetch() directly.

import { useSyncExternalStore } from 'react';

import samples from '../data/sample-artworks.json';

let scenario = 'live';
let requests = [];
let nextId = 1;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setScenario(next) {
  scenario = next;
  requests = [];
  notify();
}

export function useNetworkScenario() {
  return useSyncExternalStore(subscribe, () => scenario);
}

export function useNetworkRequests() {
  return useSyncExternalStore(subscribe, () => requests);
}

function updateRequest(id, changes) {
  requests = requests.map((request) => (request.id === id ? { ...request, ...changes } : request));
  notify();
}

function removeRequest(id) {
  requests = requests.filter((request) => request.id !== id);
  notify();
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('The request was cancelled.', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, ms);
    if (signal?.aborted) abort();
    else signal?.addEventListener('abort', abort, { once: true });
  });
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Answers a request from the saved sample file, in the same shape as the API.
function respondFromSamples(url) {
  const { pathname, searchParams } = new URL(url);
  const id = pathname.match(/\/artworks\/(\d+)$/)?.[1];

  if (pathname.match(/\/artworks\/[^/]+$/)) {
    const record = samples.find((sample) => String(sample.id) === id);
    return record ? jsonResponse({ data: record }) : jsonResponse({ detail: 'Artwork not found' }, 404);
  }

  const query = searchParams.get('q')?.toLowerCase();
  const type = searchParams.get('type');
  const department = searchParams.get('department');

  const matches = samples.filter(
    (sample) =>
      (!query || JSON.stringify(sample).toLowerCase().includes(query)) &&
      (!type || sample.type === type) &&
      (!department || sample.department === department),
  );

  const skip = Number(searchParams.get('skip') ?? 0);
  const limit = Number(searchParams.get('limit') ?? 24);

  return jsonResponse({
    info: { total: matches.length },
    data: matches.slice(skip, skip + limit),
  });
}

async function respond(url, options) {
  if (scenario === 'fail') {
    await wait(700, options.signal);
    return jsonResponse({ detail: 'Simulated server failure' }, 503);
  }
  if (scenario === 'sample') {
    await wait(150, options.signal);
    return respondFromSamples(url);
  }
  if (scenario === 'slow') {
    await wait(3000, options.signal);
  }
  return fetch(url, options);
}

export async function labFetch(url, options = {}) {
  const id = nextId++;
  const startedAt = performance.now();
  const elapsed = () => Math.round(performance.now() - startedAt);

  requests = [
    ...requests.slice(-29),
    { id, url, page: window.location.pathname + window.location.search, status: 'pending' },
  ];
  notify();

  try {
    const response = await respond(url, options);
    const json = await response.clone().json().catch(() => null);
    updateRequest(id, {
      status: response.ok ? 'success' : 'error',
      httpStatus: response.status,
      ms: elapsed(),
      json,
    });
    return response;
  } catch (error) {
    if (error.name === 'AbortError') removeRequest(id);
    else updateRequest(id, { status: 'error', ms: elapsed(), message: error.message });
    throw error;
  }
}
