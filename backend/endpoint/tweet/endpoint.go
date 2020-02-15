package tweet

import (
	"simple-twitter/model"
	"simple-twitter/repository"
)

type Endpoint struct {
	GetTopTweets model.Endpoint
	CreateTweet  model.Endpoint
}

func NewEndpoint(repo *repository.Repository) Endpoint {
	return Endpoint{
		GetTopTweets: MakeGetTopTweetsEndpoint(repo),
		CreateTweet:  MakeCreateTweetEndpoint(repo),
	}
}
