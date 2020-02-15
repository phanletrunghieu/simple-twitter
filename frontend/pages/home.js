import React, {PureComponent} from 'react'
import Link from 'next/link'
import { Layout, Menu, Button, Icon, Drawer, Typography } from 'antd';
const { Header, Content } = Layout;

class Home extends PureComponent {
    render() {
        return (
            <>
                <Link href="/">Index</Link>
            </>
        )
    }
}

export default Home;