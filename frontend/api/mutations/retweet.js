import gql from 'graphql-tag';
import initApollo from '../../utils/apollo'

const RETWEET = gql`
    mutation($owner: String!, $tweetID: ID!){
        retweet(owner: $owner, tweetID: $tweetID){
            id
            content
            owner
            retweet
            numRetweet
            created_at
            updated_at
        }
    }
`;

export function retweet(owner, tweetID) {
    return new Promise((resolve, reject) => {
        initApollo().query({
            query: RETWEET,
            variables: {
                owner,
                tweetID,
            },
            fetchPolicy: "no-cache",
        })
        .then(({errors, data: {retweet}})=>{
            if (errors) {
                return Promise.reject(errors)
            }
            resolve(retweet)
        })
        .catch(reject)
    })
}