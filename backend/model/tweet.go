package model

type Tweet struct {
	ID        string  `json:"id"`
	Content   *string `json:"content"`
	Owner     string  `json:"owner"`
	Retweet   *string `json:"retweet"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
}
