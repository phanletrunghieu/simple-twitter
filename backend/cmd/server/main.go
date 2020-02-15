package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"simple-twitter/client/postgres"
	"simple-twitter/client/redis"
	"simple-twitter/config"
	serviceHttp "simple-twitter/delivery/http"
	"simple-twitter/endpoint"
	"simple-twitter/repository"
	"syscall"
)

func main() {
	defer redis.Disconnect()
	defer postgres.Disconnect()

	repo := repository.New(postgres.GetClient, redis.GetClient())
	ep := endpoint.New(repo)
	h := serviceHttp.NewHTTPHandler(ep)

	errs := make(chan error)
	go func() {
		c := make(chan os.Signal)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errs <- fmt.Errorf("%s", <-c)
	}()

	go func() {
		cfg := config.GetConfig()
		log.Printf("Server is running on http://localhost:%s", cfg.Port)

		errs <- http.ListenAndServe(":"+cfg.Port, h)
	}()

	log.Println("exit", <-errs)
}
