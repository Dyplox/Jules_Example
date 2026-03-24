import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Note: For sensitive data like PIN hashes, we should use Secure Storage plugin later.
// For MVP, we will store preferences here.

interface SettingsState {
  hasSeenOnboarding: boolean;
  useBiometrics: boolean;
  pinSet: boolean;
  setHasSeenOnboarding: (val: boolean) => void;
  setUseBiometrics: (val: boolean) => void;
  setPinSet: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      useBiometrics: false,
      pinSet: false,
      setHasSeenOnboarding: (val) => set({ hasSeenOnboarding: val }),
      setUseBiometrics: (val) => set({ useBiometrics: val }),
      setPinSet: (val) => set({ pinSet: val }),
    }),
    {
      name: 'ganadepro-settings',
    }
  )
);
