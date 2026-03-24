import re

with open('src/pages/onboarding/OnboardingStep1.tsx', 'r') as f:
    content = f.read()

# Make sure error uses .text-red-400
old_err_box = """            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
                {error}
              </div>
            )}"""

new_err_box = """            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md error-box">
                {error}
              </div>
            )}"""

content = content.replace(old_err_box, new_err_box)

with open('src/pages/onboarding/OnboardingStep1.tsx', 'w') as f:
    f.write(content)
