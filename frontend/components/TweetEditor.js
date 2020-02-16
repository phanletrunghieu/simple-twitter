import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Button, Progress} from 'antd'
import ContentEditable from 'react-contenteditable'
import defaultAvatar from '../assert/images/default_profile_400x400.png'
import css from '../assert/styles/component/tweet-editor.scss'

export default class TweetEditor extends PureComponent {
    state = {
        percent: 30,
    }

    handleContentEditableChange = evt => {
        this.props.onChange(evt.target.value)
    };

    componentWillReceiveProps({loading}){
        if (loading != this.props.loading && loading == true) {
            this.setState({percent: 30})
            setTimeout(() => {
                this.setState({percent: 50})
            }, 100);
            setTimeout(() => {
                this.setState({percent: 70})
            }, 200);
        }
    }

    render() {
        return (
            <div className={css.container}>
                {
                    this.props.loading && (
                        <Progress
                            className={css.progress}
                            percent={this.state.percent}
                            size="small"
                            showInfo={false}
                            status="active"
                        />
                    )
                }
                <div className={css['editor-container']}>
                    <div className={css.left}>
                        <img className={css.avatar} src={defaultAvatar}/>
                    </div>
                    <div className={css.right}>
                        <ContentEditable
                            className={css.editor}
                            disabled={false}
                            html={this.props.html}
                            onChange={this.handleContentEditableChange}
                            placeholder="What’s happening?"
                        />
                        <div className={css.footer}>
                            <Button
                                className={css['tweet-button']}
                                type="primary"
                                shape="round"
                                size="large"
                                style={{opacity: this.props.html == "" ? 0.5 : 1}}
                                onClick={this.props.onClickOK}
                            >
                                Tweet
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TweetEditor.propTypes = {
    loading: PropTypes.bool,
    html: PropTypes.string,
    onChange: PropTypes.func,
    onClickOK: PropTypes.func,
}

TweetEditor.defaultProps = {
    loading: false,
    html: "",
    onChange: (html) => {},
    onClickOK: () => {},
}