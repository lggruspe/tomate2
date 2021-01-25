.PHONY:	all
all:
	cd client; npm run lint
	cd client; npm test
	cd client; npm run  bundle
	cd client; npm run minify
	cp client/build/index.js tomate/static/index.js

.PHONY:	init
init:
	pip install --upgrade pip
	pip install -r requirements.txt
	cd client; npm ci
