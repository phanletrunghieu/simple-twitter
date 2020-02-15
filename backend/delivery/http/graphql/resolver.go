package graphql

import (
	"context"
	"strconv"

	"github.com/99designs/gqlgen/graphql"

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

func (r *mutationResolver) CreateTweet(ctx context.Context, owner string, content string) (*model.TweetOutput, error) {
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
		graphql.AddError(ctx, util.GQLerror(myErr.Message, strconv.Itoa(myErr.ErrorCode)))
		return nil, nil
	}

	// decode
	tweet := resp.(*model.Tweet)
	result := &model.TweetOutput{
		Tweet: *tweet,
	}
	return result, nil
}
func (r *mutationResolver) Retweet(ctx context.Context, owner string, tweetID string) (*model.TweetOutput, error) {
	// encode
	req := &tweet.RetweetRequest{
		TweetID: tweetID,
		Owner:   owner,
	}

	// process
	resp, err := r.endpoint.Tweet.Retweet(ctx, req)
	if err != nil {
		myErr := err.(util.MyError)
		graphql.AddError(ctx, util.GQLerror(myErr.Message, strconv.Itoa(myErr.ErrorCode)))
		return nil, nil
	}

	// decode
	tweet := resp.(*model.Tweet)
	result := &model.TweetOutput{
		Tweet: *tweet,
	}
	return result, nil
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) TopTweets(ctx context.Context, offset int, limit int) ([]*model.TweetOutput, error) {
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
		graphql.AddError(ctx, util.GQLerror(myErr.Message, strconv.Itoa(myErr.ErrorCode)))
		return nil, nil
	}

	// decode
	tweets := resp.([]model.TweetOutput)
	result := []*model.TweetOutput{}
	for i := range tweets {
		result = append(result, &tweets[i])
	}
	return result, nil
}
