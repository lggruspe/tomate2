.PHONY:	all
all:
	cd client; npm run lint; npm test; npm run bundle; npm run minify
	cp client/build/index.js tomate/static/index.js

.PHONY:	init
init:
	pip install --upgrade pip
	pip install -r requirements.txt
	cd client; npm ci
