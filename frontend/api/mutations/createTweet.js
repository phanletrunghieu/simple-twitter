import gql from 'graphql-tag';
import initApollo from '../../utils/apollo'

const CREATE_TWEET = gql`
    mutation($owner: String!, $content: String!){
        createTweet(owner: $owner, content: $content){
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

export function createTweet(owner, content) {
    return new Promise((resolve, reject) => {
        initApollo().query({
            query: CREATE_TWEET,
            variables: {
                owner,
                content,
            },
            fetchPolicy: "no-cache",
        })
        .then(({errors, data: {createTweet}})=>{
            if (errors) {
                return Promise.reject(errors)
            }
            resolve(createTweet)
        })
        .catch(reject)
    })
}