import gql from 'graphql-tag';
import initApollo from '../../utils/apollo'

const TOP_TWEETS = gql`
    query TopTweets($offset: Int!, $limit: Int!){
        topTweets(offset: $offset, limit: $limit){
            id
            content
            owner
            retweet
            originTweet{
                id
                owner
                content
                numRetweet
                created_at
            }
            numRetweet
            created_at
            updated_at
        }
    }
`;

export function getTopTweets(offset=0, limit=10) {
    return new Promise((resolve, reject) => {
        initApollo().query({
            query: TOP_TWEETS,
            variables: {
                offset: offset.toString(),
                limit: limit.toString(),
            },
            fetchPolicy: "no-cache",
        })
        .then(({errors, data: {topTweets}})=>{
            if (errors) {
                return Promise.reject(errors)
            }
            resolve(topTweets)
        })
        .catch(reject)
    })
}