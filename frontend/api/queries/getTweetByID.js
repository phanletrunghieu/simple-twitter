import gql from 'graphql-tag';
import initApollo from '../../utils/apollo'

const TWEET_BY_ID = gql`
    query($id: ID!){
        tweetByID(id: $id){
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

export function getTweetByID(id) {
    return new Promise((resolve, reject) => {
        initApollo().query({
            query: TWEET_BY_ID,
            variables: {
                id: id.toString(),
            },
            fetchPolicy: "no-cache",
        })
        .then(({errors, data: {tweetByID}})=>{
            if (errors) {
                return Promise.reject(errors)
            }
            resolve(tweetByID)
        })
        .catch(reject)
    })
}