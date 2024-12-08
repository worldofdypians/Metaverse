#!/bin/bash

echo > result.out

git pull > result.out &

wait

PULLED=$(cat result.out | grep "Already up-to-date")

SUBPULL=${PULLED:0:7}

if [ "$SUBPULL" = "Already" ]; then 
	echo "Already"
	exit 1
	echo "HAHA"
fi

echo > result.out

yarn && yarn build > result.out &

wait     # Wait until background process finish

# git log --name-status HEAD^..HEAD > bbb.out

DONE=$(cat result.out | grep "Done in")

# check if DONE is not empty!

if [ "$DONE" != "" ]; then

	# extract the Done from the full phrase

	SUB=${DONE:0:4}

	if [ "$SUB" = "Done" ]; then 
		cp -R build/* aaa/;
	fi
fi

echo date > deployed.out 
