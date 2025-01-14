import NodeCache from "node-cache";
/*
    A simple caching module that has set, get and 
    delete methods and works a little bit like memcached
*/

// ? Default cache to Store as long as App running
const memoryCache = new NodeCache();

export const generateCacheKey = (key, value) => {
  return `${key}-${JSON.stringify(value)}`;
};

export default memoryCache;
