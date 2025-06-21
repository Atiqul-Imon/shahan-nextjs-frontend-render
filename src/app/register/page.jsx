"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { name, email, password });
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error', error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-700 text-white">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-gray-400">Name</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-md bg-gray-800" />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-400">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-md bg-gray-800" />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-400">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-md bg-gray-800" />
          </div>
          <button type="submit" className="block w-full p-3 text-center rounded-sm text-white bg-blue-600">Register</button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="focus:underline hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 