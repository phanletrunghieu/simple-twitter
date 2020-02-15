package tweet

import (
	"context"
	"simple-twitter/model"
)

type Repository interface {
	TopTweets(ctx context.Context, offset int, limit int) ([]model.Tweet, error)
	CreateTweet(ctx context.Context, tweet *model.Tweet) (*model.Tweet, error)
}
