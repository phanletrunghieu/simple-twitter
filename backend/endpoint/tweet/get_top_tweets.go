package tweet

import (
	"context"
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

		tweets, err := repo.Tweet.TopTweets(ctx, req.Pagination.Offset, req.Pagination.Limit)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get top tweets")
		}

		return tweets, nil
	}
}
