with open('src/pages/onboarding/OnboardingStep1.tsx', 'r') as f:
    content = f.read()

import_str = "import { validateEmail, validatePhone, validatePassword } from '../../utils/validators';\n"
content = content.replace("import { Button } from '../../components/ui/Button';", "import { Button } from '../../components/ui/Button';\n" + import_str)

old_submit = """  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }
    setIsLoading(true);

    // In a real scenario with Supabase, we would handle phone auth differently.
    // For MVP, we will rely on email mostly.
    const identifier = method === 'email' ? email : phone;

    try {"""

new_submit = """  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    // Validations
    if (method === 'email') {
      const emailError = validateEmail(email);
      if (emailError) { setError(emailError); return; }
    } else {
      const phoneError = validatePhone(phone);
      if (phoneError) { setError(phoneError); return; }
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    // In a real scenario with Supabase, we would handle phone auth differently.
    // For MVP, we will rely on email mostly.
    const identifier = method === 'email' ? email : phone;

    try {"""

content = content.replace(old_submit, new_submit)

with open('src/pages/onboarding/OnboardingStep1.tsx', 'w') as f:
    f.write(content)
