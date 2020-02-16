package http

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"

	"simple-twitter/delivery/http/graphql"
	"simple-twitter/endpoint"
	"simple-twitter/repository"
)

// NewHTTPHandler .
func NewHTTPHandler(ep *endpoint.Endpoint, repo *repository.Repository) http.Handler {
	router := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	})
	router.Use(cors.Handler)

	graphql.SetupRouter(router, "/", ep, repo)

	return router
}
