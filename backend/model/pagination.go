package model

type Pagination struct {
	Offset int `json:"offset"`
	Limit  int `json:"limit"`
}

func (p *Pagination) Check() {
	maxLimit := 100
	if p.Limit > maxLimit {
		p.Limit = maxLimit
	}
}
