# Documento de Alcance (Scope)

Este documento define **qué está dentro** (In Scope) y **qué está fuera** (Out of Scope) del desarrollo del MVP (Producto Mínimo Viable) de **GanadePro**. Esto ayuda a prevenir el desvío del alcance (*scope creep*) y garantiza que entreguemos valor real en el menor tiempo posible para el sector ganadero.

## 1. Visión General del Producto (MVP)
GanadePro es una aplicación orientada al sector ganadero (fincas) diseñada para funcionar con una arquitectura **Offline-First**. Construida con React 19, Vite, TypeScript, Tailwind CSS 4, Zustand y empaquetada como aplicación móvil nativa usando **Capacitor**. Utiliza Supabase como backend as a service para la base de datos y autenticación, con soporte de sincronización para operar en zonas sin internet.

## 2. En Alcance (In Scope) para el MVP

### 2.1 Autenticación y Gestión de Usuarios (Supabase)
- Registro e inicio de sesión mediante Correo Electrónico, Teléfono, Google y Apple.
- Autenticación rápida y segura mediante **Biometría (Huella/FaceID)** o **PIN local** tras el primer inicio de sesión.
- Gestión de sesión y roles (`Dueño/Administrador` y `Empleado`).
- Slider informativo inicial (solo la primera vez que se abre la app).
- Flujo de Onboarding visual estructurado en 3 pasos:
  1. Crear cuenta y aceptar legales.
  2. Configurar perfil personal (Nombre, edad, biometría/PIN).
  3. Asociar o crear finca (El dueño crea Finca y Lotes; el empleado ingresa código de invitación/asociación).

### 2.2 Interfaz de Usuario (UI) y Experiencia (UX)
- Implementación del "Sistema de Diseño Táctico" adaptado para uso en campo (botones grandes, alto contraste).
- Diseño **Mobile-first** estricto, optimizado para uso táctil en dispositivos móviles.
- Feedback visual claro para estados offline/online, sincronización, y carga.

### 2.3 Arquitectura y Funcionalidad Core
- **Empaquetado Móvil:** Integración de Capacitor para despliegue en Android/iOS.
- **Offline-first:** Almacenamiento y persistencia de estado local (RxDB o Zustand) que permite usar la app sin conexión a internet y sincroniza con Supabase al recuperar señal.
- Estructura de datos jerárquica: `1 Administrador -> N Fincas -> N Lotes`.
- Rutas públicas (Onboarding, Auth) y rutas privadas protegidas.

### 2.4 Seguridad y Calidad
- Implementación de Row Level Security (RLS) en Supabase para asegurar que los empleados solo vean datos de la finca asignada, y los dueños solo sus fincas.
- Validación estricta de datos en el cliente mediante utilidades centralizadas (`validators.ts`).
- Manejo de errores claro y amigable en la UI.
- Código limpio que pase `pnpm run lint` y `pnpm run build` sin advertencias críticas.
- Uso exclusivo de `pnpm`.

## 3. Fuera de Alcance (Out of Scope) para el MVP
Lo siguiente **NO** se incluirá en el desarrollo inicial del MVP, pero puede planificarse para versiones futuras (v2.0+) en el `BACKLOG.md`:

- Paneles de administración súper complejos para roles "SuperAdmin" (acceso a todos los clientes del sistema).
- Soporte multi-idioma (Internacionalización); el MVP será exclusivamente en español.
- Integración con hardware externo de fincas (ej. básculas Bluetooth, crotales RFID) en esta primera fase.
- Módulo de contabilidad o facturación electrónica compleja (solo registro básico de ventas/producción).
- Login Social (Google, GitHub, Apple, etc.) a menos que se solicite explícitamente como reemplazo del login tradicional.
- Implementación de notificaciones Push (PWA) avanzadas o por correo electrónico transaccionales complejas.

## 4. Gestión de Cambios (Change Management)
Cualquier requerimiento nuevo solicitado por el Stakeholder que no esté explícitamente detallado en la sección 2 ("En Alcance"), será evaluado por el Product Owner (IA). Si el esfuerzo técnico es significativo, se añadirá a la sección "Icebox" o "Próximos Sprints" en el `BACKLOG.md` para no comprometer los tiempos de entrega de la versión actual.
