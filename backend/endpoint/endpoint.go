package endpoint

import "simple-twitter/repository"

type Endpoint struct {
}

func New(repo *repository.Repository) *Endpoint {
	return &Endpoint{}
}
