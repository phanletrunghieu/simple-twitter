package tweet

import (
	"context"
	"log"
	"net/http"

	"simple-twitter/model"
	"simple-twitter/repository"
	"simple-twitter/util"
)

type GetTweetByIDRequest struct {
	ID string
}

func MakeGetTweetByIDEndpoint(repo *repository.Repository) model.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req, ok := request.(*GetTweetByIDRequest)
		if !ok {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		// get from cache
		tweet, err := repo.TweetCache.GetByID(ctx, req.ID)
		if err == nil {
			return tweet, nil
		}

		// get from pg
		tweet, err = repo.Tweet.GetByID(ctx, req.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get top tweets")
		}

		// update cache
		err = repo.TweetCache.CacheTweetByID(ctx, req.ID, tweet)
		if err != nil {
			log.Printf("Error update cache TopTweets %v", err)
		}

		return tweet, nil
	}
}
