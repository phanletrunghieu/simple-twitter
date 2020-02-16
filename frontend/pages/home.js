import React, {PureComponent} from 'react'
import { Button} from 'antd';
import { connect } from 'react-redux'
import nextCookie from 'next-cookies'
import {withAuthSync, signout} from '../utils/auth'
import Tweet from '../components/Tweet'
import TweetEditor from '../components/TweetEditor'
import css from '../assert/styles/home.scss'
import {createTweet} from '../api/mutations/createTweet'
import {retweet} from '../api/mutations/retweet'
import {TopTweetsAction} from '../redux/topTweets'
import {MessageAction} from '../redux/message'

class Home extends PureComponent {
    state = {
        newTweet: "",
        loadingCreateTweet: false,
    }

    static getInitialProps(ctx){
        let username = nextCookie(ctx).token
        return {username}
    }

    componentDidMount(){
        this.props.getTopTweets(0, 10)
    }

    onTweetChange = (newTweet) => {
        this.setState({newTweet})
    }

    onClickCreateTweet = () => {
        this.setState({loadingCreateTweet: true})
        createTweet(this.props.username, this.state.newTweet)
        .then(() => {
            this.props.getTopTweets(0, 10)
            this.setState({newTweet: ""})
        })
        .catch(err => this.props.addError(err))
        .finally(() => this.setState({loadingCreateTweet: false}))
    }

    onRetweet = (tweetID) => {
        retweet(this.props.username, tweetID)
        .then(()=>{
            this.props.increaseRetweet(tweetID)
        })
        .catch(err => this.props.addError(err))
    }

    render() {
        return (
            <div className={css.container}>
                <div className={css.title}>Top 10 retweeted</div>
                <Button
                    className={css['signout-button']}
                    type="primary"
                    shape="round"
                    onClick={signout}
                >
                    Sign out
                </Button>
                <TweetEditor
                    html={this.state.newTweet}
                    onChange={this.onTweetChange}
                    onClickOK={this.onClickCreateTweet}
                    loading={this.state.loadingCreateTweet}
                />
                {
                    this.props.rdTopTweets.tweets.map((tweet, i) => {
                        if (!tweet.retweet) {
                            return (
                                <Tweet
                                    key={i}
                                    username={tweet.owner}
                                    time={tweet.created_at}
                                    content={tweet.content}
                                    numRetweet={tweet.numRetweet}
                                    onRetweet={()=>this.onRetweet(tweet.id)}
                                />
                            )
                        } else {
                            let {originTweet} = tweet
                            return (
                                <Tweet
                                    key={i}
                                    retweetedBy={tweet.owner}
                                    username={originTweet.owner}
                                    time={originTweet.created_at}
                                    content={originTweet.content}
                                    numRetweet={originTweet.numRetweet}
                                    onRetweet={()=>this.onRetweet(originTweet.id)}
                                />
                            )
                        }
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    rdTopTweets: state.topTweets,
})

const mapDispatchToProps = dispatch => ({
    getTopTweets: (offset, limit) => dispatch(TopTweetsAction.getTopTweetsRequest(offset, limit)),
    increaseRetweet: (tweetID) => dispatch(TopTweetsAction.increaseRetweet(tweetID)),
    addError: (error) => dispatch(MessageAction.addError(error)),
})

export default withAuthSync(connect(mapStateToProps, mapDispatchToProps)(Home))