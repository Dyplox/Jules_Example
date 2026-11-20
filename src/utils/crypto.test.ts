import { describe, it, expect } from 'vitest';
import { hashPin } from './crypto';

describe('hashPin', () => {
  it('should generate a consistent SHA-256 hash for a PIN', async () => {
    const pin = '1234';
    // SHA-256 for "1234" is 03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
    const expectedHash = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4';
    const hash = await hashPin(pin);
    expect(hash).toBe(expectedHash);
  });

  it('should generate different hashes for different PINs', async () => {
    const hash1 = await hashPin('1234');
    const hash2 = await hashPin('4321');
    expect(hash1).not.toBe(hash2);
  });
});
