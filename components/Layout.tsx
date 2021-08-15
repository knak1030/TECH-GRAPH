import React, { ReactNode } from 'react'
React.useLayoutEffect = React.useEffect
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { Menu, Layout as AntLayout } from 'antd';
const { Header, Content, Footer } = AntLayout;
import { SmileOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title'} : Props) => (
  <>
    <AntLayout className="layout">
      <Head>
        <title>{title} | TECH TREE and the SUN</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header style={{ background: 'transparent' }}>
        <Menu selectedKeys={[useRouter().asPath.replace('/', '')]} theme="light" mode="horizontal" style={{ background: 'transparent' }}>
          <Menu.Item key="">
            <Link href="/">
              <a>Graph</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="relation">
            <Link href="/relation">
              <a>Relation</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link href="/about">
              <a>About</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ overflow: 'hidden', background: '#ffffff' }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <hr />
        <span>TECH TREE and the SUN <SmileOutlined rotate={180} /></span>
      </Footer>
    </AntLayout>
  </>
)

export default Layout
