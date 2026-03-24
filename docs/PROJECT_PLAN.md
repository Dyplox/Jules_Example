<<<<<<< HEAD
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
=======
# Plan de Proyecto, Metodología y Roles

Este documento define las reglas de juego para el desarrollo de la aplicación MVP, estableciendo claramente cómo trabajaremos juntos, qué roles asume cada parte y bajo qué marco metodológico operaremos para garantizar la entrega de valor constante.

## 1. Roles y Responsabilidades

En este modelo de desarrollo asistido por IA, los roles tradicionales de desarrollo de software se distribuyen de la siguiente manera:

### 1.1 El Usuario (Tú)
- **Stakeholder Principal / Patrocinador (Sponsor):** Eres el dueño del negocio y la visión.
- **Responsabilidades:**
  - Definir los objetivos de negocio y los requerimientos funcionales a alto nivel.
  - Proveer retroalimentación (feedback) sobre las entregas.
  - Establecer prioridades: ¿qué funcionalidad es más importante o urgente?
  - Aprobar (o rechazar) los incrementos entregados al final de cada ciclo.

### 1.2 La IA (Yo, Jules)
Actuaré como una "Agencia de Software" integrada asumiendo múltiples roles ágiles:
- **Product Owner (PO):**
  - Traducir tu visión y requerimientos a historias de usuario y tareas técnicas (gestión del `BACKLOG.md`).
  - Proponer el alcance de cada Sprint para maximizar el valor entregado.
- **Project Manager / Scrum Master (PM/SM):**
  - Asegurar que sigamos la metodología establecida.
  - Mantener los documentos del proyecto (`PROJECT_PLAN.md`, `BACKLOG.md`, `SCOPE.md`) siempre actualizados.
  - Gestionar impedimentos técnicos (ej. conflictos de dependencias, bugs imprevistos) transparentemente.
- **Equipo de Desarrollo (Dev Team):**
  - Escribir el código base, diseñar componentes UI, conectar la base de datos (Supabase).
  - Ejecutar pruebas automáticas (linting, build, test) antes de cada entrega.

---

## 2. Metodología de Trabajo (Agile Adaptado)

Adoptaremos una versión pragmática y adaptada de **Scrum / Kanban** diseñada para el flujo de interacción Humano-IA.

### 2.1 Ciclo de Desarrollo (Sprints Asíncronos)
No trabajaremos por semanas naturales, sino por **Sprints basados en hitos o paquetes de trabajo**. Cada vez que inicies una sesión conmigo y me pidas un paquete de trabajo, eso constituirá un mini-Sprint.

### 2.2 Ceremonias (Adaptadas a Prompts)
1. **Sprint Planning (Planificación):**
   - Tú solicitas una nueva funcionalidad (ej. "Crea el perfil de usuario").
   - Yo (PO) analizo la solicitud, desgloso las tareas en el `BACKLOG.md`, te explico el plan de acción técnica y pido tu confirmación.
2. **Execution (Ejecución):**
   - Yo (Dev) escribo y ejecuto el código, validando con las herramientas del sistema (lint, build).
3. **Sprint Review (Revisión):**
   - Te presento los cambios realizados, detallo qué archivos se tocaron y cómo probar la nueva funcionalidad.
   - Tú revisas la aplicación en tu entorno local o de desarrollo.
4. **Retrospective (Retrospectiva continua):**
   - Si algo falló o la UI no te gusta, iteramos. Yo ajustaré mis directrices internas para no repetir el error.

---

## 3. Flujo del Proyecto (Stages)

Para mantener el orden, desarrollaremos en las siguientes etapas secuenciales:

- **Etapa 1: Arquitectura y Cimientos (Sprint 1 Activo)**
  - Configuración inicial.
  - Sistema de Autenticación con Supabase (Registro, Login).
  - Sistema de diseño (Componentes Tácticos UI).
  - Manejo de estado global (Zustand).

- **Etapa 2: MVP Core Funcional (Próximos Sprints)**
  - Creación del Dashboard principal.
  - Navegación y rutas privadas protegidas.
  - Operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre las entidades de negocio principales en Supabase.

- **Etapa 3: Refinamiento y Seguridad**
  - Pulido de UX/UI, tiempos de carga y manejo de errores amigable.
  - Políticas de Seguridad a Nivel de Fila (RLS) estrictas en Supabase.
  - Preparación para despliegue a producción (Vercel).

- **Etapa 4: Escalabilidad (Post-MVP)**
  - Funcionalidades "Nice-to-have" (ej. Login social, integraciones de terceros).
>>>>>>> origin/main-npm-to-pnpm-10311818119078459483
