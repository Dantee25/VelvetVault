#!/bin/bash

# Display the current git status
echo "Checking Git status..."
git status

# Add all changes
echo "Adding all changes..."
git add .

# Commit with a message
echo "Committing changes..."
git commit -m "$1"

# Push changes to origin/main
echo "Pushing changes to origin/main..."
git push origin main

# Build the project
echo "Building the project..."
npm run build

# Deploy the project
echo "Deploying the project..."
npm run deploy

echo "All steps completed successfully!"
