@echo off
title MOVEIT - Smart Bus Transport System
color 0B

echo =====================================================================
echo    MOVEIT - Smart Bus Transport Coordination & Capacity Management
echo                     Public Transit Platform
echo =====================================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    if exist "%LOCALAPPDATA%\Programs\node\node-v20.18.0-win-x64\node.exe" (
        set "PATH=%LOCALAPPDATA%\Programs\node\node-v20.18.0-win-x64;%PATH%"
    ) else if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=C:\Program Files\nodejs;%PATH%"
    ) else (
        echo [ERROR] Node.js was not detected in PATH.
        echo Please ensure Node.js is installed or run with local node directory.
        pause
        exit /b 1
    )
)

echo [1/2] Checking dependencies...
if not exist "node_modules\" (
    echo Installing required packages (react, vite, lucide-react, react-router-dom)...
    call npm install
) else (
    echo Dependencies are already installed!
)

echo.
echo [2/2] Launching MOVEIT Prototype on http://localhost:5173...
echo Press Ctrl+C in this terminal window to stop the server when done.
echo.
call npm run dev
pause
