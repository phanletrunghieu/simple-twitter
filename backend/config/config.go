package config

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

var config *Config

// Config .
type Config struct {
	Debug bool `envconfig:"DEBUG"`

	Port string `envconfig:"PORT"`

	RedisEndpoint string `envconfig:"REDIS_ENDPOINT"`
	RedisPassword string `envconfig:"REDIS_PASSWORD"`

	Postgres struct {
		Host   string `envconfig:"POSTGRES_HOST"`
		Port   string `envconfig:"POSTGRES_PORT"`
		User   string `envconfig:"POSTGRES_USER"`
		Pass   string `envconfig:"POSTGRES_PASS"`
		DBName string `envconfig:"POSTGRES_DBNAME"`
		Schema string `envconfig:"POSTGRES_SCHEMA"`
	}
}

func init() {
	// load .env
	godotenv.Load()

	config = &Config{}
	err := envconfig.Process("", config)
	if err != nil {
		panic(fmt.Sprintf("Failed to decode config env: %v", err))
	}

	if len(config.Port) == 0 {
		config.Port = "3000"
	}
}

// GetConfig .
func GetConfig() *Config {
	return config
}
