with open('src/store/authStore.ts', 'r') as f:
    content = f.read()

def repl_error(match):
    return """if (error instanceof Error) {
        let msg = error.message;
        if (msg.includes('Invalid login credentials')) msg = 'Credenciales incorrectas';
        if (msg.includes('User already registered')) msg = 'El usuario ya está registrado';
        if (msg.includes('Password should be at least')) msg = 'La contraseña es muy corta';
        set({ error: msg, isLoading: false });
      }"""

import re
content = re.sub(r"if \(error instanceof Error\) \{\s+set\(\{ error: error\.message, isLoading: false \}\);\s+\}", repl_error, content)

with open('src/store/authStore.ts', 'w') as f:
    f.write(content)
