# Product Backlog y Sprints Activos

## Registro del Backlog (Lista priorizada de tareas)
Aquí mantenemos todas las ideas, mejoras y errores conocidos, ordenados por prioridad de negocio. El Product Owner es responsable de mantener esta lista.

## 🏃 Sprint Activo (Sprint 1: Consolidación de Autenticación y Arquitectura Base)

**Objetivo del Sprint:** Garantizar que el flujo de autenticación, el estado global (`useAuthStore`) y la integración inicial con Supabase funcionen de manera fluida y sin errores de consola o de experiencia de usuario.

### Tareas del Sprint (Por hacer / En Progreso / Hecho):
- [ ] **TODO:** Revisar el flujo de Onboarding y Login para identificar problemas o bugs conocidos.
- [ ] **TODO:** Asegurar que `src/store/authStore.ts` esté manejando los errores de Supabase correctamente y proporcionando feedback a la UI (`setError`).
- [ ] **TODO:** Revisar y optimizar el diseño táctico de las pantallas de autenticación (`TacticalInput`, `tactical-glass`, etc).
- [ ] **TODO:** Asegurarse de que `pnpm run lint` y `pnpm run build` pasen sin errores tras auditar los componentes base.
- [ ] 
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
