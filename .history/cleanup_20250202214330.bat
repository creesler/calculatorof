@echo off
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') DO (
    echo Killing process %%P
    taskkill /F /PID %%P
)
echo All Next.js servers on port 3000 have been terminated. 