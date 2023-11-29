

const writeToCache = (description: string, status: any) => localStorage.setItem(description, JSON.stringify(status));

const readFromCache = (description: string) => localStorage.getItem(description);

export { readFromCache, writeToCache };