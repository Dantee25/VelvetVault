#!/bin/bash


echo "Git status"
git status

echo "Adding changes"
git add .

echo "Committing changes"
git commit -m "Auto-Deploy"

echo "Pushing changes"
git push origin main

echo "Deploying"
npm run deploy

echo "Done"
