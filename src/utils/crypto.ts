/**
 * Generates a cryptographically secure random invite code.
 * Uses crypto.getRandomValues to ensure high entropy and avoid predictability.
 *
 * @param length The length of the code to generate (default: 6)
 * @returns A secure alphanumeric uppercase string
 */
export function generateSecureInviteCode(length: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const randomArray = new Uint8Array(1);

  while (result.length < length) {
    crypto.getRandomValues(randomArray);
    const val = randomArray[0];

    // To avoid modulo bias, we only use values that are within the range
    // of the largest multiple of chars.length (36) that fits in a byte (256).
    // 36 * 7 = 252. Values from 252 to 255 are discarded.
    if (val < 252) {
      result += chars[val % chars.length];
    }
  }

  return result;
}
