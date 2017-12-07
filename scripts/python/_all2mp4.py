import os
import re
import sys
import traceback
import argparse
from subprocess import call, Popen, PIPE, STDOUT

srcDir = os.path.dirname(os.path.realpath(__file__))
destDir = os.path.join(srcDir, 'mp4')
mkvRecipe = '-c:a libmp3lame -q:a 2'

rgxExtNonMp4Video = re.compile("\.(mkv|webm|avi|mov)$", re.I | re.M)
rgxCtrLf = re.compile("", re.I)

argParser = argparse.ArgumentParser()
argParser.add_argument('-v', '--verbose', help='debug/verbose ffmpeg', action='store_true')
argParser.add_argument('-k', '--mkv', help='use mkv ffmpeg recipe', action='store_true')
argParser.add_argument('-f', '--force', help='overwrite existing mp4 files found', action='store_true')
args = argParser.parse_args()

ffmpegTemplate='ffmpeg -i "{inPath}" '

# Sample command:
#    ffmpegTemplate='ffmpeg -i "{inPath}" -loglevel debug -c:a libmp3lame -q:a 2 "{outPath}"'

# Parse arguments for ffmpeg bits...
if args.verbose:
	ffmpegTemplate += '-loglevel debug '
if args.mkv:
	ffmpegTemplate += mkvRecipe+' '
# Append the output file to the final ffmpeg command
ffmpegTemplate += '"{outPath}"'

def makeOutputDir(dirToMake):
	if not os.path.isdir(dirToMake):
		print('Creating output folder "{outDir}"'.format(outDir=dirToMake))
		os.makedirs(dirToMake)

def findMkvs():
	return os.listdir(srcDir)

def processFolder():
	print('Searching "{folder}".'.format(folder=srcDir))
	mkvsFound = findMkvs()
	print('Found {n} files.'.format(n=len(mkvsFound)))

	makeOutputDir(destDir)
	for i, name in enumerate(mkvsFound):
		if rgxExtNonMp4Video.search(name):
			print('\n#\n# File #{iteration} is non-pm4 video:\n#    "{name}"\n#'.format(iteration=i, name=name))
			destFqp = getDestFqp(name)
			weAreGo = True
			if os.path.exists(destFqp):
				if args.force:
					print('# WARN Removing existing MP4:\n#    {destFqp}\n#'.format(destFqp=destFqp))
					os.remove(destFqp)
				else:
					weAreGo = False
					print('# Destination file already exists:\n#    {destFqp}\n#'.format(destFqp=destFqp))

			if weAreGo:
				inFqp = os.path.join(srcDir, name)
				ffmpegCommand = composeMkvToMp4Command(inFqp, destFqp)
				print('# Running command:\n#    {command}\n#'.format(command=ffmpegCommand))
				if not runCommand(ffmpegCommand):
					print('#\n# WARNING!\n# ffmpeg encountered an error. Halting. Output file may be incomplete.\n#')
					break

def getDestFqp(fileName):
	extensionless = re.sub(rgxExtNonMp4Video, '', fileName)
	return os.path.join(destDir, extensionless+'.mp4')
			
def composeMkvToMp4Command(fqpIn, fqpOut):
	return ffmpegTemplate.format(inPath=fqpIn, outPath=fqpOut)
	
def runCommand(command):
	runningProc = Popen(command, stdout = PIPE, stderr = STDOUT, shell = True)
	print('# OUTPUT:\n#')
	while True:
		line = runningProc.stdout.readline()
		if not line: break
		cleanedLine = line.decode("utf-8").strip()
		print('#> {lineOutput}'.format(lineOutput=cleanedLine))
	if runningProc.returncode is not None and runningProc.returncode > 0:
		return False
	print("#")
	return True

#
# DO THE THING
#
try:
	processFolder()
except:
	traceback.print_exc()
	print("FATAL ERROR!")

input("Press Enter to continue...")