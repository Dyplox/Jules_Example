# Documento de Alcance (Scope)

Este documento define **qué está dentro** (In Scope) y **qué está fuera** (Out of Scope) del desarrollo del MVP (Producto Mínimo Viable). Esto ayuda a prevenir el desvío del alcance (*scope creep*) y garantiza que entreguemos valor real en el menor tiempo posible.

## 1. Visión General del Producto (MVP)
El MVP es una aplicación web táctica, construida con React 19, Vite, TypeScript y Tailwind CSS 4, utilizando Supabase como backend as a service para la base de datos y autenticación. El estado global está gestionado por Zustand.

## 2. En Alcance (In Scope) para el MVP
Lo siguiente forma parte de los entregables acordados para la versión inicial (v1.0):

### 2.1 Autenticación y Gestión de Usuarios (Supabase)
- Registro de usuarios mediante correo y contraseña.
- Inicio de sesión (Login).
- Gestión del estado de sesión en la aplicación cliente (Zustand `authStore.ts`).
- Flujo básico de Onboarding post-registro.

### 2.2 Interfaz de Usuario (UI) y Experiencia (UX)
- Implementación de un "Sistema de Diseño Táctico" (`TacticalInput`, `tactical-glass`, botones estandarizados).
- Diseño responsivo (Mobile-first o adaptativo) básico para pantallas comunes.
- Feedback visual para acciones del usuario (estados de carga `isLoading`, mensajes de error `setError`).

### 2.3 Arquitectura y Funcionalidad Core
- Rutas públicas (Login, Register) y rutas privadas protegidas (Dashboard, Perfil).
- Dashboard principal: Vista inicial después de autenticarse (funcionalidades específicas pendientes de definición por el Stakeholder).
- Conexión segura a la base de datos Supabase usando el cliente oficial `@supabase/supabase-js`.

### 2.4 Seguridad y Calidad
- Implementación básica de Row Level Security (RLS) en Supabase para proteger los datos de los usuarios.
- Validación de datos en el cliente y manejo de errores.
- Código limpio que pase `npm run lint` y `npm run build` sin advertencias críticas.

## 3. Fuera de Alcance (Out of Scope) para el MVP
Lo siguiente **NO** se incluirá en el desarrollo inicial del MVP, pero puede planificarse para versiones futuras (v2.0+) en el `BACKLOG.md`:

- Login Social (Google, GitHub, Apple, etc.) a menos que se solicite explícitamente como reemplazo del login tradicional.
- Implementación de notificaciones Push (PWA) avanzadas o por correo electrónico transaccionales complejas (ej. campañas de marketing).
- Soporte offline completo (sincronización bidireccional sin conexión).
- Desarrollo de aplicaciones móviles nativas (iOS/Android). Esto es estrictamente un proyecto web (React).
- Paneles de administración súper complejos para roles "SuperAdmin", a menos que sea un requerimiento core del negocio.
- Internacionalización (Múltiples idiomas) desde el día 1; el MVP será en un solo idioma.

## 4. Gestión de Cambios (Change Management)
Cualquier requerimiento nuevo solicitado por el Stakeholder (Tú) que no esté explícitamente detallado en la sección 2 ("En Alcance"), será evaluado por el Product Owner (IA).
Si el esfuerzo técnico es significativo, se añadirá a la sección "Icebox" o "Próximos Sprints" en el `BACKLOG.md` para no comprometer los tiempos de entrega de la versión actual.
