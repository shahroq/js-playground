import { create } from "zustand";

// shape of the store
interface Store {
  count: number;
  dec?: () => void;
  inc?: () => void;
  reset?: () => void;
}

const INITIAL_DATA = 0;

export const useCounterStore = create<Store>((set) => ({
  count: INITIAL_DATA,
  dec: () => set((state) => ({ count: state.count - 1 })),
  inc: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: INITIAL_DATA }),
}));
