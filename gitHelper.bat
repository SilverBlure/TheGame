@echo off
REM Git Pull ausführen
echo Pulling latest changes...
git pull

REM Änderungen hinzufügen
echo Adding changes...
git add -A

REM Commit-Message abfragen
IF "%1"=="" (
    echo Bitte geben Sie eine Commit-Nachricht an.
    exit /b 1
)
SET COMMIT_MESSAGE=%1

REM Commit ausführen
echo Committing changes...
git commit -m "%COMMIT_MESSAGE%"

REM Push ausführen
echo Pushing changes...
git push

echo Fertig!
