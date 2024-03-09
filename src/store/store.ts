import { create } from 'zustand'

type State = {
    dateRange: Date;
}

type Action = {
    updateDateRange: (newDateRange: Date) => void
}

// Create your store, which includes both state and (optionally) actions
export const useDateStore = create<State & Action>((set) => ({
    dateRange: new Date(2022, 11),
    updateDateRange: (newDateRange) => set(() => ({ dateRange: newDateRange })),
}))
