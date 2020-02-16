package tweet

import (
	"context"
	"errors"
	"simple-twitter/model"
	"simple-twitter/util"
	"time"

	"github.com/go-redis/redis/v7"
)

var keyTopTweets = "TopTweets"
var keyTweetID = "Tweet:"

type cacheTweetRepository struct {
	redis *redis.Client
}

func NewCacheTweetRepository(redisClient *redis.Client) Repository {
	return &cacheTweetRepository{redis: redisClient}
}

func (t *cacheTweetRepository) TopTweets(ctx context.Context, offset int, limit int) ([]model.TweetOutput, error) {
	length := t.redis.LLen(keyTopTweets).Val()
	if length < int64(offset+limit) {
		return nil, errors.New("data in cache is not enough")
	}

	tweets := []model.TweetOutput{}
	err := t.redis.LRange(keyTopTweets, int64(offset), int64(offset+limit)).ScanSlice(&tweets)

	return tweets, err
}

func (t *cacheTweetRepository) SetCacheTopTweets(ctx context.Context, offset int, tweets []model.TweetOutput) error {
	length := t.redis.LLen(keyTopTweets).Val()
	errs := util.Errors{}

	for i := range tweets {
		index := int64(offset + i)

		var err error

		if index < length {
			err = t.redis.LSet(keyTopTweets, index, tweets[i]).Err()
		} else {
			err = t.redis.RPush(keyTopTweets, tweets[i]).Err()
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
	for t.redis.LLen(keyTopTweets).Val() > 0 {
		err := t.redis.LTrim(keyTopTweets, 0, -99).Err()
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

func (t *cacheTweetRepository) GetByID(ctx context.Context, id string) (*model.TweetOutput, error) {
	tweet := &model.TweetOutput{}
	err := t.redis.Get(keyTweetID + id).Scan(tweet)
	return tweet, err
}

func (t *cacheTweetRepository) CacheTweetByID(ctx context.Context, id string, tweets *model.TweetOutput) error {
	return t.redis.Set(keyTweetID+id, tweets, time.Hour).Err()
}

func (t *cacheTweetRepository) ClearCacheTweetByID(ctx context.Context, id string) error {
	return t.redis.Del(keyTweetID + id).Err()
}
