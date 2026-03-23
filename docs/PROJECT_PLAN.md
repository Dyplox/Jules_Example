# Plan de Proyecto y Metodología Ágil

## Resumen del Proyecto
Este documento establece la estructura de gestión de proyectos y las prácticas ágiles (Scrum/Kanban) para el desarrollo continuo de **GanadePro** en su fase MVP. Como Product Owner (PO) y Project Manager (PM), mi objetivo es maximizar el valor del producto, gestionar el Product Backlog y asegurar que el equipo de desarrollo entregue incrementos funcionales orientados al sector ganadero (Offline-first, App Móvil).

## Roles y Responsabilidades
- **Product Owner (PO):** Define la visión del producto, prioriza las necesidades del negocio (a través del feedback del Stakeholder/Sponsor) y gestiona el Product Backlog.
- **Project Manager / Scrum Master:** Facilita el proceso de desarrollo, coordina la arquitectura (Capacitor, Zustand, Supabase) y asegura que se sigan las metodologías ágiles.
- **Equipo de Desarrollo:** Implementa las funcionalidades en ciclos iterativos, asegurando la calidad del código (`pnpm lint`, `pnpm build`) y el rendimiento móvil.

*Nota: Yo (la IA) actuaré en las tres capacidades para asistir al Stakeholder.*

## Metodología
Utilizaremos un enfoque iterativo basado en **Sprints**. Cada Sprint entregará un componente fundamental del MVP, enfocándose en la experiencia móvil táctica. Llevaremos el registro de las tareas en `BACKLOG.md`. Solo existirá un archivo de seguimiento activo (`SPRINT.md`) que reflejará la etapa actual, sin versionarlo con números.

## Etapas de Desarrollo (Sprints Propuestos para el MVP de GanadePro)

### Fase 1 (Actual): Autenticación y Arquitectura Base
- **Objetivo:** Establecer los cimientos técnicos (Capacitor para empaquetado móvil, estrategia Offline-First) y desarrollar el flujo de Onboarding de 3 pasos (Roles, Biometría, Creación de Fincas y Lotes).
- **Entregables:** Migraciones SQL de Supabase, Integración inicial de Capacitor, Plugins biométricos, y UI/UX del Onboarding (Dueños y Empleados).

### Fase 2: Desarrollo Core (Offline-First y Bitácora Ganadera)
- **Objetivo:** Implementar la interfaz principal móvil (Dashboard) y el módulo principal de registro de animales con persistencia local robusta que sincronice hacia Supabase al detectar red.
- **Entregables:** Dashboard táctico móvil, Gestor de Inventario de ganado offline, Lógica de sincronización en segundo plano.

### Fase 3: Producción, Ventas y Mantenimiento
- **Objetivo:** Completar el MVP funcional, añadiendo los módulos operativos críticos.
- **Entregables:** Módulo de producción (leche/carne), registro de ventas, control de recursos e inventario de productos para cuidado animal.

### Fase 4: Pruebas en Dispositivos y Despliegue
- **Objetivo:** Asegurar que la aplicación funciona correctamente en condiciones de baja conectividad y aislar perfectamente los datos mediante RLS antes del build final para tiendas.
- **Entregables:** Auditoría de seguridad (Supabase RLS), pruebas de conexión (offline/online) en Android/iOS y optimización táctica final.

## Proceso de Trabajo
1. Se define y revisa el alcance del MVP en `SCOPE.md`.
2. Las tareas del ciclo actual se rastrean en `SPRINT.md` y `BACKLOG.md`.
3. El Stakeholder (Tú) aprobará las prioridades o requerirá ajustes.
4. Yo (Equipo de Desarrollo/PO) ejecutaré las tareas, realizando commits y manteniendo la calidad mediante pre-commit hooks.
