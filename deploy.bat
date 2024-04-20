set -e

git add -A
git commit -m 'main'
git push

npm run build
npm run deploy



