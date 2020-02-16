import React, { Component } from 'react'
import {Icon} from 'antd'
import defaultAvatar from '../assert/images/default_profile_400x400.png'
import css from '../assert/styles/component/tweet.scss'

export default class Tweet extends Component {
    render() {
        return (
            <div className={css.container}>
                <div className={css.left}>
                    <img className={css.avatar} src={defaultAvatar}/>
                </div>
                <div className={css.right}>
                    <div className={css.head}>
                        <div className={css.username}>Discovery</div>
                        <div className={css.time}>44m</div>
                    </div>
                    <div className={css.content}>
                        <span>Saturn may be the most famous celestial object sporting a flashy ring, but planets aren’t the only ones accessorizing. Entire galaxies, too, can have massive rings encircling them.</span>
                    </div>
                    <div className={css.footer}>
                        <div>
                            <button className={css['footer-button']}>
                                <Icon className={css['footer-button-icon']} type="message" />
                            </button>
                        </div>
                        <div>
                            <button className={css['footer-button']}>
                                <Icon className={css['footer-button-icon']} type="retweet" />
                            </button>
                        </div>
                        <div>
                            <button className={css['footer-button']}>
                                <Icon className={css['footer-button-icon']} type="heart" />
                            </button>
                        </div>
                        <div>
                            <button className={css['footer-button']}>
                                <Icon className={css['footer-button-icon']} type="upload" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
