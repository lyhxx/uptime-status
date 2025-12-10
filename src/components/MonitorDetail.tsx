import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { ProcessedMonitor } from '../types';
import { formatDate, formatDuration, formatRelativeTime, formatResponseTime } from '../utils/format';

interface MonitorDetailProps {
  monitor: ProcessedMonitor;
}

export function MonitorDetail({ monitor }: MonitorDetailProps) {
  // 可用率趋势数据
  const uptimeData = [...monitor.daily].reverse().map((d) => ({
    date: d.date.format('MM-DD'),
    uptime: d.uptime,
  }));

  // 响应时间数据
  const responseData = monitor.responseTimes?.map((rt) => ({
    time: new Date(rt.datetime * 1000).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    value: rt.value,
  })) || [];

  // 故障日志
  const downLogs = monitor.logs.filter((log) => log.type === 1);

  return (
    <div className="px-4 pb-4 space-y-4 bg-slate-50 dark:bg-slate-800/30">
      {/* 图表区域 */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 可用率趋势 */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            可用率趋势
          </h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }} 
                  stroke="#94a3b8"
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[95, 100]} 
                  tick={{ fontSize: 10 }} 
                  stroke="#94a3b8"
                  width={35}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}%`, '可用率']}
                />
                <Line 
                  type="monotone" 
                  dataKey="uptime" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 响应时间 */}
        {responseData.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              响应时间 {monitor.avgResponseTime && (
                <span className="text-slate-500 font-normal">
                  (平均 {formatResponseTime(monitor.avgResponseTime)})
                </span>
              )}
            </h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseData}>
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 10 }} 
                    stroke="#94a3b8"
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }} 
                    stroke="#94a3b8"
                    width={45}
                    tickFormatter={(v) => `${v}ms`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`${value}ms`, '响应时间']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* 故障历史 */}
      {downLogs.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            故障历史 ({downLogs.length} 次)
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {downLogs.slice(0, 10).map((log, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-red-500">●</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {formatDate(log.datetime)}
                  </span>
                  <span className="text-slate-400 text-xs">
                    ({formatRelativeTime(log.datetime)})
                  </span>
                </div>
                <span className="text-slate-500 dark:text-slate-400">
                  持续 {formatDuration(log.duration)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
