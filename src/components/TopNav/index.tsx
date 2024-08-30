import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UploadOutlined, HeartFilled } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;

export const TopNav = () => {

    const pathname = usePathname();


    const getSelectedKey = () => {
        if (pathname === '/') {
            return 'home';
        } else if (pathname === '/upload') {
            return 'upload';
        } else if (pathname === '/favourites') {
            return 'favourites';
        }
        return '';
    };
    
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu theme="dark" mode="horizontal" selectedKeys={[getSelectedKey()]}>
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
