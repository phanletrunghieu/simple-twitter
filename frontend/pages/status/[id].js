import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Icon } from 'antd'
import { withAuthSync } from '../../utils/auth'
import { getTweetByID } from '../../api/queries/getTweetByID'
import Tweet from '../../components/Tweet'
import homecss from '../../assert/styles/home.scss'
import css from '../../assert/styles/tweet-page.scss'

class TweetPage extends Component {

    static async getInitialProps(ctx){
        const {id} = ctx.query
        const tweet = await getTweetByID(id)
        return {tweet}
    }



    render() {
        const {tweet} = this.props
        const {originTweet} = tweet
        return (
            <div className={homecss.container}>
                <div className={css['title-cotainer']}>
                    <div className={css['back-button']} onClick={this.props.router.back}>
                        <Icon type="arrow-left" className={css['back-icon']} />
                    </div>
                    <div className={css.title}>Tweet</div>
                </div>
                {
                    !tweet.retweet ? (
                        <Tweet
                            idForRetweet={tweet.id}
                            username={tweet.owner}
                            time={tweet.created_at}
                            content={tweet.content}
                            numRetweet={tweet.numRetweet}
                            onRetweet={()=>this.onRetweet(tweet.id)}
                        />
                    ) : (
                        <Tweet
                            idForRetweet={originTweet.id}
                            retweetedBy={tweet.owner}
                            username={originTweet.owner}
                            time={originTweet.created_at}
                            content={originTweet.content}
                            numRetweet={originTweet.numRetweet}
                            onRetweet={()=>this.onRetweet(originTweet.id)}
                        />
                    )
                }
            </div>
        )
    }
}

export default withAuthSync(withRouter(TweetPage))
