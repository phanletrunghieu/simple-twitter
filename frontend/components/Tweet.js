import React, { Component } from 'react'
import {Icon, message, Popconfirm} from 'antd'
import nextCookie from 'next-cookies'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import {retweet} from '../api/mutations/retweet'
import {TopTweetsAction} from '../redux/topTweets'
import {MessageAction} from '../redux/message'
import defaultAvatar from '../assert/images/default_profile_400x400.png'
import css from '../assert/styles/component/tweet.scss'

export class Tweet extends Component {
    static getInitialProps(ctx){
        let username = nextCookie(ctx).token
        return {username}
    }

    notImplemented = () => {
        message.error("Not implemented")
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
                {
                    this.props.retweetedBy && (
                        <div className={css.retweet}>
                            <Icon className={css['retweet-icon']} type="retweet" />
                            <div>{this.props.retweetedBy} Retweeted</div>
                        </div>
                    )
                }
                <div className={css['tweet-container']}>
                    <div className={css.left}>
                        <img className={css.avatar} src={defaultAvatar}/>
                    </div>
                    <div className={css.right}>
                        <div className={css.head} onClick={this.props.onClick}>
                            <div className={css.username}>{this.props.username}</div>
                            <div className={css.time}>{moment(this.props.time).fromNow()}</div>
                        </div>
                        <div className={css.content} onClick={this.props.onClick}>
                            <span>{this.props.content}</span>
                        </div>
                        <div className={css.footer}>
                            <div>
                                <button className={css['footer-button']} onClick={this.notImplemented}>
                                    <div className={css['footer-button-icon-container']}>
                                        <Icon className={css['footer-button-icon']} type="message" />
                                    </div>
                                    {/* <span className={css['footer-button-count']}>251</span> */}
                                </button>
                            </div>
                            <div>
                                <Popconfirm
                                    title="Retweet this tweet?"
                                    placement="leftTop"
                                    okText="Retweet"
                                    cancelText="Cancel"
                                    onConfirm={() => this.onRetweet(this.props.idForRetweet)}
                                    icon={<Icon type="question-circle-o" />}
                                >
                                    <button className={css['footer-button']}>
                                        <div className={css['footer-button-icon-container']}>
                                            <Icon className={css['footer-button-icon']} type="retweet" />
                                        </div>
                                        {
                                            this.props.numRetweet > 0 && <span className={css['footer-button-count']}>{this.props.numRetweet}</span>
                                        }
                                    </button>
                                </Popconfirm>
                            </div>
                            <div>
                                <button className={css['footer-button']} onClick={this.notImplemented}>
                                    <div className={css['footer-button-icon-container']}>
                                        <Icon className={css['footer-button-icon']} type="heart" />
                                    </div>
                                    {/* <span className={css['footer-button-count']}>251</span> */}
                                </button>
                            </div>
                            <div>
                                <button className={css['footer-button']} onClick={this.notImplemented}>
                                    <div className={css['footer-button-icon-container']}>
                                        <Icon className={css['footer-button-icon']} type="upload" />
                                    </div>
                                    {/* <span className={css['footer-button-count']}>251</span> */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Tweet.propTypes = {
    idForRetweet: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string,
    retweetedBy: PropTypes.string,
    numRetweet: PropTypes.number,
    onClick: PropTypes.func,
}

Tweet.defaultProps = {
    numRetweet: 0,
    onClick: () => {},
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
    increaseRetweet: (tweetID) => dispatch(TopTweetsAction.increaseRetweet(tweetID)),
    addError: (error) => dispatch(MessageAction.addError(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tweet)