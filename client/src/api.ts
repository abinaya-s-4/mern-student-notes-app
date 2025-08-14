let base = import.meta.env.VITE_API_URL || "http://localhost:5000";
base = base.replace(/\/+$/, "");
if (!base.endsWith("/api")) base += "/api";
const API_BASE_URL = base;

export async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include"
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }
  return res.json();
}
