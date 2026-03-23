import { describe, it, expect, beforeEach } from 'vitest';
import { useSettingsStore } from '../store/settingsStore';

describe('Settings Store QA', () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useSettingsStore.setState({
      hasSeenOnboarding: false,
      useBiometrics: false,
      pinSet: false,
    });
  });

  it('debería inicializar con los valores por defecto', () => {
    const state = useSettingsStore.getState();
    expect(state.hasSeenOnboarding).toBe(false);
    expect(state.useBiometrics).toBe(false);
    expect(state.pinSet).toBe(false);
  });

  it('debería actualizar el estado de onboarding', () => {
    useSettingsStore.getState().setHasSeenOnboarding(true);
    expect(useSettingsStore.getState().hasSeenOnboarding).toBe(true);
  });

  it('debería actualizar la configuración de biometría y PIN', () => {
    useSettingsStore.getState().setUseBiometrics(true);
    useSettingsStore.getState().setPinSet(true);
    expect(useSettingsStore.getState().useBiometrics).toBe(true);
    expect(useSettingsStore.getState().pinSet).toBe(true);
  });
});
