export async function fetcher<R extends any = any>(url: string) {
  return fetch(url).then((r) => r.json() as R);
}
