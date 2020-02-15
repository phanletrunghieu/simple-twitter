package tweet

import (
	"context"
	"net/http"

	"simple-twitter/model"
	"simple-twitter/repository"
	"simple-twitter/util"

	"github.com/jinzhu/gorm"
)

type RetweetRequest struct {
	Owner   string
	TweetID string
}

func MakeRetweetEndpoint(repo *repository.Repository) model.Endpoint {
	return func(ctx context.Context, request interface{}) (response interface{}, err error) {
		// decode req
		req, ok := request.(*RetweetRequest)
		if !ok {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		// validation
		if err := validateRetweet(req); err != nil {
			return nil, err.(util.MyError)
		}

		_, err = repo.Tweet.GetByID(ctx, req.TweetID)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Tweet is not exist")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error find tweet "+req.TweetID)
		}

		// call db
		tweet := &model.Tweet{
			Retweet: &req.TweetID,
			Owner:   req.Owner,
		}
		tweet, err = repo.Tweet.CreateTweet(ctx, tweet)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Error retweet")
		}

		return tweet, nil
	}
}

func validateRetweet(req *RetweetRequest) error {
	if req.Owner == "" {
		return util.NewError(nil, http.StatusNotAcceptable, 2020, "missing 'Owner'")
	}

	if req.Owner == "" {
		return util.NewError(nil, http.StatusNotAcceptable, 2020, "missing 'TweetID'")
	}

	return nil
}
