import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone, validatePassword, validatePin, validateAge } from './validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    it('should return error if email is empty', () => {
      expect(validateEmail('')).toBe('El correo electrónico es requerido');
      expect(validateEmail('   ')).toBe('El correo electrónico es requerido');
    });

    it('should return error for invalid emails', () => {
      expect(validateEmail('test@')).toBe('El formato del correo es inválido');
      expect(validateEmail('test.com')).toBe('El formato del correo es inválido');
      expect(validateEmail('@test.com')).toBe('El formato del correo es inválido');
    });

    it('should return null for valid emails', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name@domain.co.uk')).toBeNull();
    });
  });

  describe('validatePhone', () => {
    it('should return error if phone is empty', () => {
      expect(validatePhone('')).toBe('El teléfono es requerido');
    });

    it('should return error for invalid phone numbers', () => {
      expect(validatePhone('123')).toBe('El número de teléfono es inválido'); // too short
      expect(validatePhone('abcdefgh')).toBe('El número de teléfono es inválido'); // chars
    });

    it('should return null for valid phone numbers', () => {
      expect(validatePhone('123456789')).toBeNull();
      expect(validatePhone('+1 234 567 8900')).toBeNull();
    });
  });

  describe('validatePassword', () => {
    it('should return error if password is empty', () => {
      expect(validatePassword('')).toBe('La contraseña es requerida');
    });

    it('should return error if password is less than 6 chars', () => {
      expect(validatePassword('12345')).toBe('La contraseña debe tener al menos 6 caracteres');
    });

    it('should return null for valid passwords', () => {
      expect(validatePassword('123456')).toBeNull();
      expect(validatePassword('secretPass123')).toBeNull();
    });
  });

  describe('validatePin', () => {
    it('should return error if PIN is empty', () => {
      expect(validatePin('')).toBe('El PIN es requerido');
    });

    it('should return error if PIN is not 4 digits', () => {
      expect(validatePin('123')).toBe('El PIN debe ser exactamente de 4 dígitos');
      expect(validatePin('12345')).toBe('El PIN debe ser exactamente de 4 dígitos');
      expect(validatePin('123a')).toBe('El PIN debe ser exactamente de 4 dígitos');
    });

    it('should return null for valid PIN', () => {
      expect(validatePin('1234')).toBeNull();
      expect(validatePin('0000')).toBeNull();
    });
  });

  describe('validateAge', () => {
    it('should return error for non-numbers', () => {
      expect(validateAge('abc')).toBe('La edad debe ser un número');
    });

    it('should return error for age under 18', () => {
      expect(validateAge(17)).toBe('Debes ser mayor de 18 años para usar la plataforma');
      expect(validateAge('16')).toBe('Debes ser mayor de 18 años para usar la plataforma');
    });

    it('should return error for impossible age', () => {
      expect(validateAge(121)).toBe('Por favor ingresa una edad válida');
    });

    it('should return null for valid age', () => {
      expect(validateAge(18)).toBeNull();
      expect(validateAge('25')).toBeNull();
      expect(validateAge(65)).toBeNull();
    });
  });
});
