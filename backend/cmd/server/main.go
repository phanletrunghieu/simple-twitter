package main

import (
	"log"
	"net/http"
	"simple-twitter/client/postgres"
	"simple-twitter/client/redis"
	"simple-twitter/config"
	serviceHttp "simple-twitter/delivery/http"
	"simple-twitter/endpoint"
	"simple-twitter/repository"
)

func main() {
	defer redis.Disconnect()
	defer postgres.Disconnect()

	repo := repository.New(postgres.GetClient)
	ep := endpoint.New(repo)
	h := serviceHttp.NewHTTPHandler(ep)

	cfg := config.GetConfig()
	log.Printf("Server is running on http://localhost:%s", cfg.Port)

	err := http.ListenAndServe(":"+cfg.Port, h)
	if err != nil {
		log.Fatal(err)
	}
}
