import { create } from 'zustand';
import { Network, ConnectionStatus } from '@capacitor/network';

interface NetworkState {
  isOnline: boolean;
  connectionType: string;
  initNetworkListener: () => Promise<void>;
  checkStatus: () => Promise<void>;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isOnline: true,
  connectionType: 'unknown',

  initNetworkListener: async () => {
    // Initial status check
    const status = await Network.getStatus();
    set({ isOnline: status.connected, connectionType: status.connectionType });

    // Listen for changes
    Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      set({ isOnline: status.connected, connectionType: status.connectionType });
      console.log('Network status changed', status);

      // If we just came online, we could trigger a sync here
      if (status.connected) {
        // TODO: triggerSync();
      }
    });
  },

  checkStatus: async () => {
    const status = await Network.getStatus();
    set({ isOnline: status.connected, connectionType: status.connectionType });
  }
}));
