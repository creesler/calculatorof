import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
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
    allCategories.sort();

    return NextResponse.json(allCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
} 