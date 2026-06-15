import { API_BASE_URL } from "@/lib/config";

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
