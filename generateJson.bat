@echo off
setlocal enabledelayedexpansion

set "input=_redirects"
set "output=links.json"

REM Store non-empty lines in a temporary array
set i=0
for /f "usebackq tokens=1,2*" %%a in ("%input%") do (
    if not "%%a"=="" (
        set /a i+=1
        set "name[!i!]=%%a"
        set "link[!i!]=%%b"
    )
)

echo [> "%output%"

REM Output JSON
for /l %%j in (1,1,!i!) do (
    if %%j EQU !i! (
        echo   {"name": "!name[%%j]:~1!", "link": "!link[%%j]!"}>> "%output%"
    ) else (
        echo   {"name": "!name[%%j]:~1!", "link": "!link[%%j]!"},>> "%output%"
    )
)

echo ]>> "%output%"
echo JSON file created: %output%
pause
