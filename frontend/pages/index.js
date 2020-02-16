import React, {PureComponent} from 'react'
import Link from 'next/link'
import { Form, Input, Button, Icon, Typography } from 'antd';
const { Title } = Typography;
import css from '../assert/styles/index.scss'
import {storeToken, withAuthRedirect} from '../utils/auth'

class Home extends PureComponent {
    state = {
        username: ""
    }

    onChangeUsername = e => {
        this.setState({username: e.target.value});
    }

    onClickSignin = () => {
        if (this.state.username=="") {
            return
        }

        storeToken({token: this.state.username})
    }

    render() {
        return (
            <div className={css.container}>
                <Icon className={css.logo} type="twitter" />
                <Title className={css.title} level={1}>Log in to Twitter</Title>
                <Form layout="vertical" className={css['login-form']}>
                    <Form.Item>
                        <Input
                            size="large"
                            placeholder="Choose a username..."
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            onPressEnter={this.onClickSignin}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            htmlType="submit"
                            className={css['login-button']}
                            onClick={this.onClickSignin}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withAuthRedirect(Home);