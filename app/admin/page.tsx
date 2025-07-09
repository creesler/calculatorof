import { connectToDatabase } from '@/lib/mongodb';
import CalculatorAdminForm from '@/components/CalculatorAdminForm';
import type { CalculatorPage } from '@/types/calculator';

async function getCategories() {
  const { db } = await connectToDatabase();
  const calculators = await db.collection('calculators').find({}).toArray();

  // Extract and flatten all categories
  const allCategories = calculators.reduce((acc: string[], calculator: any) => {
    if (Array.isArray(calculator.category)) {
      calculator.category.forEach((cat: string) => {
        const processedCat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
        if (!acc.some(existing => existing.toLowerCase() === processedCat.toLowerCase())) {
          acc.push(processedCat);
      }
      });
    }
    return acc;
  }, []);

  // Sort categories alphabetically
  return allCategories.sort();
}

export default async function AdminPage() {
  const categories = await getCategories();

  const handleSubmit = async (data: CalculatorPage) => {
    'use server';
    try {
      const { db } = await connectToDatabase();
      await db.collection('calculators').insertOne(data);
    } catch (error) {
      console.error('Error creating calculator:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Calculator Admin</h1>
      <CalculatorAdminForm categories={categories} onSubmit={handleSubmit} />
    </div>
  );
} 