package model

import "time"

type Tweet struct {
	ID         string    `json:"id"`
	Content    *string   `json:"content"`
	Owner      string    `json:"owner"`
	Retweet    *string   `json:"retweet"`
	NumRetweet int       `json:"numRetweet" gorm:"-"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
