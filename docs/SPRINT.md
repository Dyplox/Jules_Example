<<<<<<< HEAD
# Sprint Activo: Onboarding, Biometría, Roles y Arquitectura Base

**Objetivo:** Establecer la base técnica (Capacitor, Biometría, Offline-first) y desarrollar el flujo de Onboarding de 3 pasos para **GanadePro**, asegurando la estructura jerárquica de `Admin -> Fincas -> Lotes` y el rol de Empleados en Supabase.

---

## 📋 Tareas por Hacer (To-Do)
- [ ] **TODO (Supabase):** Diseñar y aplicar migraciones SQL para las tablas `profiles`, `farms`, `farm_lots` y `farm_members`.
- [ ] **TODO (Arquitectura):** Inicializar e integrar **Capacitor** en el proyecto React/Vite para build móvil.
- [ ] **TODO (Arquitectura):** Configurar y agregar soporte de **Biometría/PIN** usando los plugins de Capacitor.
- [ ] **TODO (Arquitectura):** Configurar el manejo de estado **Offline-first** (Zustand/RxDB) para la persistencia inicial y preparar sincronización.
- [ ] **TODO (UI/UX):** Desarrollar la pantalla de "Slider Informativo" que se muestra solo la primera vez.
- [ ] **TODO (UI/UX):** Implementar **Paso 1 del Onboarding:** Registro (Correo, Teléfono, Google, Apple) y Legales.
- [ ] **TODO (UI/UX):** Implementar **Paso 2 del Onboarding:** Configurar Perfil (Nombre, Edad, Creación de PIN/Biometría).
- [ ] **TODO (UI/UX):** Implementar **Paso 3 del Onboarding (Dueños):** Crear Finca (Nombre, país, ganado) y definir Lotes.
- [ ] **TODO (UI/UX):** Implementar **Paso 3 del Onboarding (Empleados):** Ingresar código de invitación o asociarse a finca existente.

## 🏗️ En Progreso (In Progress)
*(Vacío al inicio del Sprint)*

## ✅ Hecho (Done)
- [x] **TODO (PO/PM):** Actualizar y estructurar la documentación ágil (`SCOPE.md`, `BACKLOG.md`, `PROJECT_PLAN.md`, `SPRINT.md`) reflejando los requerimientos de GanadePro.

---

## Notas del Equipo de Desarrollo (IA)
- Al empaquetar con Capacitor, los flujos de "Social Login" requerirán una configuración específica nativa (Google Sign-In plugin de Capacitor o redirección web). Se implementará la base en Supabase primero.
- La tabla `farm_members` gestionará el control de acceso, vinculando a los empleados (con un PIN/Biometría de acceso a la app) a los lotes específicos de la finca del administrador, manejado por Supabase RLS.
=======
# Sprint 1: Onboarding y Login

## Información General
- **Estado:** Activo 🟢
- **Objetivo del Sprint:** Consolidar, estabilizar y auditar los flujos de "Onboarding" y "Login/Registro".
- **Alcance Estricto:** Este sprint se limitará exclusivamente a los archivos ubicados en `src/pages/auth/` y `src/pages/onboarding/`, además de la gestión de estado global relacionada (`src/store/authStore.ts`).

## Tareas del Sprint (Backlog del Sprint)

### Épica 1: Autenticación Base (Login / Registro)
- [ ] **Tarea 1.1:** Auditar el código de `src/pages/auth/Login.tsx` y `src/pages/auth/Register.tsx`. Verificar que el manejo de errores provenientes de Supabase Auth sea claro y se refleje en la UI usando el componente `TacticalInput` y el sistema de diseño táctico.
- [ ] **Tarea 1.2:** Revisar el archivo duplicado de conflicto `Register.tsx.orig` y eliminarlo si ya no es necesario, limpiando el repositorio de artefactos.
- [ ] **Tarea 1.3:** Validar la seguridad de los inputs de contraseña y correo, asegurando que prevengan auto-envíos o comportamientos inesperados en React 19.

### Épica 2: Flujo de Onboarding
- [ ] **Tarea 2.1:** Auditar el código de `src/pages/onboarding/Welcome.tsx` y `src/pages/onboarding/Setup.tsx`.
- [ ] **Tarea 2.2:** Asegurar que la transición desde el *Registro Exitoso* al *Onboarding* (Welcome -> Setup) esté enrutada correctamente usando React Router v7 en `App.tsx`.
- [ ] **Tarea 2.3:** Verificar que los datos recogidos durante el Onboarding (en `Setup.tsx`) se están enviando de forma robusta y guardando en la tabla correcta de Supabase, o en su defecto, en el estado de Zustand.

### Épica 3: Estado Global y Diseño Táctico
- [ ] **Tarea 3.1:** Revisar `src/store/authStore.ts` para confirmar que las funciones de `login`, `register` y la propiedad `setError` actúan como única fuente de verdad.
- [ ] **Tarea 3.2:** Confirmar consistencia visual. Asegurarse de que el uso de clases utilitarias de Tailwind CSS (como `tactical-glass`) sea uniforme en todos los formularios.

## Ejecución del Sprint
*Yo, como Equipo de Desarrollo, iré ejecutando estas tareas secuencialmente y actualizando este documento marcándolas como completadas `[x]`. Reportaré los hallazgos y correcciones al Stakeholder (Tú) al final del ciclo de ejecución.*
>>>>>>> origin/main-npm-to-pnpm-10311818119078459483
