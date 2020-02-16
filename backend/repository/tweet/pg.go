package tweet

import (
	"context"
	"errors"
	"simple-twitter/model"

	"github.com/jinzhu/gorm"
)

type pgTweetRepository struct {
	getClient func() *gorm.DB
}

func NewPGTweetRepository(getClient func() *gorm.DB) Repository {
	return &pgTweetRepository{getClient}
}

func (t *pgTweetRepository) TopTweets(ctx context.Context, offset int, limit int) ([]model.TweetOutput, error) {
	tweets := []model.TweetOutput{}

	query := `
	SELECT "tweets".*, COUNT("ret"."id") AS "numRetweet"
	FROM "tweets"
	LEFT JOIN "tweets" AS "ret" ON "tweets"."id" = "ret"."retweet"
	GROUP BY "tweets"."id"
	ORDER BY "numRetweet" DESC, "tweets"."retweet" DESC, "created_at" DESC
	OFFSET ?
	LIMIT ?
	`

	db := t.getClient()
	if err := db.Raw(query, offset, limit).Scan(&tweets).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return tweets, nil
		}
		return nil, err
	}

	return tweets, nil
}

func (t *pgTweetRepository) CreateTweet(ctx context.Context, tweet *model.Tweet) (*model.Tweet, error) {
	if tweet == nil {
		return nil, errors.New("can not create nil tweet")
	}

	db := t.getClient()
	if err := db.Create(tweet).Error; err != nil {
		return nil, err
	}

	return tweet, nil
}

func (t *pgTweetRepository) GetByID(ctx context.Context, id string) (*model.TweetOutput, error) {
	tweet := &model.TweetOutput{}

	query := `
	SELECT "tweets".*, COUNT("ret"."id") AS "numRetweet"
	FROM "tweets"
	LEFT JOIN "tweets" AS "ret" ON "tweets"."id" = "ret"."retweet"
	WHERE "tweets"."id" = ?
	GROUP BY "tweets"."id"
	`

	db := t.getClient()
	if err := db.Raw(query, id).Scan(tweet).Error; err != nil {
		return nil, err
	}

	return tweet, nil
}

func (t *pgTweetRepository) SetCacheTopTweets(ctx context.Context, offset int, tweets []model.TweetOutput) error {
	panic("not implemented")
}

func (t *pgTweetRepository) ClearCacheTopTweets(ctx context.Context) error {
	panic("not implemented")
}

func (t *pgTweetRepository) CacheTweetByID(ctx context.Context, id string, tweet *model.TweetOutput) error {
	panic("not implemented")
}
