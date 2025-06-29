'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalculatorAdminForm from '@/components/CalculatorAdminForm';
import type { CalculatorPage } from '@/types/calculator';

export default function AdminPage() {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (data: CalculatorPage) => {
    try {
      setSubmitStatus('loading');
      const response = await fetch('/api/create-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create calculator');
      }

      setSubmitStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setSubmitStatus('error');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calculator Admin</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
        
        <CalculatorAdminForm onSubmit={handleSubmit} />
        
        {submitStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            Calculator created successfully!
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            Error: {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
} 