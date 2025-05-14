export class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string | URL) {
    const url = typeof path === "string" ? new URL(path, this.baseUrl) : path;
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`GET ${url} failed`);
    return res.json() as Promise<T>;
  }

  async post<T>(path: string, body: unknown) {
    const url = new URL(path, this.baseUrl);
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${url} failed`);
    return res.json() satisfies Promise<T>;
  }

  async delete(path: string | URL) {
    const url = typeof path === "string" ? new URL(path, this.baseUrl) : path;
    const res = await fetch(url.toString(), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`DELETE ${url} failed`);
  }
}
