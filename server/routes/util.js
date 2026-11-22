// Turn ?q=... into a PostgREST "or" filter across columns (case-insensitive contains).
// Characters with meaning in the filter syntax are stripped.
export function searchFilter(q, columns) {
  const term = String(q ?? '').replace(/[,()*%\\]/g, ' ').trim();
  if (!term) return null;
  return columns.map((c) => `${c}.ilike.%${term}%`).join(',');
}

export function fail(res, error, status = 400) {
  return res.status(status).json({ error: error?.message ?? String(error) });
}
