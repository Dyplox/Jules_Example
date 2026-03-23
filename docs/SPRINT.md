# Sprint Activo: Onboarding, Biometría, Roles y Arquitectura Base

**Objetivo:** Establecer la base técnica (Capacitor, Biometría, Offline-first) y desarrollar el flujo de Onboarding de 3 pasos para **GanadePro**, asegurando la estructura jerárquica de `Admin -> Fincas -> Lotes` y el rol de Empleados en Supabase.

---

## 📋 Tareas por Hacer (To-Do)
- [ ] **TODO (Supabase):** Diseñar y aplicar migraciones SQL para las tablas `profiles`, `farms`, `farm_lots` y `farm_members`.
- [ ] **TODO (Arquitectura):** Inicializar e integrar **Capacitor** en el proyecto React/Vite para build móvil.
- [ ] **TODO (Arquitectura):** Configurar y agregar soporte de **Biometría/PIN** usando los plugins de Capacitor.
- [ ] **TODO (Arquitectura):** Configurar el manejo de estado **Offline-first** (Zustand/RxDB) para la persistencia inicial y preparar sincronización.
- [ ] **TODO (UI/UX):** Desarrollar la pantalla de "Slider Informativo" que se muestra solo la primera vez.
- [ ] **TODO (UI/UX):** Implementar **Paso 1 del Onboarding:** Registro (Correo, Teléfono, Google, Apple) y Legales.
- [ ] **TODO (UI/UX):** Implementar **Paso 2 del Onboarding:** Configurar Perfil (Nombre, Edad, Creación de PIN/Biometría).
- [ ] **TODO (UI/UX):** Implementar **Paso 3 del Onboarding (Dueños):** Crear Finca (Nombre, país, ganado) y definir Lotes.
- [ ] **TODO (UI/UX):** Implementar **Paso 3 del Onboarding (Empleados):** Ingresar código de invitación o asociarse a finca existente.

## 🏗️ En Progreso (In Progress)
*(Vacío al inicio del Sprint)*

## ✅ Hecho (Done)
- [x] **TODO (PO/PM):** Actualizar y estructurar la documentación ágil (`SCOPE.md`, `BACKLOG.md`, `PROJECT_PLAN.md`, `SPRINT.md`) reflejando los requerimientos de GanadePro.

---

## Notas del Equipo de Desarrollo (IA)
- Al empaquetar con Capacitor, los flujos de "Social Login" requerirán una configuración específica nativa (Google Sign-In plugin de Capacitor o redirección web). Se implementará la base en Supabase primero.
- La tabla `farm_members` gestionará el control de acceso, vinculando a los empleados (con un PIN/Biometría de acceso a la app) a los lotes específicos de la finca del administrador, manejado por Supabase RLS.
