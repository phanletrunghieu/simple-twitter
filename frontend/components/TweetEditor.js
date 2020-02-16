import React, { Component } from 'react'
import {Button} from 'antd'
import ContentEditable from 'react-contenteditable'
import defaultAvatar from '../assert/images/default_profile_400x400.png'
import css from '../assert/styles/component/tweet-editor.scss'

export default class TweetEditor extends Component {
    state = {
        html: ""
    }

    handleContentEditableChange = evt => {
        this.setState({html: evt.target.value});
    };

    render() {
        return (
            <div className={css.container}>
                <div className={css.left}>
                    <img className={css.avatar} src={defaultAvatar}/>
                </div>
                <div className={css.right}>
                    <ContentEditable
                        className={css.editor}
                        disabled={false}
                        html={this.state.html}
                        onChange={this.handleContentEditableChange}
                        placeholder="What’s happening?"
                    />
                    <div className={css.footer}>
                        <Button
                            className={css['tweet-button']}
                            type="primary"
                            shape="round"
                            size="large"
                            style={{opacity: this.state.html == "" ? 0.5 : 1}}
                        >
                            Tweet
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
