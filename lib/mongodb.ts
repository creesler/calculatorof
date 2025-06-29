import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please add your MongoDB Database name to .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return {
      client: cachedClient,
      db: cachedClient.db(dbName)
    };
  }

  try {
    const client = await MongoClient.connect(uri, {
      // Force TLS 1.2
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    });

    cachedClient = client;

    return {
      client: cachedClient,
      db: cachedClient.db(dbName)
    };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
} 