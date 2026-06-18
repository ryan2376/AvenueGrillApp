/**
 * Money helpers. Amounts are stored and transported as KES minor units
 * (integers, e.g. 45000 = KES 450.00) — never floating point.
 */

/** Format minor units as a KES string, e.g. 45000 → "KES 450". */
export function formatKes(minorUnits: number): string {
  const shillings = minorUnits / 100;
  const hasCents = minorUnits % 100 !== 0;
  return `KES ${shillings.toLocaleString("en-KE", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
