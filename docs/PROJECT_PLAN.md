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
  - Integración de Capacitor para build móvil.
  - Estrategia Offline-First y flujo de Onboarding de 3 pasos.

- **Etapa 2: MVP Core Funcional (Próximos Sprints)**
  - Creación del Dashboard principal.
  - Navegación y rutas privadas protegidas.
  - Operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre las entidades de negocio principales en Supabase.
  - Gestor de Inventario de ganado offline, lógica de sincronización.

- **Etapa 3: Refinamiento y Seguridad**
  - Pulido de UX/UI, tiempos de carga y manejo de errores amigable.
  - Políticas de Seguridad a Nivel de Fila (RLS) estrictas en Supabase.
  - Auditoría de seguridad y pruebas en dispositivos reales.
  - Preparación para despliegue a producción.

- **Etapa 4: Escalabilidad (Post-MVP)**
  - Funcionalidades "Nice-to-have" (ej. Login social, integraciones Bluetooth/RFID, notificaciones Push).

## Proceso de Trabajo
1. Se define y revisa el alcance del MVP en `SCOPE.md`.
2. Las tareas del ciclo actual se rastrean en `SPRINT.md` y `BACKLOG.md`.
3. El Stakeholder (Tú) aprobará las prioridades o requerirá ajustes.
4. Yo (Equipo de Desarrollo/PO) ejecutaré las tareas, realizando commits y manteniendo la calidad mediante pre-commit hooks.
