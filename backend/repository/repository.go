package repository

import (
	"simple-twitter/repository/tweet"

	"github.com/jinzhu/gorm"
)

type Repository struct {
	Tweet tweet.Repository
}

func New(getClient func() *gorm.DB) *Repository {
	return &Repository{
		Tweet: tweet.NewPGTweetRepository(getClient),
	}
}
