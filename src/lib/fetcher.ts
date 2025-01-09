export async function fetcher<R extends any = any>(url: string): Promise<R>;
export async function fetcher<R extends any = any>(
  response: Promise<Response>
): Promise<R>;
export async function fetcher<R extends any = any>(
  urlOrResponse: Promise<Response> | string
): Promise<R> {
  const promise =
    urlOrResponse instanceof Promise ? urlOrResponse : fetch(urlOrResponse);
  return promise.then((r) => r.json() as R);
}
