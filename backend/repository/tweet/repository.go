package tweet

import (
	"context"
	"simple-twitter/model"
)

type Repository interface {
	GetByID(ctx context.Context, id string) (*model.TweetOutput, error)
	TopTweets(ctx context.Context, offset int, limit int) ([]model.TweetOutput, error)
	CreateTweet(ctx context.Context, tweet *model.Tweet) (*model.Tweet, error)

	SetCacheTopTweets(ctx context.Context, offset int, tweets []model.TweetOutput) error
	ClearCacheTopTweets(ctx context.Context) error

	CacheTweetByID(ctx context.Context, id string, tweet *model.TweetOutput) error
	ClearCacheTweetByID(ctx context.Context, id string) error
}
