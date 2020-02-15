package graphql

import (
	"github.com/99designs/gqlgen-contrib/gqlapollotracing"
	"github.com/99designs/gqlgen/handler"
	"github.com/go-chi/chi"

	"simple-twitter/endpoint"
)

// SetupRouter .
func SetupRouter(router chi.Router, path string, ep *endpoint.Endpoint) {
	router.Handle("/graphiql", handler.Playground("GraphQL Playground", "/graphql"))

	r := NewResolver(ep)
	router.Handle("/graphql", handler.GraphQL(
		NewExecutableSchema(Config{Resolvers: r}),

		// gqlapollotracing
		handler.RequestMiddleware(gqlapollotracing.RequestMiddleware()),
		handler.Tracer(gqlapollotracing.NewTracer()),
	))
}
