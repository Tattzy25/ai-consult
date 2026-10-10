import { useEffect, useState } from 'react';
import { fetchCollections } from './collectionsCrawl';

/**
 * useCollections — crawl-n-store prefetch as a hook.
 *
 * Fires once on mount (the browser crawls /collections while the user is
 * still on the call button). Returns the tenant's collections, or null while
 * loading / on failure — the commerce layer decides what to do with it.
 */
export function useCollections(): unknown {
  const [collections, setCollections] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    fetchCollections()
      .then((r) => { if (alive && r) setCollections(r); })
      .catch((err) => console.warn('[collections] prefetch failed', err));
    return () => { alive = false; };
  }, []);

  return collections;
}
