# Product Backlog y Sprints Activos

## Registro del Backlog (Lista priorizada de tareas)
<<<<<<< HEAD
Aquí mantenemos todas las ideas, mejoras y errores conocidos, ordenados por prioridad de negocio. El Product Owner es responsable de mantener esta lista y alinearla con los requerimientos del Stakeholder.

## 🏃 Sprint Activo (Sprint 1: Onboarding, Biometría, Roles y Arquitectura Base)

**Objetivo del Sprint:** Garantizar que el flujo inicial (Slider, Onboarding visual en 3 pasos, Autenticación, Roles Dueño/Empleado) y la arquitectura base (Offline-first, Capacitor, Biometría) funcionen perfectamente, reflejando el modelo de datos en Supabase.

### Tareas del Sprint (Por hacer / En Progreso / Hecho):
- [ ] **TODO (Supabase):** Diseñar y aplicar migraciones SQL para las tablas `profiles`, `farms`, `farm_lots` y `farm_members`.
- [ ] **TODO (Arquitectura):** Inicializar e integrar **Capacitor** en el proyecto React/Vite para build móvil.
- [ ] **TODO (Arquitectura):** Configurar y agregar soporte de **Biometría/PIN** usando los plugins de Capacitor.
- [ ] **TODO (Arquitectura):** Configurar el manejo de estado **Offline-first** (Zustand/RxDB) para la persistencia inicial y preparar sincronización.
- [ ] **TODO (UI/UX):** Desarrollar la pantalla de "Slider Informativo" que se muestra solo la primera vez.
- [ ] **TODO (UI/UX):** Implementar **Paso 1 del Onboarding:** Registro (Correo, Teléfono, Google, Apple) y Legales.
- [ ] **TODO (UI/UX):** Implementar **Paso 2 del Onboarding:** Configurar Perfil (Nombre, Edad, Creación de PIN/Biometría).
- [ ] **TODO (UI/UX):** Implementar **Paso 3 del Onboarding (Dueños):** Crear Finca (Nombre, país, ganado) y definir Lotes.
- [ ] **TODO (UI/UX):** Implementar **Paso 3 del Onboarding (Empleados):** Ingresar código de invitación o asociarse a finca existente.

## 📅 Próximos Sprints (Planificados / En Evaluación)

### Sprint 2: Core Offline-first y Bitácora Ganadera
- [ ] **Idea:** Desarrollar Layout Principal (Mobile Dashboard) para Dueños vs. Empleados.
- [ ] **Idea:** Implementar la lógica de "Sincronización de Fondo" (Supabase <-> Local DB) cuando se recupere la conexión.
- [ ] **Idea:** Módulo de Inventario de Ganado (Crear, Editar, Listar animales con soporte offline).

### Sprint 3: Producción, Ventas y Manejo de Recursos
- [ ] **Idea:** Módulo de registro de producción (leche, carne).
- [ ] **Idea:** Registro de ventas básico.
- [ ] **Idea:** Gestión de inventario de recursos y productos para el cuidado animal.

### Sprint 4: Pruebas en Dispositivo Real y Auditoría
- [ ] **Idea:** Pruebas exhaustivas del flujo offline-to-online en dispositivo móvil (Android/iOS).
- [ ] **Idea:** Auditoría estricta de políticas RLS en Supabase (Aislamiento de datos entre fincas).
- [ ] **Idea:** Preparar el build final para tiendas de aplicaciones.

---

## 💡 Icebox (Ideas futuras / Sin planificar para el MVP)
- [ ] *Integración con básculas Bluetooth para registro automático de peso.*
- [ ] *Lectura de crotales RFID directamente desde la app.*
- [ ] *Notificaciones Push en tiempo real (PWA/Capacitor).*

## 🐛 Backlog de Bugs (QA y Pruebas)
- [ ] **QA (Infra):** Configurar Vitest y Playwright en el proyecto para habilitar el rol de Aseguramiento de Calidad.
- [ ] **QA (E2E):** Crear prueba automatizada con Playwright para el flujo completo de Onboarding (Dueño y Empleado).
=======
Aquí mantenemos todas las ideas, mejoras y errores conocidos, ordenados por prioridad de negocio. El Product Owner es responsable de mantener esta lista.

---

## 🏃 Sprint Activo (Sprint 1: Onboarding y Login)

**[En Progreso]** -> Ver desglose detallado en [`docs/SPRINT.md`](SPRINT.md)
**Objetivo del Sprint:** Garantizar que el flujo de autenticación, el estado global (`useAuthStore`) y la integración inicial con Supabase funcionen de manera fluida y sin errores de consola o de experiencia de usuario.

### Tareas del Sprint (Por hacer / En Progreso / Hecho):
- [ ] **TODO:** Revisar el flujo de Onboarding y Login para identificar problemas o bugs conocidos.
- [ ] **TODO:** Asegurar que `src/store/authStore.ts` esté manejando los errores de Supabase correctamente y proporcionando feedback a la UI (`setError`).
- [ ] **TODO:** Revisar y optimizar el diseño táctico de las pantallas de autenticación (`TacticalInput`, `tactical-glass`, etc).
- [ ] **TODO:** Asegurarse de que `pnpm run lint` y `pnpm run build` pasen sin errores tras auditar los componentes base.

---

## 📅 Próximos Sprints (Planificados / En Evaluación)

### Sprint 2: Desarrollo de Funcionalidades Core (MVP)
- [ ] **Idea:** Desarrollar Layout Principal para usuarios autenticados.
- [ ] **Idea:** Implementar la primera vista del Dashboard (¿qué datos verá el usuario?).
- [ ] **Idea:** Crear el componente de navegación principal seguro (Sidebar/Navbar).
- [ ] **Idea:** Definir y estructurar los demás estados globales en Zustand (ej. datos del perfil de usuario).

### Sprint 3: Refinamiento UI/UX y Optimización
- [ ] **Idea:** Estandarizar componentes de UI bajo el sistema de diseño táctico.
- [ ] **Idea:** Manejo de loading states en botones y skeleton screens.
- [ ] **Idea:** Revisión de performance (Lazy loading en rutas de React Router).

### Sprint 4: Pruebas y Preparación para Producción
- [ ] **Idea:** Revisar políticas de RLS en base de datos Supabase.
- [ ] **Idea:** Validar configuración de despliegue en Vercel (`vercel.json`).
- [ ] **Idea:** Crear/Documentar pruebas básicas si es requerido.

---

## 💡 Icebox (Ideas futuras / Sin planificar)
- [ ] *Ejemplo: Añadir login social con Google/GitHub (Supabase Auth).*
- [ ] *Ejemplo: Implementar notificaciones in-app.*
- [ ] *Ejemplo: Añadir modo offline (PWA settings).*
>>>>>>> origin/main-npm-to-pnpm-10311818119078459483
