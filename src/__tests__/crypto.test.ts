import { describe, it, expect, vi, afterEach } from 'vitest';
import { generateSecureInviteCode } from '../utils/crypto';

describe('generateSecureInviteCode', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should generate a code with the default length (6)', () => {
    const code = generateSecureInviteCode();
    expect(code).toHaveLength(6);
  });

  it('should generate a code with the specified length', () => {
    const length = 10;
    const code = generateSecureInviteCode(length);
    expect(code).toHaveLength(length);
  });

  it('should contain only allowed characters (A-Z, 0-9)', () => {
    const code = generateSecureInviteCode(100);
    expect(code).toMatch(/^[A-Z0-9]+$/);
  });

  it('should generate different codes on consecutive calls', () => {
    const code1 = generateSecureInviteCode();
    const code2 = generateSecureInviteCode();
    expect(code1).not.toBe(code2);
  });

  it('should correctly handle modulo bias by skipping values >= 252', () => {
    let callCount = 0;
    // We want to simulate values: 252, 253, 254, 255 (should be skipped) and then 0 (should be 'A')
    const mockValues = [252, 253, 254, 255, 0];

    vi.spyOn(crypto, 'getRandomValues').mockImplementation((arr) => {
      if (arr instanceof Uint8Array && arr.length === 1) {
        arr[0] = mockValues[callCount % mockValues.length];
        callCount++;
      }
      return arr;
    });

    const code = generateSecureInviteCode(1);
    // It should have skipped 252, 253, 254, 255 and picked 0 which is 'A'
    expect(code).toBe('A');
    expect(callCount).toBe(5);
  });
});
