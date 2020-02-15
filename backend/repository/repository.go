package repository

import (
	"github.com/jinzhu/gorm"
)

type Repository struct {
}

func New(getClient func() *gorm.DB) *Repository {
	return &Repository{}
}
