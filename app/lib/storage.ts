import { Mutate, StoreApi, create } from "zustand";
import { persist } from "zustand/middleware";

type StoreWithPersist<State = any> = Mutate<
  StoreApi<State>,
  [["zustand/persist", State]]
>;

export const withStorageDOMEvents = (store: StoreWithPersist) => {
  if (typeof window === "undefined") {
    return;
  }
  const storageEventCallback = (e: StorageEvent) => {
    try {
      if (e.key && e.key === store.persist.getOptions().name && e.newValue) {
        store.persist.rehydrate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  window.addEventListener("storage", storageEventCallback);

  return () => {
    window.removeEventListener("storage", storageEventCallback);
  };
};

export const useDiscoveredNodesStore = create(
  persist<{
    discoveredNodes: string[];
    markDiscoveredNode: (node: string) => void;
    unmarkDiscoveredNode: (node: string) => void;
  }>(
    (set, get) => ({
      discoveredNodes: [],
      markDiscoveredNode: (node) =>
        set({ discoveredNodes: [...get().discoveredNodes, node] }),
      unmarkDiscoveredNode: (node) =>
        set({
          discoveredNodes: get().discoveredNodes.filter(
            (discoveredNode) => discoveredNode !== node
          ),
        }),
    }),
    {
      name: "discovered-nodes-storage",
    }
  )
);

withStorageDOMEvents(useDiscoveredNodesStore);

export const useSettingsStore = create(
  persist<{
    // App and Website
    showTerritoryNames: boolean;
    toggleShowTerritoryNames: () => void;
    iconSize: number;
    setIconSize: (iconSize: number) => void;
    // App only
    showSidebar: boolean;
    toggleShowSidebar: () => void;
    overlayMode: boolean | null;
    setOverlayMode: (overlayMode: boolean) => void;
    windowOpacity: number;
    setWindowOpacity: (windowOpacity: number) => void;
    lockedWindow: boolean;
    setLockedWindow: (lockedWindow: boolean) => void;
  }>(
    (set) => ({
      showTerritoryNames: true,
      iconSize: 1,
      setIconSize: (iconSize) => set({ iconSize }),
      toggleShowTerritoryNames: () =>
        set((state) => ({
          showTerritoryNames: !state.showTerritoryNames,
        })),
      showSidebar: true,
      toggleShowSidebar: () =>
        set((state) => ({
          showSidebar: !state.showSidebar,
        })),
      overlayMode: null,
      setOverlayMode: (overlayMode) =>
        set({
          overlayMode,
        }),
      windowOpacity: 1,
      setWindowOpacity: (windowOpacity) => set({ windowOpacity }),
      lockedWindow: false,
      setLockedWindow: (lockedWindow) => set({ lockedWindow }),
    }),
    {
      name: "settings-storage",
    }
  )
);

withStorageDOMEvents(useSettingsStore);
