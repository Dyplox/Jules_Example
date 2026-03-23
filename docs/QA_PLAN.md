# Plan de Aseguramiento de Calidad (QA)

Este documento define la estrategia, herramientas y estándares del rol de Aseguramiento de Calidad (QA) dentro del proyecto MVP de **GanadePro**. Como parte del desarrollo continuo, el rol de QA garantiza que la aplicación sea robusta, funcione offline y soporte los flujos de negocio sin errores.

## 1. Stack Tecnológico de Pruebas

Basado en las mejores herramientas identificadas para nuestro entorno React + Vite:

- **Pruebas Unitarias y de Componentes: [Vitest](https://vitest.dev/) + React Testing Library**
  - *¿Por qué?* Vitest está construido sobre Vite, lo que permite aprovechar la misma configuración de la aplicación sin sobrecarga adicional. Es el sucesor moderno de Jest para nuestro stack.
  - *Alcance:* Lógica de negocio en el estado global (`Zustand`), validaciones de `Supabase` y pruebas aisladas de componentes UI tácticos (ej. `TacticalInput`).

- **Pruebas End-to-End (E2E) e Integración: [Playwright](https://playwright.dev/)**
  - *¿Por qué?* Playwright permite simular navegadores reales y emular entornos móviles o conexiones intermitentes (vital para nuestra arquitectura **Offline-first**).
  - *Alcance:* Validación de flujos de usuario completos, como el Onboarding, Login con biometría y la sincronización local-nube (Offline to Online).

## 2. Tipos de Pruebas

### 2.1 Pruebas de Humo (Smoke Testing)
- **Objetivo:** Asegurar que los componentes críticos del sistema cargan después de un despliegue.
- **Validación:** ¿La app levanta? ¿El slider inicial se muestra? ¿El botón de login responde?

### 2.2 Pruebas de Regresión Automáticas
- **Objetivo:** Evitar que nuevos desarrollos (como la Bitácora de Ganado) rompan funciones existentes (como el Onboarding).
- **Ejecución:** Cada commit o Pull Request disparará los tests de Vitest para garantizar integridad antes de mergear al branch principal.

### 2.3 Pruebas de Interrupción / Offline (Edge Cases)
- **Objetivo:** Validar la capacidad de persistencia local (Zustand/RxDB) y sincronización con Supabase.
- **Validación (Rol QA):**
  1. Iniciar sesión online.
  2. Apagar red (emulado con Playwright o manualmente en dispositivo).
  3. Crear una finca/lote.
  4. Encender red y validar sincronización.

## 3. Integración en el Pipeline (CI/CD)
El flujo de pre-commit debe incluir siempre una revisión de QA automatizada. Al completar este plan inicial, configuraremos los scripts en `package.json` de tal manera que `pnpm test` (Vitest) y `pnpm test:e2e` (Playwright) se conviertan en requisitos obligatorios antes de generar compilaciones de Capacitor para producción.

## 4. Gestión de Errores
Cualquier defecto encontrado durante la validación QA será documentado inmediatamente en la sección "Backlog de Bugs" del `BACKLOG.md` para ser priorizado en el siguiente Sprint.
