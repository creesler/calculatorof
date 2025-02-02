const { exec } = require('child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';

const cleanup = () => {
  const command = isWindows
    ? `FOR /F "tokens=5" %P IN ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') DO taskkill /F /PID %P`
    : `lsof -ti :3000 | xargs kill -9`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('No processes found on port 3000');
      return;
    }
    if (stdout) console.log('Cleaned up port 3000');
    if (stderr) console.error('Error:', stderr);
  });
};

cleanup(); 