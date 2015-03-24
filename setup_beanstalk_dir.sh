#!/bin/sh

if [ -d ".ebextensions" ]; then
    rm -rd .ebextensions
fi

if [ "$CI_BRANCH" = "master" ]
then
    cp -r .ebextensions-prod/ .ebextensions
else
    cp -r .ebextensions-lucy/ .ebextensions
fi
