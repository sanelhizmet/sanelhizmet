@echo off
chcp 65001 >nul
title Sanel Hizmet - Site Baslatici

cd /d "%~dp0tuncay-website"
if errorlevel 1 (
    echo Hata: tuncay-website klasoru bulunamadi.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Ilk kurulum: paketler yukleniyor...
    call npm.cmd install
    if errorlevel 1 (
        echo Hata: Paket kurulumu basarisiz.
        pause
        exit /b 1
    )
)

echo.
echo  ==========================================
echo    Sanel Hizmet sitesi baslatiliyor...
echo    Adres: http://localhost:3000
echo  ==========================================
echo.
echo  Sunucu ayri pencerede acilacak.
echo  Kapatmak icin o pencereyi kapatin.
echo.

start "Sanel Hizmet - Sunucu" cmd /k "cd /d "%~dp0tuncay-website" && npm.cmd run dev"

echo  Sunucu basliyor, tarayici aciliyor...
timeout /t 5 /nobreak >nul
start "" http://localhost:3000

echo.
echo  Site acildi. Bu pencereyi kapatabilirsiniz.
timeout /t 3 /nobreak >nul
