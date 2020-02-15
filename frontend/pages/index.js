import React, {PureComponent} from 'react'
import Link from 'next/link'
import { Layout, Menu, Button, Icon, Drawer, Typography } from 'antd';
const { Header, Content } = Layout;

class Home extends PureComponent {
    render() {
        return (
            <>
                <Link href="/home">Home</Link>
            </>
        )
    }
}

export default Home;