import { create } from 'zustand';

interface ImportState {
  processed: number;
  successful: number;
  failed: number;
  total: number;
  isComplete: boolean;
  errors: string[];
  setProgress: (progress: Partial<ImportState>) => void;
  reset: () => void;
}

export const useDataImportStore = create<ImportState>((set) => ({
  processed: 0,
  successful: 0,
  failed: 0,
  total: 0,
  isComplete: false,
  errors: [],
  setProgress: (progress) => set((state) => ({ ...state, ...progress })),
  reset: () => set({
    processed: 0,
    successful: 0,
    failed: 0,
    total: 0,
    isComplete: false,
    errors: []
  })
}));