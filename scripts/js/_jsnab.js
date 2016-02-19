var path = require('path')
	, fs = require('fs')
	, ch = require('child_process');

var ff
	, i
	, len
	, destRel
	, fcmd = ''
	, argz = []
	, startNum = 2
	, main ={
		  'ffmpeg'  : 'ffmpeg'
		, 'infile'  : 'Constantine.mp4'
		, 'scale'   : '' // 650:-1
		, 'rate'    : '24' // 18
		, 'outFile' : '_nab.sh'
	}
	, sets = [
		{
			  'dest'   : 'frames'
			, 'name'   : 'title'
			, 'time'   : '00:02:40'
			, 'length' : '8'
		}
/*
		{
			  'dest'   : 'frames\\twist'
			, 'time'   : '00:26:24'
			, 'length' : '7'
		}
		, {
			  'dest'   : 'frames\\hellhole'
			, 'time'   : '00:21:01'
			, 'length' : '26'
		}
*/
/*
"O:\Program Files\ffmpeg-20121125-git-26c531c-win32-static\bin\ffmpeg.exe" -i Tap.mp4 -r 18 
-t  6 -ss 00:03:36 frames\\viv
-t 15 -ss 00:05:40 frames\\gardening
-t 30 -ss 00:06:00 frames\\vomit
-t 30 -ss 00:07:42 frames\\mime
-t 55 -ss 00:10:25 frames\\bigger
-t  6 -ss 00:11:36 frames\\big_game
-t 12 -ss 00:18:36 frames\\admadillos
-t 26 -ss 00:21:01 frames\\hellhole

%FTIMEG% %OUTDIRG%\frame_%%5d.png

		, {
			  'dest'   : 'frames\\'
			, 'time'   : ''
			, 'length' : ''
		}
*/
	];

// from https://github.com/substack/node-mkdirp/blob/master/index.js
function mkdirP (p, mode, made) {
    if (mode === undefined) {
        mode = 0777 & (~process.umask());
    }
    if (!made) made = null;

    if (typeof mode === 'string') mode = parseInt(mode, 8);
    p = path.resolve(p);

    try {
        fs.mkdirSync(p, mode);
        made = made || p;
    }
    catch (err0) {
        switch (err0.code) {
            case 'ENOENT' :
                made = mkdirP(path.dirname(p), mode, made);
                mkdirP(p, mode, made);
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                var stat;
                try {
                    stat = fs.statSync(p);
                }
                catch (err1) {
                    throw err0;
                }
                if (!stat.isDirectory()) throw err0;
                break;
        }
    }

    return made;
};

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

if (parseInt(main.rate, 10) < 1 ) {
	main.rate = 18;
}

fcmd += '"'+main.ffmpeg+'" -i "'+main.infile+'"';

len = sets.length;
for ( i = 0; i < len; i++ ) {
	if (main.scale) {
		fcmd += ' -vf scale='+main.scale;
	}
	if ( sets[i].time && sets[i].length ) {
		fcmd += ' -t '+sets[i].length+' -ss '+sets[i].time
	}
	destRel = sets[i].dest+'/'+pad( 2, i+startNum )+'_'+sets[i].name
	console.log(destRel, mkdirP( destRel ) );
	fcmd += ' -r '+main.rate+ ' '+destRel+'/'+sets[i].name+'_%5d.png';
}

console.log(fcmd)

fs.writeFile(main.outFile, '#!/bin/bash\n'+fcmd+'\n', function(err) {
	console.log('wrote '+main.outFile);
	console.log('mark exec', fs.chmodSync(main.outFile, '755'));
});

/*
ff = ch.exec( fcmd, function ( error, stdout, stderr ) {
	if (stdout) {
		console.log(stdout);
	}
	if (stderr) {
		console.log('ERROR: ' + stderr);
	}
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});
*/

/*
ff.stdout.on( 'data', function ( data ) {
  console.log( data );
} );

ff.stderr.on( 'data', function ( data ) {
  console.log( 'ERROR: '+data );
} );

ff.on( 'close', function ( code ) {
  console.log( 'child process exited '+code );
});

*/
/*


@echo off

REM Settings ===================================================================

REM ex: FILE=Tap.mp4
set FILE=Tap.mp4

REM ex: set SCALE -vf scale=360:-1
set SCALE=

REM ex: set RATE=-r 18
set RATE=-r 18

REM set OUTDIR=frames
set OUTDIR=frames\viv
set OUTDIRA=frames\gardening
set OUTDIRB=frames\vomit
set OUTDIRC=frames\mime
set OUTDIRD=frames\bigger
set OUTDIRE=frames\big_game
set OUTDIRF=frames\admadillos
set OUTDIRG=frames\hellhole

REM ex: set FTIME=-t 6 -ss 00:03:36
set FTIME=-t 6 -ss 00:03:36
set FTIMEA=-t 15 -ss 00:05:40
set FTIMEB=-t 30 -ss 00:06:00
set FTIMEC=-t 30 -ss 00:07:42
set FTIMED=-t 55 -ss 00:10:25
set FTIMEE=-t 6 -ss 00:11:36
set FTIMEF=-t 12 -ss 00:18:36
set FTIMEG=-t 26 -ss 00:21:01

REM ex: set FFM="O:\Program Files\ffmpeg-20121125-git-26c531c-win32-static\bin\ffmpeg.exe"
set FFM="O:\Program Files\ffmpeg-20121125-git-26c531c-win32-static\bin\ffmpeg.exe"

REM End Settings ===============================================================

if not exist %OUTDIR% mkdir %OUTDIR%
set CMEX=%FTIME% %OUTDIR%\frame_%%5d.png

if not "%FTIME%" == "" (
	echo "Setting time..."
	if not "%OUTDIRA%" == "" (
		if not exist %OUTDIRA% mkdir %OUTDIRA%
		set CMEXA=%FTIMEA% %OUTDIRA%\frame_%%5d.png
		echo "Set time A... %CMEXA%"
	)
	if not "%OUTDIRB%" == "" (
		if not exist %OUTDIRB% mkdir %OUTDIRB%
		set CMEXB=%FTIMEB% %OUTDIRB%\frame_%%5d.png
		echo "Set time B... %CMEXB%"
	)
	if not "%OUTDIRC%" == "" (
		if not exist %OUTDIRC% mkdir %OUTDIRC%
		set CMEXC=%FTIMEC% %OUTDIRC%\frame_%%5d.png
		echo "Set time C... %CMEXC%"
	)
	if not "%OUTDIRD%" == "" (
		if not exist %OUTDIRD% mkdir %OUTDIRD%
		set CMEXD=%FTIMED% %OUTDIRD%\frame_%%5d.png
		echo "Set time D... %CMEXD%"
	)
	if not "%OUTDIRE%" == "" (
		if not exist %OUTDIRE% mkdir %OUTDIRE%
		set CMEXE=%FTIMEE% %OUTDIRE%\frame_%%5d.png
		echo "Set time E... %CMEXE%"
	)
	if not "%OUTDIRF%" == "" (
		if not exist %OUTDIRF% mkdir %OUTDIRF%
		set CMEXF=%FTIMEF% %OUTDIRF%\frame_%%5d.png
		echo "Set time F... %CMEXF%"
	)
	if not "%OUTDIRG%" == "" (
		if not exist %OUTDIRG% mkdir %OUTDIRG%
		set CMEXG=%FTIMEG% %OUTDIRG%\frame_%%5d.png
		echo "Set time G... %CMEXG%"
	)
)

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEX%
echo %FCMD%
%FCMD%

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEXA%
echo %FCMD%
%FCMD%

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEXB%
echo %FCMD%
%FCMD%

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEXC%
echo %FCMD%
%FCMD%

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEXD%
echo %FCMD%
%FCMD%

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEXE%
echo %FCMD%
%FCMD%

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEXF%
echo %FCMD%
%FCMD%

set FCMD=%FFM% -i %FILE% %RATE% %SCALE% %CMEXG%
echo %FCMD%
%FCMD%





*/