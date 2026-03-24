import re

files_to_patch = [
    'src/pages/auth/Login.tsx',
    'src/pages/onboarding/OnboardingStep1.tsx',
    'src/pages/onboarding/OnboardingStep2.tsx',
    'src/pages/onboarding/OnboardingStep3Admin.tsx',
    'src/pages/onboarding/OnboardingStep3Employee.tsx'
]

for filepath in files_to_patch:
    with open(filepath, 'r') as f:
        content = f.read()

    # Add Button import if missing
    if "import { Button } from" not in content:
        import_stmt = "import { Button } from '../../components/ui/Button';\n"
        # Insert after other imports
        content = re.sub(r"(import .*?;\n)(?!import)", r"\1" + import_stmt, content, count=1)

    # General pattern to replace native submit button
    old_btn_pattern = r'<button\s+type="submit"\s+disabled=\{isLoading\}\s+className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50.*?>\s*\{isLoading \? (.*?) : (.*?)\}\s*</button>'

    # Replacement string using standard Button
    def repl_btn(match):
        loading_text = match.group(1).replace("'", "")
        normal_text = match.group(2).replace("'", "")
        return f'<Button type="submit" className="w-full mt-6" isLoading={{isLoading}}>\n              {{isLoading ? "{loading_text}" : "{normal_text}"}}\n            </Button>'

    content = re.sub(old_btn_pattern, repl_btn, content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(content)
