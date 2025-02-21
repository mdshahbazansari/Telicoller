import React, { useContext, useState } from 'react'
import {
  AlignLeftOutlined,
  AlignRightOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneFilled,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Tag, theme } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import Context from '../../utils/Context'
const { Header, Sider, Content } = Layout

const item = [
  {
    key: 'dashboard',
    icon: <AppstoreOutlined className='!font-semibold !text-2xl' />,
    label: <Link to='/app/dashboard'>Dashboard</Link>,
  },
  {
    key: 'customers',
    icon: <TeamOutlined className='!font-semibold !text-2xl' />,
    label: <Link to='/app/customers'>Customers</Link>,
  },
  {
    key: 'addCustomers',
    icon: <UsergroupAddOutlined className='!font-semibold !text-2xl' />,
    label: <Link to='/app/addCustomer'>Add Customers</Link>,
  },
  {
    key: 'call & logs',
    icon: <PhoneFilled className='!font-semibold !text-2xl' />,
    label: <Link to='/app/logs'>Call & Logs</Link>,
  },
]
const AppLayout = () => {
  const { session, setSession } = useContext(Context)

  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout className='!min-h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed} width={240}>
        <div className='demo-logo-vertical flex flex-col items-center my-6'>
          <Avatar size={60} className='!bg-orange-200 !mb-4'>
            <UserOutlined className='text-2xl !text-black' />
          </Avatar>
          <h1 className='text-xl !text-white !font-semibold'>
            {session.fullname}
          </h1>
          <h1 className='text-base text-gray-400'>{session.email}</h1>
          <Tag color='red' className='!px-4 !mt-1 !font-semibold !text-black'>
            {session ? 'user':'Login first'}
          </Tag>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={item}
          className='!text-[16px] !font-semibold !space-y-4'
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <AlignRightOutlined /> : <AlignLeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '24px',
              width: 64,
              height: 70,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default AppLayout
