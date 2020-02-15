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

func (t *pgTweetRepository) TopTweets(ctx context.Context, offset int, limit int) ([]model.Tweet, error) {
	tweets := []model.Tweet{}
	db := t.getClient()
	if err := db.Find(&tweets).Error; err != nil {
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

func (t *pgTweetRepository) GetByID(ctx context.Context, id string) (*model.Tweet, error) {
	tweet := &model.Tweet{ID: id}
	db := t.getClient()
	if err := db.Find(tweet).Error; err != nil {
		return nil, err
	}

	return tweet, nil
}
