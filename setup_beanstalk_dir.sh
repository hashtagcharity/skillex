#!/bin/sh

export APP_VERSION=`git rev-parse --short HEAD`

if [ "$CI_BRANCH" = "master" ]
then
    cp -r .ebextensions-prod .ebextensions
else
    cp -r .ebextensions-lucy .ebextensions
fi
