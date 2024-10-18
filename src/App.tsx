import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TimeLog from './components/TimeLog';
import Login from './components/Login';
import Register from './components/Register';
import { User, TimeEntry } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [timeLogs, setTimeLogs] = useState<TimeEntry[]>([]);
  const [currentStatus, setCurrentStatus] = useState<'in' | 'out' | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const storedLogs = localStorage.getItem(`timeLogs_${user.id}`);
      if (storedLogs) {
        setTimeLogs(JSON.parse(storedLogs).map((log: TimeEntry) => ({
          ...log,
          timestamp: new Date(log.timestamp)
        })));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`timeLogs_${user.id}`, JSON.stringify(timeLogs));
      setCurrentStatus(timeLogs.length > 0 && timeLogs[timeLogs.length - 1].type === 'in' ? 'in' : 'out');
    }
  }, [timeLogs, user]);

  const handleTimeLog = (type: 'in' | 'out') => {
    if (user) {
      const newLog: TimeEntry = {
        id: Date.now(),
        userId: user.id,
        type,
        timestamp: new Date()
      };
      setTimeLogs([...timeLogs, newLog]);
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    setTimeLogs([]);
    localStorage.removeItem('currentUser');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8">勤怠管理アプリ</h1>
        {showRegister ? (
          <Register onRegister={handleLogin} onSwitch={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={handleLogin} onSwitch={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">勤怠管理アプリ</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold">ようこそ、{user.name}さん</span>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            ログアウト
          </button>
        </div>
        <div className="flex justify-center items-center mb-6">
          <Clock className="w-12 h-12 text-blue-500 mr-2" />
          <span className="text-2xl font-semibold">
            {new Date().toLocaleTimeString('ja-JP')}
          </span>
        </div>
        <div className="flex justify-between mb-6">
          <button
            onClick={() => handleTimeLog('in')}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            disabled={currentStatus === 'in'}
          >
            出勤
          </button>
          <button
            onClick={() => handleTimeLog('out')}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            disabled={currentStatus === 'out'}
          >
            退勤
          </button>
        </div>
        <TimeLog logs={timeLogs} />
      </div>
      <Dashboard timeLogs={timeLogs} />
    </div>
  );
}

export default App;