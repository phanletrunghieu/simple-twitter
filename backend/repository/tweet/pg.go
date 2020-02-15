package tweet

import (
	"context"
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
		return nil, err
	}

	return tweets, nil
}
