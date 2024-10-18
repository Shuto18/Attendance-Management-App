import React, { useState } from 'react';
import { User } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
  onSwitch: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    onRegister(newUser);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">新規登録</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">名前</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          登録
        </button>
      </form>
      <p className="mt-4 text-center">
        すでにアカウントをお持ちの方は
        <button onClick={onSwitch} className="text-blue-500 underline">
          こちら
        </button>
      </p>
    </div>
  );
};

export default Register;