package http

import (
	"net/http"

	"github.com/go-chi/chi"

	"simple-twitter/delivery/http/graphql"
	"simple-twitter/endpoint"
)

// NewHTTPHandler .
func NewHTTPHandler(ep *endpoint.Endpoint) http.Handler {
	router := chi.NewRouter()

	graphql.SetupRouter(router, "/", ep)

	return router
}
