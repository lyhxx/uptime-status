import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getConfig } from '../config';

interface AppState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  countDays: number;
  setCountDays: (days: number) => void;

  statusFilter: 'all' | 'ok' | 'down';
  setStatusFilter: (filter: 'all' | 'ok' | 'down') => void;

  sortBy: 'name' | 'status' | 'uptime';
  setSortBy: (sort: 'name' | 'status' | 'uptime') => void;

  expandedMonitors: Set<number>;
  toggleExpanded: (id: number) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  embedMode: boolean;
  setEmbedMode: (mode: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      const config = getConfig();
      return {
        theme: config.defaultTheme,
        setTheme: (theme) => set({ theme }),

        countDays: config.countDays,
        setCountDays: (countDays) => set({ countDays }),

        statusFilter: config.defaultFilter,
        setStatusFilter: (statusFilter) => set({ statusFilter }),

        sortBy: config.defaultSort,
        setSortBy: (sortBy) => set({ sortBy }),

        expandedMonitors: new Set(),
        toggleExpanded: (id) => {
          const expanded = new Set(get().expandedMonitors);
          if (expanded.has(id)) {
            expanded.delete(id);
          } else {
            expanded.add(id);
          }
          set({ expandedMonitors: expanded });
        },

        searchQuery: '',
        setSearchQuery: (searchQuery) => set({ searchQuery }),

        embedMode: false,
        setEmbedMode: (embedMode) => set({ embedMode }),
      };
    },
    {
      name: 'uptime-status-storage',
      partialize: (state) => ({
        theme: state.theme,
        // countDays 不持久化，每次使用配置文件的值
      }),
    }
  )
);
