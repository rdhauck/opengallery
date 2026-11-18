// THE API CALL: how this website asks the museum for data.
//
// An API is a web address that returns data instead of a designed page.
// Paste this into a browser tab to see exactly what the site receives:
// https://openaccess-api.clevelandart.org/api/artworks/?q=river&has_image=1&limit=2

import { labFetch } from '../blueprint/networkLab.js';

const BASE_URL = 'https://openaccess-api.clevelandart.org/api/artworks';

// How many artworks appear on one page of the collection.
export const PAGE_SIZE = 24;

// Asking only for the fields we use keeps each response small and fast.
const LIST_FIELDS = [
  'id',
  'title',
  'creators',
  'creation_date',
  'culture',
  'type',
  'department',
  'images',
].join(',');

// A clear error we can design for. It remembers the server's status code,
// such as 404 for "not found".
export class ApiError extends Error {
  constructor(status) {
    super(`The server answered with status ${status}.`);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Sends one request and turns the reply into JavaScript data.
async function getJson(url, signal) {
  // labFetch is the browser's standard fetch(), with Blueprint Mode listening
  // in so it can display the request and simulate slow or failed connections.
  const response = await labFetch(url, { signal });

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return response.json();
}

// Removes formatting tags such as <i> from the museum's text.
function toPlainText(html) {
  if (!html) return '';
  return new DOMParser().parseFromString(html, 'text/html').body.textContent.trim();
}

// The museum's data is large and uses its own names. This function reshapes
// one record into the simple object our designs expect, so the rest of the
// site never has to know how the museum organizes its data.
function toArtwork(record) {
  const creator = record.creators?.[0]?.description ?? '';
  const web = record.images?.web;

  return {
    id: record.id,
    title: record.title || 'Untitled',
    // "Winslow Homer (American, 1836–1910)" becomes "Winslow Homer".
    artist: creator.split(' (')[0] || record.culture?.[0] || 'Unknown maker',
    artistDetail: creator,
    date: record.creation_date || 'Date unknown',
    type: record.type ?? '',
    technique: record.technique ?? '',
    department: record.department ?? '',
    culture: record.culture?.[0] ?? '',
    measurements: record.measurements ?? '',
    creditLine: record.creditline ?? '',
    description: toPlainText(record.description),
    didYouKnow: toPlainText(record.did_you_know),
    license: record.share_license_status ?? '',
    museumUrl: record.url ?? '',
    image: web
      ? { url: web.url, width: Number(web.width), height: Number(web.height) }
      : null,
  };
}

// GET MANY: used by the home page, the collection and "related works".
export async function searchArtworks(
  { query = '', type = '', department = '', highlight = false, page = 1, limit = PAGE_SIZE },
  signal,
) {
  // These settings become the part of the address after the "?".
  const params = new URLSearchParams({
    has_image: '1', // only works with a photograph
    cc0: '1', // only works that are free for anyone to reuse
    limit: String(limit),
    skip: String((page - 1) * limit),
    fields: LIST_FIELDS,
  });

  if (query) params.set('q', query);
  if (type) params.set('type', type);
  if (department) params.set('department', department);
  if (highlight) params.set('highlight', '1');

  const json = await getJson(`${BASE_URL}/?${params}`, signal);

  return {
    total: json.info.total,
    artworks: json.data.map(toArtwork),
  };
}

// GET ONE: used by the artwork detail page.
export async function getArtwork(id, signal) {
  const json = await getJson(`${BASE_URL}/${encodeURIComponent(id)}`, signal);
  return toArtwork(json.data);
}
