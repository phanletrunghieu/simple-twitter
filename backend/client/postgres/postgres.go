package postgres

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"

	"simple-twitter/config"
)

var db *gorm.DB

func init() {
	var err error
	cfg := config.GetConfig()

	db, err = gorm.Open(
		"postgres",
		fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s search_path=%s sslmode=disable", cfg.Postgres.Host, cfg.Postgres.Port, cfg.Postgres.User, cfg.Postgres.Pass, cfg.Postgres.DBName, cfg.Postgres.Schema),
	)

	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected postgres db")

	db.DB().SetMaxIdleConns(100)

	if cfg.Debug {
		db = db.Debug()
	}
}

func GetClient() *gorm.DB {
	cloneDB := &gorm.DB{}
	*cloneDB = *db
	return cloneDB
}

func Disconnect() {
	if db != nil {
		db.Close()
	}
}
