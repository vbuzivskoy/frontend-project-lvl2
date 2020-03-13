install:
	npm install

start:
	npx node dist/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test