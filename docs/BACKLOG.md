# Product Backlog y Sprints Activos

## Registro del Backlog (Lista priorizada de tareas)
Aquí mantenemos todas las ideas, mejoras y errores conocidos, ordenados por prioridad de negocio. El Product Owner es responsable de mantener esta lista.

---

## 🏃 Sprint Activo (Sprint 2: Desarrollo de Funcionalidades Core - MVP)

**[En Progreso]** -> Ver desglose detallado en [`docs/SPRINT_2.md`](SPRINT_2.md)
**Objetivo del Sprint:** Crear el Layout Principal seguro para usuarios autenticados y desarrollar la vista central del Dashboard (MVP Core Funcional).

### Tareas del Sprint (Por hacer / En Progreso / Hecho):
- [ ] **TODO:** Desarrollar Layout Principal para usuarios autenticados.
- [ ] **TODO:** Implementar la primera vista del Dashboard.
- [ ] **TODO:** Crear el componente de navegación principal seguro (Sidebar/Navbar).
- [ ] **TODO:** Definir y estructurar los demás estados globales en Zustand (ej. datos del perfil de usuario).

---

## 📅 Próximos Sprints (Planificados / En Evaluación)

### Sprint 3: Refinamiento UI/UX y Optimización
- [ ] **Idea:** Estandarizar componentes de UI bajo el sistema de diseño táctico.
- [ ] **Idea:** Manejo de loading states en botones y skeleton screens.
- [ ] **Idea:** Revisión de performance (Lazy loading en rutas de React Router).

### Sprint 4: Pruebas y Preparación para Producción
- [ ] **Idea:** Revisar políticas de RLS en base de datos Supabase.
- [ ] **Idea:** Validar configuración de despliegue en Vercel (`vercel.json`).
- [ ] **Idea:** Crear/Documentar pruebas básicas si es requerido.

---

## 🗃️ Sprints Anteriores (Completados)

### [Completado] Sprint 1: Onboarding y Login
- [x] Consolidar y auditar los flujos de "Onboarding" y "Login/Registro".
- [x] Integración de Auth con Supabase y manejo de estado con Zustand (`useAuthStore`).
- [x] Eliminación de código obsoleto y mejora visual (`tactical-glass`, `TacticalInput`).
- [x] Migración a pnpm.

---

## 💡 Icebox (Ideas futuras / Sin planificar)
- [ ] *Ejemplo: Añadir login social con Google/GitHub (Supabase Auth).*
- [ ] *Ejemplo: Implementar notificaciones in-app.*
- [ ] *Ejemplo: Añadir modo offline (PWA settings).*
