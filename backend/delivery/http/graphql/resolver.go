package graphql

import (
	"context"
	"simple-twitter/endpoint"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct {
	endpoint *endpoint.Endpoint
}

// NewResolver .
func NewResolver(ep *endpoint.Endpoint) *Resolver {
	return &Resolver{
		endpoint: ep,
	}
}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Test(ctx context.Context, skip int, first int) ([]bool, error) {
	panic("not implemented")
}
