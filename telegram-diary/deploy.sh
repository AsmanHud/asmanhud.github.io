set -e

echo "Building app..."
npm run build

DEST_DIR="../telegram-diary-dist"

echo "Cleaning up existing files in $DEST_DIR..."
rm -rf $DEST_DIR/*

echo "Copying new build to $DEST_DIR..."
cp -R dist/* $DEST_DIR

cd $DEST_DIR

echo "Committing and pushing changes..."
git add .
git commit -m "Telegram Diary: Deploy updated app to GitHub Pages"
git push origin main

echo "Deployment successful!"