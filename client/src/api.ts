// src/api.ts

// Get base URL from env or fallback to localhost
let base = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Remove any trailing slash so we don’t get double slashes
base = base.replace(/\/+$/, "");

// Always ensure it ends with /api
if (!base.endsWith("/api")) {
  base += "/api";
}

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
    credentials: "include" // Send cookies/tokens for auth if needed
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  return res.json();
}
