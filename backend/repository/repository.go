package repository

import (
	"simple-twitter/repository/tweet"

	"github.com/go-redis/redis/v7"
	"github.com/jinzhu/gorm"
)

type Repository struct {
	Tweet      tweet.Repository
	TweetCache tweet.Repository
}

func New(getClient func() *gorm.DB, redisClient *redis.Client) *Repository {
	return &Repository{
		Tweet:      tweet.NewPGTweetRepository(getClient),
		TweetCache: tweet.NewCacheTweetRepository(redisClient),
	}
}
