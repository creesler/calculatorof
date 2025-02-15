import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const certificatesDir = join(process.cwd(), 'certificates');

try {
  // Create certificates directory if it doesn't exist
  mkdirSync(certificatesDir, { recursive: true });

  // Generate private key
  execSync(`openssl genrsa -out ${join(certificatesDir, 'localhost-key.pem')} 2048`);

  // Generate certificate
  execSync(`openssl req -new -x509 -key ${join(certificatesDir, 'localhost-key.pem')} -out ${join(certificatesDir, 'localhost.pem')} -days 365 -subj "/CN=localhost"`);

  console.log('Certificates generated successfully!');
} catch (error) {
  console.error('Error generating certificates:', error);
} 