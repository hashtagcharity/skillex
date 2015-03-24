#!/bin/sh

rm -rd .ebextensions

if [ "$CI_BRANCH" = "master" ]
then
    cp -r .ebextensions-prod/ .ebextensions
else
    cp -r .ebextensions-lucy/ .ebextensions
fi
