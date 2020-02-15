.PHONY: local-db build run gqlgen

local-db:
	@docker-compose down
	@docker-compose up -d

build:  ; $(info $(M) Building project...)
	go build -ldflags "-s -w" -o ./bin/server ./cmd/server/main.go

run: build
	PORT=4000 ./bin/server

gqlgen: ; $(info $(M) Generating gqlgen files...)
	go run scripts/gqlgen.go -v