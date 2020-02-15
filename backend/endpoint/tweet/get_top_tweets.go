package tweet

import (
	"context"
	"log"
	"net/http"

	"simple-twitter/model"
	"simple-twitter/repository"
	"simple-twitter/util"
)

type GetTopTweetsRequest struct {
	Pagination model.Pagination
}

func MakeGetTopTweetsEndpoint(repo *repository.Repository) model.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		req, ok := request.(*GetTopTweetsRequest)
		if !ok {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		// get from cache
		tweets, err := repo.TweetCache.TopTweets(ctx, req.Pagination.Offset, req.Pagination.Limit)
		if err == nil {
			return tweets, nil
		}

		// get from pg
		tweets, err = repo.Tweet.TopTweets(ctx, req.Pagination.Offset, req.Pagination.Limit)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get top tweets")
		}

		// update cache
		err = repo.TweetCache.SetCacheTopTweets(ctx, req.Pagination.Offset, tweets)
		if err != nil {
			log.Printf("Error update cache TopTweets %v", err)
		}

		return tweets, nil
	}
}
