# Plan de Proyecto y Metodología Ágil

## Resumen del Proyecto
Este documento establece la estructura de gestión de proyectos y las prácticas ágiles (Scrum/Kanban) para el desarrollo continuo de la aplicación MVP. Como Product Owner (PO) y Project Manager (PM), mi objetivo es maximizar el valor del producto, gestionar el Product Backlog y asegurar que el equipo de desarrollo (yo, en este caso, como tu ingeniero de software IA) entregue incrementos funcionales en cada ciclo (Sprint).

## Roles y Responsabilidades
- **Product Owner (PO):** Define la visión del producto, prioriza las necesidades del negocio (a través del feedback tuyo, el usuario) y gestiona el Product Backlog.
- **Project Manager / Scrum Master:** Facilita el proceso de desarrollo, elimina impedimentos y asegura que se sigan las metodologías ágiles.
- **Equipo de Desarrollo:** Implementa las funcionalidades en ciclos iterativos.

*Nota: Yo actuaré en las tres capacidades para asistirte.*

## Metodología
Utilizaremos un enfoque iterativo basado en **Sprints**. Cada Sprint tendrá un objetivo claro y entregará valor funcional. Llevaremos el registro de las tareas en `BACKLOG.md`.

## Etapas de Desarrollo (Sprints Propuestos)

### Sprint 1: Consolidación de Autenticación y Arquitectura Base
- **Objetivo:** Asegurar que el sistema de autenticación (login, registro) con Supabase funciona perfectamente y la estructura base de React + Vite + TypeScript es sólida.
- **Entregables:**
  - Revisión del `authStore.ts` y conexión con Supabase.
  - Verificación del diseño táctico en las pantallas de Auth.
  - Corrección de bugs iniciales en el Onboarding o Auth.

### Sprint 2: Desarrollo de Funcionalidades Core (MVP)
- **Objetivo:** Implementar las funcionalidades principales del producto una vez que el usuario está autenticado.
- **Entregables:**
  - Creación del Dashboard principal.
  - Implementación de estado global (Zustand) para los datos del usuario/aplicación.
  - Navegación segura (Rutas protegidas).

### Sprint 3: Refinamiento UI/UX y Optimización
- **Objetivo:** Mejorar la experiencia del usuario y optimizar el rendimiento.
- **Entregables:**
  - Mejoras de accesibilidad y feedback visual.
  - Refactorización de componentes (reutilización de componentes tácticos).
  - Optimización de llamadas a Supabase.

### Sprint 4: Pruebas y Preparación para Producción
- **Objetivo:** Garantizar la estabilidad del software antes de un lanzamiento real.
- **Entregables:**
  - Pruebas unitarias/integración (si aplica).
  - Auditoría de seguridad de Supabase (RLS policies).
  - Ajustes finales de build y despliegue (Vercel).

## Proceso de Trabajo
1. Revisaremos el `BACKLOG.md` periódicamente.
2. Tú (como Stakeholder principal) aprobarás o pedirás cambios en la priorización.
3. Yo ejecutaré las tareas del Sprint activo.
4. Al final de cada tarea/Sprint, revisaremos los incrementos.
