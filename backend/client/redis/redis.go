package redis

import (
	"log"
	"time"

	"github.com/go-redis/redis/v7"

	"simple-twitter/config"
)

var client *redis.Client

func init() {
	cfg := config.GetConfig()
	client = redis.NewClient(&redis.Options{
		Addr:        cfg.RedisEndpoint,
		Password:    cfg.RedisPassword,
		DB:          0,
		DialTimeout: time.Minute,
	})

	_, err := client.Ping().Result()
	if err != nil {
		log.Fatal("Fail to connect redis", err)
	}
	log.Println("Connected redis server")
}

func GetClient() *redis.Client {
	return client
}

func Disconnect() {
	if client != nil {
		client.Close()
	}
}
