# Sprint 2: Desarrollo de Funcionalidades Core (MVP)

## Información General
- **Estado:** Activo 🟢
- **Objetivo del Sprint:** Crear el Layout Principal seguro para usuarios autenticados y desarrollar la vista central del Dashboard (MVP Core Funcional).
- **Alcance Estricto:** Este sprint abarcará la creación de un sistema de navegación protegida (Navbar/Sidebar), el esqueleto y la primera iteración de la vista `Dashboard.tsx`, y la definición de estados globales adicionales en Zustand necesarios para la sesión del usuario autenticado.

## Tareas del Sprint (Backlog del Sprint)

### Épica 1: Layout y Rutas Protegidas
- [ ] **Tarea 1.1:** Desarrollar e implementar el Layout Principal (ej. `MainLayout.tsx`) que envuelva a todas las rutas protegidas, asegurando que los usuarios no autenticados sean redirigidos al `/login`.
- [ ] **Tarea 1.2:** Crear el componente de navegación principal (Navbar o Sidebar) integrado en el Layout, con opciones para navegar al Dashboard y un botón seguro para "Cerrar Sesión" (integrado con Supabase Auth).

### Épica 2: Vista del Dashboard Central
- [ ] **Tarea 2.1:** Diseñar y construir la primera iteración del `Dashboard.tsx`. Definir qué información crítica verá el usuario (indicadores clave, tarjetas de resumen, etc) utilizando el sistema de diseño táctico y componentes como `tactical-glass`.
- [ ] **Tarea 2.2:** Preparar el Dashboard para consumir datos reales. Configurar consultas básicas a Supabase (o mock de datos si la base de datos aún no tiene estructura para entidades del negocio).

### Épica 3: Gestión de Estado Adicional
- [ ] **Tarea 3.1:** Crear o extender stores de Zustand (ej. `useUserStore` o dentro de `useAuthStore`) para manejar los datos del perfil del usuario (nombre, avatar, preferencias básicas) que se mostrarán en la navegación y el Dashboard.

## Ejecución del Sprint
*Yo, como Equipo de Desarrollo, iré ejecutando estas tareas secuencialmente y actualizando este documento marcándolas como completadas `[x]`. Reportaré los hallazgos y correcciones al Stakeholder (Tú) al final del ciclo de ejecución.*
