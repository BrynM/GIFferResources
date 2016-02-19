#/bin/sh
#Make a Gif from 3 frames from a movie
#Usage gifmaker.sh /path/to/movie.bla n  n /outputfile.bla
#ARGS $1=INPUT FILENAME $2=NUM FRAMES $3=START POS $4=OUTPUT FILENAME
 
#extract 3 .PNG files from source video
#ffmpeg -i $1 -r 25 -vframes $2 -ss $3 $1-%03d.png
 
#
# convert .PNGs into single .GIFs
#

FN="youth_gang_competition"
SRC="./b/3/export_frames"
DEST="./b/3/export_frames/gif_frames"
FRAMECOUNT=202

# ex: RESIZE="-resize 346x250"
RESIZE="--resize 450x241"

# ex: DITHER="--dither=floyd-steinberg"
# ex: DITHER="--dither=ro64"
# ex: DITHER="--dither=o3"
# ex: DITHER="--dither=o4"
# ex: DITHER="--dither=o8"
# ex: DITHER="--dither=ordered"
DITHER="--dither=floyd-steinberg"

# ex: DELAY="--delay 7"
#  FPS     DELAY
#  24      7
#  18-20   5
DELAY="--delay 5"

# ex: CARE="--careful"
#CARE="--careful"

function gifdir {
	if [ ! -d "${DEST}" ]; then
		mkdir -pv "${DEST}"
	fi
}

function giframe {
	for FRAME in $(seq -f %05g ${FRAMECOUNT})
	do
		INFRAME=${SRC}/${FN}$FRAME.png
		OUTFRAME=${DEST}/${FN}-$FRAME.gif
		echo "${INFRAME} -> ${OUTFRAME}"
		convert ${INFRAME} ${OUTFRAME}
#		convert ${RESIZE} ${INFRAME} ${OUTFRAME}
	done
}

function gifize {
	#
	# combine in gifsicle
	# http://www.lcdf.org/gifsicle/man.html
	#
	FWD=$(ls ${DEST}/${FN}-*.gif | sort)
	gifsicle ${RESIZE} ${CARE} ${DELAY} --loopcount=0 ${DITHER} --colors 256 $FWD > ./${FN}.gif
}

gifdir

if [ "$1" == "-f" ]; then
	giframe
fi

gifize


