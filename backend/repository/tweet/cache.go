package tweet

import (
	"context"
	"errors"
	"simple-twitter/model"
	"simple-twitter/util"

	"github.com/go-redis/redis/v7"
)

var key = "TopTweets"

type cacheTweetRepository struct {
	redis *redis.Client
}

func NewCacheTweetRepository(redisClient *redis.Client) Repository {
	return &cacheTweetRepository{redis: redisClient}
}

func (t *cacheTweetRepository) TopTweets(ctx context.Context, offset int, limit int) ([]model.TweetOutput, error) {
	length := t.redis.LLen(key).Val()
	if length < int64(offset+limit) {
		return nil, errors.New("data in cache is not enough")
	}

	tweets := []model.TweetOutput{}
	err := t.redis.LRange(key, int64(offset), int64(offset+limit)).ScanSlice(&tweets)

	return tweets, err
}

func (t *cacheTweetRepository) SetCacheTopTweets(ctx context.Context, offset int, tweets []model.TweetOutput) error {
	length := t.redis.LLen(key).Val()
	errs := util.Errors{}

	for i := range tweets {
		index := int64(offset + i)

		var err error

		if index < length {
			err = t.redis.LSet(key, index, tweets[i]).Err()
		} else {
			err = t.redis.RPush(key, tweets[i]).Err()
		}

		if err != nil {
			errs.Add(err)
		}
	}

	if errs.Length() > 0 {
		return errs
	}
	return nil
}

func (t *cacheTweetRepository) ClearCacheTopTweets(ctx context.Context) error {
	retry := 0
	for t.redis.LLen(key).Val() > 0 {
		err := t.redis.LTrim(key, 0, -99).Err()
		if err != nil {
			retry++

			if retry >= 3 {
				return err
			}
		}
	}

	return nil
}

func (t *cacheTweetRepository) CreateTweet(ctx context.Context, tweet *model.Tweet) (*model.Tweet, error) {
	panic("not implemented")
}

func (t *cacheTweetRepository) GetByID(ctx context.Context, id string) (*model.Tweet, error) {
	panic("not implemented")
}
