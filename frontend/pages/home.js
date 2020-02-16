import React, {PureComponent} from 'react'
import Link from 'next/link'
import { Layout, Menu, Button, Icon, Drawer, Typography } from 'antd';
import {storeToken, withAuthSync} from '../utils/auth'
import Tweet from '../components/Tweet'
import TweetEditor from '../components/TweetEditor'
const { Header, Content } = Layout;

class Home extends PureComponent {
    tweets = [
        {
            id: "123121",
            content: "hello1",
            owner: "hieudeptrai",
            numRetweet: 0,
            created_at: new Date(1581746400),
        },
        {
            id: "123122",
            content: "hello2",
            owner: "hieudeptrai",
            numRetweet: 0,
            created_at: new Date(1581750000),
        },
        {
            id: "123122",
            content: "hello2",
            owner: "hieudeptrai",
            numRetweet: 0,
            created_at: new Date(1581750000),
        },
        {
            id: "123122",
            content: "hello2",
            owner: "hieudeptrai",
            numRetweet: 0,
            created_at: new Date(1581750000),
        },
    ]
    render() {
        return (
            <div style={{maxWidth: 600, margin: "50px auto"}}>
                <TweetEditor/>
                {
                    this.tweets.map((tweet, i) => (
                        <Tweet key={i}/>
                    ))
                }
            </div>
        )
    }
}

export default withAuthSync(Home);