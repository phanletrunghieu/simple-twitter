package endpoint

import (
	"simple-twitter/endpoint/tweet"
	"simple-twitter/repository"
)

type Endpoint struct {
	Tweet tweet.Endpoint
}

func New(repo *repository.Repository) *Endpoint {
	return &Endpoint{
		Tweet: tweet.NewEndpoint(repo),
	}
}
