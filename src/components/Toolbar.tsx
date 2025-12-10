import { useAppStore } from '../store';
import { requestNotificationPermission } from '../hooks/useNotification';
import { Select } from './Select';

interface ToolbarProps {
  onRefresh: () => void;
}

const daysOptions = [
  { value: 30, label: '30 天' },
  { value: 60, label: '60 天' },
  { value: 90, label: '90 天' },
];

const statusOptions = [
  { value: 'all', label: '全部状态' },
  { value: 'ok', label: '✓ 正常' },
  { value: 'down', label: '✗ 故障' },
];

const sortOptions = [
  { value: 'name', label: '按名称' },
  { value: 'status', label: '按状态' },
  { value: 'uptime', label: '按可用率' },
];

export function Toolbar({ onRefresh }: ToolbarProps) {
  const countDays = useAppStore((s) => s.countDays);
  const setCountDays = useAppStore((s) => s.setCountDays);
  const statusFilter = useAppStore((s) => s.statusFilter);
  const setStatusFilter = useAppStore((s) => s.setStatusFilter);
  const sortBy = useAppStore((s) => s.sortBy);
  const setSortBy = useAppStore((s) => s.setSortBy);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);

  return (
    <div className="card p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {/* 搜索 */}
        <div className="flex-1 min-w-[200px] relative">
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索服务..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg 
                       border border-slate-200 dark:border-slate-700 
                       bg-white dark:bg-slate-800 
                       text-slate-900 dark:text-white text-sm
                       placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500
                       transition-colors"
          />
        </div>

        {/* 时间范围 */}
        <Select
          value={countDays}
          options={daysOptions}
          onChange={(v) => setCountDays(v as number)}
        />

        {/* 状态筛选 */}
        <Select
          value={statusFilter}
          options={statusOptions}
          onChange={(v) => setStatusFilter(v as 'all' | 'ok' | 'down')}
        />

        {/* 排序 */}
        <Select
          value={sortBy}
          options={sortOptions}
          onChange={(v) => setSortBy(v as 'name' | 'status' | 'uptime')}
        />

        {/* 通知权限 */}
        <button
          onClick={requestNotificationPermission}
          className="p-2 rounded-lg 
                     hover:bg-slate-100 dark:hover:bg-slate-700 
                     text-slate-500 hover:text-slate-700 dark:hover:text-slate-300
                     transition-colors"
          title="开启通知"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* 刷新 */}
        <button
          onClick={onRefresh}
          className="p-2 rounded-lg 
                     hover:bg-slate-100 dark:hover:bg-slate-700 
                     text-slate-500 hover:text-slate-700 dark:hover:text-slate-300
                     transition-colors"
          title="刷新数据"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
