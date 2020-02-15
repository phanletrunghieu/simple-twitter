package tweet

import (
	"context"
	"net/http"

	"simple-twitter/model"
	"simple-twitter/repository"
	"simple-twitter/util"
)

type CreateTweetRequest struct {
	Tweet model.Tweet
}

func MakeCreateTweetEndpoint(repo *repository.Repository) model.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		// decode req
		req, ok := request.(*CreateTweetRequest)
		if !ok {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		// validation
		if err := validate(req); err != nil {
			return nil, err.(util.MyError)
		}

		// call db
		tweet, err := repo.Tweet.CreateTweet(ctx, &req.Tweet)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error create new tweet")
		}

		return tweet, nil
	}
}

func validate(req *CreateTweetRequest) error {
	if req.Tweet.Content == nil ||
		(req.Tweet.Content != nil && *req.Tweet.Content == "") {
		return util.NewError(nil, http.StatusNotAcceptable, 2020, "missing 'content'")
	}

	return nil
}
