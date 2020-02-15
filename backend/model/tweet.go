package model

type Tweet struct {
	ID         string  `json:"id"`
	Content    *string `json:"content"`
	Owner      string  `json:"owner"`
	Retweet    *string `json:"retweet"`
	NumRetweet int     `json:"numRetweet" gorm:"-"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
}
