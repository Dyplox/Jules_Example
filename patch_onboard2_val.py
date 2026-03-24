with open('src/pages/onboarding/OnboardingStep2.tsx', 'r') as f:
    content = f.read()

import_str = "import { validateAge, validatePin } from '../../utils/validators';\n"
content = content.replace("import { Button } from '../../components/ui/Button';", "import { Button } from '../../components/ui/Button';\n" + import_str)

old_submit = """  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setIsLoading(true);

    try {"""

new_submit = """  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setError(null);

    // Validations
    if (!fullName.trim()) {
      setError('El nombre completo es requerido');
      return;
    }

    const ageError = validateAge(age);
    if (ageError) {
      setError(ageError);
      return;
    }

    const pinError = validatePin(pin);
    if (pinError) {
      setError(pinError);
      return;
    }

    setIsLoading(true);

    try {"""

content = content.replace(old_submit, new_submit)

with open('src/pages/onboarding/OnboardingStep2.tsx', 'w') as f:
    f.write(content)
