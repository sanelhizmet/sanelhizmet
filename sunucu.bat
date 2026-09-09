@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
title Sanel Hizmet - Sunucu
cd /d "%~dp0"

:: Port 3000 zaten aciksa tekrar baslatma
powershell -NoProfile -Command "if ((Test-NetConnection -ComputerName 127.0.0.1 -Port 3000 -WarningAction SilentlyContinue).TcpTestSucceeded) { exit 0 } else { exit 1 }" >nul 2>&1
if %errorlevel%==0 (
    echo.
    echo  Sunucu zaten calisiyor: http://localhost:3000
    echo.
    pause
    exit /b 0
)

:: Eski kilit dosyasini temizle
if exist ".next\dev\lock" (
    for /f %%p in (.next\dev\lock) do (
        tasklist /FI "PID eq %%p" 2>nul | find /i "node.exe" >nul
        if errorlevel 1 del /f ".next\dev\lock" 2>nul
    )
)

if not exist "node_modules\" (
    echo Paketler yukleniyor...
    call npm.cmd install
    if errorlevel 1 (
        echo HATA: npm install basarisiz.
        pause
        exit /b 1
    )
)

echo.
echo  Sunucu calisiyor: http://localhost:3000
echo  Kapatmak icin bu pencereyi kapatin veya Ctrl+C basin.
echo.

call npm.cmd run dev

echo.
echo  Sunucu durdu.
pause
