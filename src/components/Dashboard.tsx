import React from 'react';
import { List } from 'lucide-react';
import { TimeEntry } from '../types';

interface DashboardProps {
  timeLogs: TimeEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ timeLogs }) => {
  const calculateTotalHours = () => {
    let totalMilliseconds = 0;
    for (let i = 0; i < timeLogs.length; i += 2) {
      if (timeLogs[i + 1]) {
        totalMilliseconds += timeLogs[i + 1].timestamp.getTime() - timeLogs[i].timestamp.getTime();
      }
    }
    return (totalMilliseconds / (1000 * 60 * 60)).toFixed(2);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <List className="mr-2" /> ダッシュボード
      </h2>
      <p>総勤務時間: {calculateTotalHours()} 時間</p>
      <p>記録数: {timeLogs.length}</p>
    </div>
  );
};

export default Dashboard;