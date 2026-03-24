export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'El correo electrónico es requerido';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'El formato del correo es inválido';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return 'El teléfono es requerido';
  const phoneRegex = /^\+?[\d\s-]{8,15}$/;
  if (!phoneRegex.test(phone)) return 'El número de teléfono es inválido';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'La contraseña es requerida';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return null;
};

export const validatePin = (pin: string): string | null => {
  if (!pin) return 'El PIN es requerido';
  if (!/^\d{4}$/.test(pin)) return 'El PIN debe ser exactamente de 4 dígitos';
  return null;
};

export const validateAge = (age: string | number): string | null => {
  const numAge = typeof age === 'string' ? parseInt(age, 10) : age;
  if (isNaN(numAge)) return 'La edad debe ser un número';
  if (numAge < 18) return 'Debes ser mayor de 18 años para usar la plataforma';
  if (numAge > 120) return 'Por favor ingresa una edad válida';
  return null;
};
