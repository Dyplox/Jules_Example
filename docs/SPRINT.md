# Sprint Activo: Consolidación de Autenticación, Onboarding y Arquitectura Base

**Objetivo:** Estabilizar el flujo de autenticación y onboarding, establecer la base técnica (Capacitor, Biometría, Offline-first) y desarrollar el flujo de Onboarding de 3 pasos para **GanadePro**, asegurando la estructura jerárquica de `Admin -> Fincas -> Lotes`.

- **Estado:** Activo 🟢
- **Alcance:** `src/pages/auth/`, `src/pages/onboarding/`, `src/store/authStore.ts`, `supabase/migrations/`

---

## 📋 Épica 1: Autenticación Base (Login / Registro)
- [ ] **Tarea 1.1:** Auditar el código de `src/pages/auth/Login.tsx`. Verificar que el manejo de errores de Supabase Auth sea claro y se refleje en la UI usando `TacticalInput` y el sistema de diseño táctico.
- [ ] **Tarea 1.2:** Validar la seguridad de los inputs de contraseña y correo, asegurando que prevengan auto-envíos o comportamientos inesperados en React 19.
- [ ] **Tarea 1.3:** Revisar `src/store/authStore.ts` para confirmar que las funciones de `login`, `register` y `setError` actúan como única fuente de verdad.

## 📋 Épica 2: Flujo de Onboarding
- [ ] **Tarea 2.1:** Diseñar y aplicar migraciones SQL para las tablas `profiles`, `farms`, `farm_lots` y `farm_members`.
- [ ] **Tarea 2.2:** Asegurar que la transición desde el *Registro Exitoso* al *Onboarding* (Step1 -> Step2 -> Step3) esté enrutada correctamente en `App.tsx`.
- [ ] **Tarea 2.3:** Verificar que los datos recogidos durante el Onboarding se envían y guardan correctamente en Supabase.

## 📋 Épica 3: Arquitectura Base
- [ ] **TODO (Arquitectura):** Inicializar e integrar **Capacitor** en el proyecto React/Vite para build móvil.
- [ ] **TODO (Arquitectura):** Configurar y agregar soporte de **Biometría/PIN** usando los plugins de Capacitor.
- [ ] **TODO (Arquitectura):** Configurar el manejo de estado **Offline-first** (Zustand/RxDB) para la persistencia inicial y preparar sincronización.

## 🏗️ En Progreso (In Progress)
*(Vacío al inicio del Sprint)*

## ✅ Hecho (Done)
- [x] **TODO (PO/PM):** Actualizar y estructurar la documentación ágil (`SCOPE.md`, `BACKLOG.md`, `PROJECT_PLAN.md`, `SPRINT.md`).
- [x] **TODO (Infra):** Migrar de npm a pnpm y resolver conflictos de merge entre ramas.

---

## Notas del Equipo de Desarrollo (IA)
- Al empaquetar con Capacitor, los flujos de "Social Login" requerirán configuración específica nativa. Se implementará la base en Supabase primero.
- La tabla `farm_members` gestionará el control de acceso, vinculando a los empleados a los lotes específicos de la finca del administrador, manejado por Supabase RLS.
- Si la red se recupera, `networkStore.ts` puede disparar una sincronización automática con el hook `triggerSync()` (pendiente de implementar).

## Ejecución del Sprint
*Yo, como Equipo de Desarrollo, iré ejecutando estas tareas secuencialmente y actualizando este documento marcándolas como completadas `[x]`. Reportaré los hallazgos y correcciones al Stakeholder (Tú) al final del ciclo de ejecución.*
