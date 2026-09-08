/**
 * Gen-Young Utility Formatters
 * Formats INR currency, card numbers, time intervals, and dates.
 * Path: src/utils/formatters.ts
 */

export function formatINR(amount: number, options?: { showDecimals?: boolean }): string {
  const showDecimals = options?.showDecimals ?? false;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

export function formatINRNumber(amount: number, options?: { showDecimals?: boolean }): string {
  const showDecimals = options?.showDecimals ?? false;
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

export function maskCardNumber(cardNumber: string): string {
  const clean = cardNumber.replace(/\s+/g, '');
  if (clean.length < 4) return cardNumber;
  const last4 = clean.slice(-4);
  return `•••• •••• •••• ${last4}`;
}

export function formatCardNumber(cardNumber: string): string {
  const clean = cardNumber.replace(/\D/g, '');
  const chunks = clean.match(/.{1,4}/g);
  return chunks ? chunks.join(' ') : cardNumber;
}

export function formatTimestamp(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

export function formatRelativeTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
