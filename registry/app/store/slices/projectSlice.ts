import { StateCreator } from 'zustand';
import { CreditProject, CreditStatus } from '../../types/ledger';

export interface ProjectSlice {
  projects: CreditProject[];
  updateProjectStatus: (id: string, status: CreditStatus) => void;
  updateProjectCredits: (
    id: string,
    available: number,
    retired: number
  ) => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set) => ({
  projects: [],
  
  updateProjectStatus: (id, status) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id
          ? { ...p, status, lastVerified: status === 'verified' ? new Date() : p.lastVerified }
          : p
      ),
    })),
    
  updateProjectCredits: (id, available, retired) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id
          ? { ...p, availableCredits: available, retiredCredits: retired }
          : p
      ),
    })),
});