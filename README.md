# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Estructura del Proyecto

```
.
├── .env                  # Variables de entorno (ej. Supabase URL y Anon Key)
├── public/               # Archivos estáticos públicos
├── src/                  # Código fuente de la aplicación
│   ├── assets/           # Imágenes y otros recursos
│   ├── components/       # Componentes React reutilizables
│   │   └── ui/           # Componentes UI (Botones, Inputs Tácticos, etc.)
│   ├── lib/              # Configuración de librerías de terceros
│   │   └── supabase.ts   # Cliente de Supabase
│   ├── pages/            # Páginas y vistas principales de la aplicación
│   │   ├── auth/         # Vistas de autenticación (Login.tsx, Register.tsx)
│   │   └── onboarding/   # Vistas de Onboarding
│   ├── store/            # Gestión de estado global
│   │   └── authStore.ts  # Zustand Store para el estado de autenticación de Supabase
│   ├── utils/            # Funciones de utilidad (ej. cn para Tailwind)
│   ├── App.tsx           # Componente principal y enrutamiento (React Router)
│   ├── index.css         # Estilos globales y Tailwind CSS
│   └── main.tsx          # Punto de entrada de React
├── eslint.config.js      # Configuración de ESLint
├── index.html            # Plantilla HTML principal
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.ts        # Configuración de Vite
```
