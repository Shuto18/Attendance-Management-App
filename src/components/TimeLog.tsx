import React from 'react';
import { TimeEntry } from '../types';

interface TimeLogProps {
  logs: TimeEntry[];
}

const TimeLog: React.FC<TimeLogProps> = ({ logs }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">最近の記録</h3>
      <ul className="space-y-2">
        {logs.slice(-5).reverse().map((log) => (
          <li key={log.id} className="flex justify-between items-center">
            <span className={log.type === 'in' ? 'text-green-500' : 'text-red-500'}>
              {log.type === 'in' ? '出勤' : '退勤'}
            </span>
            <span>{log.timestamp.toLocaleString('ja-JP')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLog;