install:
	npm install
	make -C app install

start-frontend:
	make -C app start

start-backend:
	npx start-server -a localhost -p 5001

start:
	make start-backend & make start-frontend

lint:
	make -C app lint

build:
	make -C app build
