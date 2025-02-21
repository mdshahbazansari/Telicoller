import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

axios.defaults.baseURL = 'https://telicoller-backend.onrender.com'

const { Title } = Typography

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signup = async (values) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/user/signup', values)
      message.success('Signup successful!')
      navigate('/login')
    } catch (error) {
      message.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card className='w-96 shadow-lg rounded-lg p-6'>
        <Title level={3} className='text-center !py-2'>
          Signup
        </Title>
        <Form
          name='signup'
          onFinish={signup}
          layout='vertical'
          requiredMark={false}
        >
          <Form.Item
            label='Full Name'
            name='fullname'
            rules={[
              { required: true, message: 'Please enter your full name!' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='Enter your name' />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            label='Mobile Number'
            name='mobile'
            rules={[
              { required: true, message: 'Please enter your mobile number!' },
            ]}
          >
            <Input placeholder='Enter your mobile number' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              { required: true, message: 'Please enter your password!' },
              { min: 3, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Enter your password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              loading={loading}
              className='bg-blue-500 !font-semibold'
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
        <p className='text-base px-2'>
          Already have an account{' '}
          <Link to='/login' className='font-semibold'>
            Login
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default Signup
