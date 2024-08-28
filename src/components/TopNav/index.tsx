import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UploadOutlined, HeartFilled } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout;

export const TopNav = () => {
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link href="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="upload" icon={<UploadOutlined />}>
                        <Link href="/upload">Upload</Link>
                    </Menu.Item>
                    <Menu.Item key="favourites" icon={<HeartFilled />}>
                        <Link href="/favourites">Favourites</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        </Layout>
    );
};
