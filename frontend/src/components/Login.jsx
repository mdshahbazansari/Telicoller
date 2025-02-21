import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

axios.defaults.baseURL = 'https://telicoller-backend.onrender.com'

const { Title } = Typography

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (values) => {
    setLoading(true)
    try {
      await axios.post('/api/user/login', values, { withCredentials: true })
      message.success('Login successful!')
      navigate('/app/dashboard')
    } catch (error) {
      message.error('Invalid email or password', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <Card className='w-96 shadow-lg rounded-lg p-6'>
        <Title level={3} className='text-center'>
          Login
        </Title>
        <Form
          name='login'
          onFinish={login}
          layout='vertical'
          requiredMark={true}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email!' },
            ]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              { required: true, message: 'Please enter your password!' },
              // { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password placeholder='Enter your password' />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              block
              loading={loading}
              className='bg-blue-500'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p>Dont have an account <Link to='/signup'>Signup</Link></p>
      </Card>
    </div>
  )
}

export default Login
