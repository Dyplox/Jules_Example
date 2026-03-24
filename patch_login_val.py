with open('src/pages/auth/Login.tsx', 'r') as f:
    content = f.read()

import_str = "import { validateEmail, validatePhone, validatePassword } from '../../utils/validators';\n"
content = content.replace("import { Button } from '../../components/ui/Button';", "import { Button } from '../../components/ui/Button';\n" + import_str)

old_submit = """  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {"""

new_submit = """  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    const identifierError = method === 'email' ? validateEmail(identifier) : validatePhone(identifier);
    if (identifierError) {
      setError(identifierError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    try {"""

content = content.replace(old_submit, new_submit)

with open('src/pages/auth/Login.tsx', 'w') as f:
    f.write(content)
