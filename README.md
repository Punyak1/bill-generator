# BillGenerator
Generate pdf from frontend application served from browser

# Steps to generate executable file
1. ng build --configuration production
2. npm run electron-build
3. npx electron-packager . bill-generator --platform=win32 --arch=x64 --out=dist-electron --overwrite