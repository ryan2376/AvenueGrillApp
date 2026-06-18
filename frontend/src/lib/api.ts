import { API_BASE_URL } from "@/lib/config";
import type { MenuItem, MenuResponse, StoreStatus } from "@/lib/types";

/** Error envelope returned by the backend (see docs/04-API-SPECIFICATION.md). */
export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: Array<{ field?: string; issue: string }>;
  };
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: ApiErrorBody["error"]["details"],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Typed fetch wrapper for the Avenue Grill API. Centralizes base URL, JSON
 * handling, and error shape. Auth headers will be added here in later phases.
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    let code = "INTERNAL";
    let message = res.statusText;
    let details: ApiErrorBody["error"]["details"];
    try {
      const body = (await res.json()) as ApiErrorBody;
      code = body.error?.code ?? code;
      message = body.error?.message ?? message;
      details = body.error?.details;
    } catch {
      // non-JSON error body; keep defaults
    }
    throw new ApiError(res.status, code, message, details);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  return (await res.json()) as T;
}

/** Example call — confirms frontend → backend wiring. */
export interface PingResponse {
  status: string;
  service: string;
}

export function ping(): Promise<PingResponse> {
  return apiFetch<PingResponse>("/ping");
}

/** Fetch the full menu (active categories with their items). */
export function getMenu(): Promise<MenuResponse> {
  return apiFetch<MenuResponse>("/menu");
}

/** Fetch a single menu item by id. */
export function getMenuItem(id: string): Promise<MenuItem> {
  return apiFetch<MenuItem>(`/menu/items/${id}`);
}

/** Fetch current store status (hours, open-now, fees). */
export function getStoreStatus(): Promise<StoreStatus> {
  return apiFetch<StoreStatus>("/store/status");
}
