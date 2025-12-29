@echo off
echo 🧪 Test automatique de la configuration CMS CMA Education
echo.

echo 📋 Vérification des fichiers de configuration...

REM Vérifier la présence des fichiers essentiels
if exist "cms-cma\package.json" (
    echo ✅ package.json trouvé
) else (
    echo ❌ package.json manquant
    goto :error
)

if exist "cms-cma\.env" (
    echo ✅ .env trouvé
) else (
    echo ❌ .env manquant
    goto :error
)

if exist "cms-cma\config\database.js" (
    echo ✅ database.js trouvé
) else (
    echo ❌ database.js manquant
    goto :error
)

echo.
echo 📦 Vérification des Content Types...

if exist "cms-cma\src\api\testimonial\content-types\testimonial\schema.json" (
    echo ✅ Testimonial Content Type créé
) else (
    echo ❌ Testimonial Content Type manquant
)

if exist "cms-cma\src\api\partner\content-types\partner\schema.json" (
    echo ✅ Partner Content Type créé
) else (
    echo ❌ Partner Content Type manquant
)

if exist "cms-cma\src\api\menu-item\content-types\menu-item\schema.json" (
    echo ✅ Menu Item Content Type créé
) else (
    echo ❌ Menu Item Content Type manquant
)

echo.
echo 🧩 Vérification des composants...

if exist "cms-cma\src\components\sections\gallery-section.json" (
    echo ✅ Gallery Section créé
) else (
    echo ❌ Gallery Section manquant
)

if exist "cms-cma\src\components\sections\stats-section.json" (
    echo ✅ Stats Section créé
) else (
    echo ❌ Stats Section manquant
)

if exist "cms-cma\src\components\ui\stat-item.json" (
    echo ✅ Stat Item créé
) else (
    echo ❌ Stat Item manquant
)

echo.
echo 🔧 Test de build...
cd cms-cma
call npm run build > nul 2>&1

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build réussi
) else (
    echo ❌ Erreur de build
    goto :error
)

echo.
echo 🎉 Configuration validée avec succès !
echo.
echo 📋 Prochaines étapes :
echo 1. Démarrer le CMS : cd cms-cma ^&^& npm run develop
echo 2. Ouvrir http://localhost:1337/admin
echo 3. Créer votre compte administrateur
echo 4. Tester la création de contenu
echo.
echo 📖 Guide complet : TEST_CONFIGURATION_CMS.md
goto :end

:error
echo.
echo ❌ Erreur détectée dans la configuration
echo 📖 Consultez TEST_CONFIGURATION_CMS.md pour le dépannage
exit /b 1

:end
cd ..
pause