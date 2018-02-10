#!/usr/bin/env bash
set -e

git_commit=`git rev-parse --short HEAD`
build_date=`date -u +"%Y-%m-%dT%H:%MZ"`
version=$(jq '.version' package.json | tr -d '"')
app_name='nst-ui'
tag=$1

echo "{
    \"version\": \"$version\",
    \"vcs\": \"$git_commit\",
    \"build_date\": \"$build_date\"
}" > ./build/about.json

docker build --build-arg git_commit=$git_commit \
                  --build-arg build_date=$build_date \
                  --build-arg version=$version \
                  -t $app_name$tag .
