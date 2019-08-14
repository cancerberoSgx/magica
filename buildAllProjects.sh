find . -name "node_modules" -exec rm -rf '{}' + && \
find . -name "package-lock.json" -exec rm -rf '{}' + && \
npm i && npm run all && \\ 
cd apps/magica-examples && npm i && npm run all && \\
# cd ../app-base && npm i && npm run all && \\
cd ../magica-canvas && npm i && npm run all && \\
cd ../magica-react && npm i && npm run all && \\
cd ../../playground && npm i && npm run all &&  \\
echo "End."