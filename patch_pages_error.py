import re
import os

files_to_patch = [
    'src/pages/auth/Login.tsx',
    'src/pages/onboarding/OnboardingStep1.tsx',
    'src/pages/onboarding/OnboardingStep2.tsx',
    'src/pages/onboarding/OnboardingStep3Admin.tsx',
    'src/pages/onboarding/OnboardingStep3Employee.tsx'
]

def map_error(match):
    prefix = match.group(1)
    suffix = match.group(2)
    return f"""{prefix}
      let msg = (err as Error).message;
      if (msg.includes('Invalid login credentials')) msg = 'Credenciales incorrectas';
      if (msg.includes('User already registered')) msg = 'El usuario ya está registrado';
      if (msg.includes('Password should be at least')) msg = 'La contraseña es muy corta';
      if (msg.includes('duplicate key value')) msg = 'Este registro ya existe';
      setError(msg || {suffix}"""

for filepath in files_to_patch:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Match things like `setError((err as Error).message || 'Error al guardar el perfil');`
    pattern = r'(catch\s*\(err:\s*Error\s*\|\s*unknown\)\s*\{\s*)setError\(\(err\s*as\s*Error\)\.message\s*\|\|\s*(.*?)\);'

    content = re.sub(pattern, map_error, content)

    with open(filepath, 'w') as f:
        f.write(content)
