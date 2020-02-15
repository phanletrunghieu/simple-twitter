package graphql

import (
	"context"
	"strconv"

	"simple-twitter/endpoint"
	"simple-twitter/endpoint/tweet"
	"simple-twitter/model"
	"simple-twitter/util"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct {
	endpoint *endpoint.Endpoint
}

// NewResolver .
func NewResolver(ep *endpoint.Endpoint) *Resolver {
	return &Resolver{
		endpoint: ep,
	}
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateTweet(ctx context.Context, owner string, content string) (*model.Tweet, error) {
	// encode
	req := &tweet.CreateTweetRequest{
		Tweet: model.Tweet{
			Content: &content,
			Owner:   owner,
		},
	}

	// process
	resp, err := r.endpoint.Tweet.CreateTweet(ctx, req)
	if err != nil {
		myErr := err.(util.MyError)
		util.GQLerror(myErr.Message, strconv.Itoa(myErr.ErrorCode))
		return nil, nil
	}

	// decode
	result := resp.(*model.Tweet)
	return result, nil
}
func (r *mutationResolver) Retweet(ctx context.Context, owner string, tweetID string) (*model.Tweet, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) TopTweets(ctx context.Context, offset int, limit int) ([]*model.Tweet, error) {
	// encode
	req := &tweet.GetTopTweetsRequest{
		Pagination: model.Pagination{
			Offset: offset,
			Limit:  limit,
		},
	}
	req.Pagination.Check()

	// process
	resp, err := r.endpoint.Tweet.GetTopTweets(ctx, req)
	if err != nil {
		myErr := err.(util.MyError)
		util.GQLerror(myErr.Message, strconv.Itoa(myErr.ErrorCode))
		return nil, nil
	}

	// decode
	tweets := resp.([]model.Tweet)
	result := []*model.Tweet{}
	for i := range tweets {
		result = append(result, &tweets[i])
	}
	return result, nil
}
