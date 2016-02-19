@echo off

REM Settings ===================================================================

REM ex: FILE=Tap.mp4
set FILE="Foil.mp4"

REM ex: set SCALE -vf scale=360:-1
set SCALE=

REM ex: set RATE=-r 18
set RATE=-r 24

REM set OUTDIR=frames
set OUTDIR=frames

REM ex: set FTIME=-t 10 -ss 00:47:27
set FTIME=

REM set FEXT=jpg
set FEXT=jpg

REM set JPGQUAL=-qscale:v 2
set JPGQUAL=-qscale:v 2

REM ex: set FFM="O:\Program Files\ffmpeg-20121125-git-26c531c-win32-static\bin\ffmpeg.exe"
set FFM="O:\Program Files\ffmpeg-20121125-git-26c531c-win32-static\bin\ffmpeg.exe"

REM End Settings ===============================================================

if not exist %FILE% goto noinput

:doit
if not exist %OUTDIR% mkdir %OUTDIR%
set FCMD=%FFM% -i %FILE% %RATE% %JPGQUAL% %SCALE% %FTIME% %OUTDIR%\frame_%%5d.%FEXT%
echo %FCMD%
%FCMD%
goto bye

:noinput
echo "Input file does not exist - %FILE%"

:bye
pause