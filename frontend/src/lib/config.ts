/**
 * Runtime configuration, sourced from environment variables.
 * Never hardcode the API base URL — it differs per environment.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";
