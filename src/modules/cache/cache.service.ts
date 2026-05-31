import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 900
});

export async function getOrSetCache<T>(key: string, fetcher: () => Promise<T>, ttlSeconds: number = 900): Promise<T> {
  const cached = cache.get<T>(key);
  if (cached) {
    return cached;
  }

  const value = await fetcher();
  cache.set(key, value, ttlSeconds);
  return value;
}