'use client';

import { useState } from 'react';
import CalculatorAdminForm from '@/components/CalculatorAdminForm';
import type { CalculatorPage } from '@/types/calculator';

export default function AdminPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Calculator Admin</h1>
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