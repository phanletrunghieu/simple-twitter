package graphql

import (
	"github.com/99designs/gqlgen-contrib/gqlapollotracing"
	"github.com/99designs/gqlgen/handler"
	"github.com/go-chi/chi"

	"simple-twitter/endpoint"
	"simple-twitter/repository"
)

// SetupRouter .
func SetupRouter(router chi.Router, path string, ep *endpoint.Endpoint, repo *repository.Repository) {
	router.Handle("/graphiql", handler.Playground("GraphQL Playground", "/graphql"))

	r := NewResolver(ep, repo)
	router.Handle("/graphql", handler.GraphQL(
		NewExecutableSchema(Config{Resolvers: r}),

		// gqlapollotracing
		handler.RequestMiddleware(gqlapollotracing.RequestMiddleware()),
		handler.Tracer(gqlapollotracing.NewTracer()),
	))
}
