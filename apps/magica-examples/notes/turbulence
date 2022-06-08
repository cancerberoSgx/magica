#!/bin/bash
# 
# Developed by Fred Weinhaus 10/26/2017 .......... revised 10/26/2017
#
# ------------------------------------------------------------------------------
# 
# Licensing:
# 
# Copyright © Fred Weinhaus
# 
# My scripts are available free of charge for non-commercial use, ONLY.
# 
# For use of my scripts in commercial (for-profit) environments or 
# non-free applications, please contact me (Fred Weinhaus) for 
# licensing arrangements. My email address is fmw at alink dot net.
# 
# If you: 1) redistribute, 2) incorporate any of these scripts into other 
# free applications or 3) reprogram them in another scripting language, 
# then you must contact me for permission, especially if the result might 
# be used in a commercial or for-profit environment.
# 
# My scripts are also subject, in a subordinate manner, to the ImageMagick 
# license, which can be found at: http://www.imagemagick.org/script/license.php
# 
# ------------------------------------------------------------------------------
# 
####
#
# USAGE: turbulence [-m method] [-d distance] [-s smooth] [-c channels] [-v vpmethod] 
# [-b bgcolor] infile outfile
# USAGE: turbulence [-h or -help]
# 
# OPTIONS:
# 
# -m     method       method of turbulence warping; choices are: displace or distort; 
#                     default=displace
# -d     distance     distance amount for turbulence warping; comma separate pair of 
#                     integer>=0; for x and y distiance; default=20
# -s     smooth       smoothing amount of turbulence warping; integer>=0; default=20
# -c     channels     channel processing; choices are: together or separate; 
#                     default=together
# -v     vpmethod     virtual pixel method; any valid IM virtual-pixel method may be 
#                     specified; default=mirror
# -b     bgcolor      background color when virtual pixel method is background; 
#                     any valid IM color may be specified; default=black
# 
###
# 
# NAME: TURBULENCE
#  
# PURPOSE: To apply a turbulence-like warping of the image.
# 
# DESCRIPTION: TURBULENCE applies a turbulence-like warping of the image. The warping 
# is done via a displacement/distortion mapping from an edge extracted version of the 
# input image. Using channels=together will warp all channels the same. Using 
# channels=separate will warp each channel separately.
# 
# 
# Arguments: 
# 
# -m method ... METHOD of turbulence warping. The choices are: displace or distort.  
# The default=displace.
# 
# -d distance ... DISTANCE amounts for x and y turbulence warping. Values are a comma 
# separated pair of integers>=0. If only one value is supplied, then it will be use 
# for both x and y distances. The default=20.
# 
# -s smooth ... SMOOTH is the smoothing amount of turbulence warping. Values are 
# integers>=0. The default=20.
# 
# -c channels ... CHANNELS is the channel processing technique. The choices are: 
# together (t) or separate (s). The default=together.
# 
# -v vpmethod ... VPMETHOD is the virtual pixel method. Any valid IM virtual-pixel 
# method may be specified. The default=mirror.
# 
# -b bgcolor ... BGCOLOR is the background color when virtual pixel method is 
# background. Any valid IM color may be specified. The default=black.
# 
# REQUIREMENTS: IM 6.5.3-5 or higher when using method=distort.
# 
# CAVEAT: No guarantee that this script will work on all platforms, 
# nor that trapping of inconsistent parameters is complete and 
# foolproof. Use At Your Own Risk. 
# 
######
# 

# set default values; 
method="displace"		# displace or distort
distance=20		# distance of shift
smooth=20				# smoothing of distortion
channels="together"		# process channels together or separate
vpmethod="mirror"				# virtual pixel method
bgcolor="black"			# virtual pixel background

# set directory for temporary files
dir="."    # suggestions are dir="." or dir="/tmp"

# set up functions to report Usage and Usage with Description
PROGNAME=`type $0 | awk '{print $3}'`  # search for executable on path
PROGDIR=`dirname $PROGNAME`            # extract directory of program
PROGNAME=`basename $PROGNAME`          # base name of program
usage1() 
	{
	echo >&2 ""
	echo >&2 "$PROGNAME:" "$@"
	sed >&2 -e '1,/^####/d;  /^###/g;  /^#/!q;  s/^#//;  s/^ //;  4,$p' "$PROGDIR/$PROGNAME"
	}
usage2() 
	{
	echo >&2 ""
	echo >&2 "$PROGNAME:" "$@"
	sed >&2 -e '1,/^####/d;  /^######/g;  /^#/!q;  s/^#*//;  s/^ //;  4,$p' "$PROGDIR/$PROGNAME"
	}

# function to report error messages
errMsg()
	{
	echo ""
	echo $1
	echo ""
	usage1
	exit 1
	}

# function to test for minus at start of value of second part of option 1 or 2
checkMinus()
	{
	test=`echo "$1" | grep -c '^-.*$'`   # returns 1 if match; 0 otherwise
    [ $test -eq 1 ] && errMsg "$errorMsg"
	}

# test for correct number of arguments and get values
if [ $# -eq 0 ]
	then
	# help information
	echo ""
	usage2
	exit 0
elif [ $# -gt 14 ]
	then
	errMsg "--- TOO MANY ARGUMENTS WERE PROVIDED ---"
else
	while [ $# -gt 0 ]
		do
		# get parameters
		case "$1" in
	  -h|-help)    # help information
				   echo ""
				   usage2
				   ;;
			-m)    # method
				   shift  # to get the next parameter
				   # test if parameter starts with minus sign 
				   errorMsg="--- INVALID METHOD SPECIFICATION ---"
				   checkMinus "$1"
				   method=`echo "$1" | tr "[:upper:]" "[:lower:]"`
				   case "$method" in
						displace) ;;
						distort) ;;
						*) errMsg "--- METHOD=$method IS NOT A VALID CHOICE ---" ;;
				   esac
				   ;;
			-d)    # get distance
				   shift  # to get the next parameter
				   # test if parameter starts with minus sign 
				   errorMsg="--- INVALID DISTANCE SPECIFICATION ---"
				   checkMinus "$1"
				   distance=`expr "$1" : '\([0-9]*,*[0-9]*\)'`
				   [ "$distance" = "" ] && errMsg "--- DISTANCE=$distance MUST BE A NON-NEGATIVE INTEGER ---"
				   ;;
			-s)    # get smooth
				   shift  # to get the next parameter
				   # test if parameter starts with minus sign 
				   errorMsg="--- INVALID SMOOTH SPECIFICATION ---"
				   checkMinus "$1"
				   smooth=`expr "$1" : '\([0-9]*\)'`
				   [ "$smooth" = "" ] && errMsg "--- SMOOTH=$smooth MUST BE A NON-NEGATIVE INTEGER ---"
				   ;;
			-c)    # channels
				   shift  # to get the next parameter
				   # test if parameter starts with minus sign 
				   errorMsg="--- INVALID CHANNELS SPECIFICATION ---"
				   checkMinus "$1"
				   channels=`echo "$1" | tr "[:upper:]" "[:lower:]"`
				   case "$channels" in
						together|t) channels="together" ;;
						separate|s) channels="separate" ;;
						*) errMsg "--- CHANNELS=$channels IS NOT A VALID CHOICE ---" ;;
				   esac
				   ;;
			-v)    # vpmethod
				   shift  # to get the next parameter
				   # test if parameter starts with minus sign 
				   errorMsg="--- INVALID VPMETHOD SPECIFICATION ---"
				   checkMinus "$1"
				   vpmethod=$1
				   ;;
			-b)    # bgcolor
				   shift  # to get the next parameter
				   # test if parameter starts with minus sign 
				   errorMsg="--- INVALID BGCOLOR SPECIFICATION ---"
				   checkMinus "$1"
				   bgcolor=$1
				   ;;
			 -)    # STDIN and end of arguments
				   break
				   ;;
			-*)    # any other - argument
				   errMsg "--- UNKNOWN OPTION ---"
				   ;;
			*)     # end of arguments
				   break
				   ;;
		esac
		shift   # next option
	done
	#
	# get infile and outfile
	infile="$1"
	outfile="$2"
fi


# test that infile provided
[ "$infile" = "" ] && errMsg "NO INPUT FILE SPECIFIED"

# test that outfile provided
[ "$outfile" = "" ] && errMsg "NO OUTPUT FILE SPECIFIED"


# setup temporary images
tmpA1="$dir/turbulence_1_$$.mpc"
tmpB1="$dir/turbulence_1_$$.cache"
trap "rm -f $tmpA1 $tmpB1; exit 0" 0
trap "rm -f $tmpA1 $tmpB1; exit 1" 1 2 3 15

# read the input image into the temporary cached image and test if valid
convert -quiet -regard-warnings "$infile" +repage $tmpA1 ||
	echo "--- 1 FILE $infile DOES NOT EXIST OR IS NOT AN ORDINARY FILE, NOT READABLE OR HAS ZERO size  ---"

#get distx and disty
distx=`echo "$distance" | cut -d, -f1`
disty=`echo "$distance" | cut -d, -f2`
distx=-$distx
disty=-$disty

if [ "$channels" = "together" ]; then
	convert $tmpA1 \
	\( -clone 0 -define convolve:scale='50%!' -bias 50% \
	-morphology Convolve Sobel -colorspace gray -blur 0x$smooth -auto-level \) \
	-virtual-pixel $vpmethod -background "$bgcolor" -define compose:args="$distx,$disty" \
	-compose $method -composite "$outfile"

elif [ "$channels" = "separate" ]; then
convert $tmpA1 \
	\( -clone 0 -define convolve:scale='50%!' -bias 50% -morphology Convolve Sobel \
		-blur 0x$smooth -channel rgb -auto-level \) \
	\( -clone 0 -clone 1 -channel r -separate +channel -virtual-pixel $vpmethod -background "$bgcolor" \
		-define compose:args="$distx,$disty" -compose $method -composite \) \
	\( -clone 0 -clone 1 -channel g -separate +channel -virtual-pixel $vpmethod -background "$bgcolor" \
		-define compose:args="$distx,$disty" -compose $method -composite \) \
	\( -clone 0 -clone 1 -channel b -separate +channel -virtual-pixel $vpmethod -background "$bgcolor" \
		-define compose:args="$distx,$disty" -compose $method -composite \) \
	-delete 0,1 -combine "$outfile"
fi


exit 0






