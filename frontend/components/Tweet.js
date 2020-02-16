import React, { Component } from 'react'
import {Icon, message, Popconfirm} from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import defaultAvatar from '../assert/images/default_profile_400x400.png'
import css from '../assert/styles/component/tweet.scss'

export default class Tweet extends Component {
    notImplemented = () => {
        message.error("Not implemented")
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
                        <div className={css.head}>
                            <div className={css.username}>{this.props.username}</div>
                            <div className={css.time}>{moment(this.props.time).fromNow()}</div>
                        </div>
                        <div className={css.content}>
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
                                    onConfirm={this.props.onRetweet}
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
    username: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    content: PropTypes.string,
    retweetedBy: PropTypes.string,
    numRetweet: PropTypes.number,
    onRetweet: PropTypes.func,
}

Tweet.defaultProps = {
    numRetweet: 0,
    onRetweet: () => {},
}