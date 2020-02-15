package model

import "time"

type Tweet struct {
	ID        string     `json:"id"`
	Content   *string    `json:"content"`
	Owner     string     `json:"owner"`
	Retweet   *string    `json:"retweet"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at"`
}

type TweetOutput struct {
	Tweet
	NumRetweet int `json:"numRetweet" gorm:"column:numRetweet"`
}
