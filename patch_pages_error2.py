import re
import os

files_to_patch = [
    'src/pages/auth/Login.tsx',
    'src/pages/onboarding/OnboardingStep1.tsx',
    'src/pages/onboarding/OnboardingStep2.tsx',
    'src/pages/onboarding/OnboardingStep3Admin.tsx',
    'src/pages/onboarding/OnboardingStep3Employee.tsx'
]

for filepath in files_to_patch:
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Match things like `setError(msg || 'Error al iniciar sesión'`
    pattern = r"setError\(msg \|\| (.*?)\s*\} finally"

    def add_paren(match):
        return f"setError(msg || {match.group(1)});\n    }} finally"

    content = re.sub(pattern, add_paren, content)

    with open(filepath, 'w') as f:
        f.write(content)
