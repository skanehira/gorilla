#!/bin/bash -e

# build
yarn run --silent build

if [ "$(git status --porcelain | wc -l | xargs)" -eq 0 ]; then
  echo "Not exist deploying contents."
  exit 0
fi

git config --global user.name "Circle CI"
git config --global user.email "<>"
git add -A
git commit -m "Deploy by CI"

git push $(git config --get remote.origin.url) master:master > /dev/null 2>&1

echo "Deploy a site!"
