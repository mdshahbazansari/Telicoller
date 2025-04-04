import React, { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import fetcher from '../../utils/fetcher'
import {
  Button,
  message,
  Popover,
  Skeleton,
  Table,
  Typography,
  DatePicker,
  Form,
  Input,
  Select,
  FloatButton,
} from 'antd'

import {
  DeleteFilled,
  EditOutlined,
  PhoneFilled,
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  FileAddFilled,
  PlusOutlined,
  UsergroupAddOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  FileAddOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import AddCustomer from './AddCustomer'
import { Link } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'

axios.defaults.baseURL = 'https://telicoller-backend.onrender.com'

const { Title, Text } = Typography

const Customers = () => {
  const { data, error, isLoading } = useSWR('/api/customers', fetcher)

  const {
    data: logs,
    error: logsErr,
    isLoading: logsLoading,
  } = useSWR('/api/call-logs', fetcher)

  const [editingId, setEditingId] = useState(null)
  const [openPopoverId, setOpenPopoverId] = useState(null)
  const [callingText, setCallingText] = useState('Calling')
  const [form] = Form.useForm()

  useEffect(() => {
    let index = 0
    const texts = ['Calling', 'Calling.', 'Calling..', 'Calling...']
    const interval = setInterval(() => {
      setCallingText(texts[index])
      index = (index + 1) % texts.length
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleEdit = (customer) => {
    setEditingId(customer._id)
    form.setFieldsValue(customer)
  }

  const handleDelete = (id) => {
    axios.delete(`/api/customers/${id}`)
    message.success('customer deleted !')
    mutate('/api/customers')
  }

  const handleSave = async (customerId) => {
    try {
      const updatedData = await form.validateFields()
      await axios.put(`/api/customers/${customerId}`, updatedData)
      message.success('Customer updated !')
      setEditingId(null)
      mutate('/api/customers')
    } catch (error) {
      message.error('Failed to update customer')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleOpenChange = (newOpen, customerId) => {
    setOpenPopoverId(newOpen ? customerId : null)
  }

  const endCall = async () => {
    try {
      const values = await form.validateFields()

      if (values.followup) {
        values.followup = new Date(values.followup.$d)
      }

      values.customer = openPopoverId
      await axios.post(`/api/call-logs`, values, {
        headers: { 'Content-Type': 'application/json' },
      })

      message.success('Call details saved!')
      setOpenPopoverId(null)
      form.resetFields()
    } catch (error) {
      console.error(
        '❌ Error while saving call details:',
        error.response?.data || error.message
      )
      message.error('Failed to save call details!')
    }
  }

  const endCallUpdate = async () => {
    try {
      const values = await form.validateFields()

      if (values.followup) {
        values.followup = new Date(values.followup.$d)
      }

      values.customer = openPopoverId

      await axios.put(`/api/call-logs/${openPopoverId}`, values, {
        headers: { 'Content-Type': 'application/json' },
      })

      message.success('Call details Updated !')
      setOpenPopoverId(null)
      form.resetFields()
    } catch (error) {
      console.error(error.response?.data || error.message)
      message.error('Failed to save call details!')
    }
  }

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text, customer) =>
        editingId === customer._id ? (
          <Form.Item
            name='fullname'
            rules={[{ required: true, message: 'Required!' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          text
        ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, customer) =>
        editingId === customer._id ? (
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Required!' },
              { type: 'email', message: 'Invalid email!' },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          text
        ),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      render: (_, customer) => {
        const maskedMobile =
          customer.mobile && customer.mobile.length === 10
            ? `XXXX${customer.mobile.slice(-6)}`
            : customer.mobile // Ensures handling for invalid numbers

        return (
          <div className='flex items-center gap-2'>
            <Popover
              content={
                <div>
                  <div className='mb-2 border-b pb-2'>
                    <p className='font-semibold text-lg'>
                      <span className='font-medium'>Name:</span>{' '}
                      {customer.fullname}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Email:</span>{' '}
                      {customer.email}
                    </p>
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium'>Mobile:</span>{' '}
                      {maskedMobile}
                    </p>
                    <p className='text-sm font-medium mt-1'>
                      Status:{' '}
                      <span className='text-blue-500'>{callingText}</span>
                    </p>
                  </div>
                  <Form
                    form={form}
                    onFinish={() =>
                      openPopoverId ? endCall() : endCallUpdate()
                    }
                    layout='vertical'
                    className='w-60 p-2 rounded-md !space-y-3'
                  >
                    <Form.Item name='followup'>
                      <DatePicker
                        className='w-full'
                        placeholder='Select date'
                      />
                    </Form.Item>

                    <Form.Item name='notes'>
                      <TextArea rows={1} placeholder='Enter notes...' />
                    </Form.Item>

                    <Form.Item name='status'>
                      <Select placeholder='Select status'>
                        <Select.Option value='waiting'>Waiting</Select.Option>
                        <Select.Option value='not received'>
                          Not received
                        </Select.Option>
                        <Select.Option value='switched off'>
                          Switched Off
                        </Select.Option>
                        <Select.Option value='not reachable'>
                          Not reachable
                        </Select.Option>
                        <Select.Option value='called'>Called</Select.Option>
                      </Select>
                    </Form.Item>

                    <Button
                      danger
                      type='primary'
                      htmlType='submit'
                      icon={<PhoneFilled />}
                      className='w-full'
                    >
                      End Call
                    </Button>
                  </Form>
                </div>
              }
              title='Call Details'
              trigger='click'
              open={openPopoverId === customer._id}
              onOpenChange={(newOpen) =>
                handleOpenChange(newOpen, customer._id)
              }
            >
              <Button
                icon={<PhoneFilled />}
                className='!bg-blue-200 !text-blue-600 !text-xl'
              />
            </Popover>

            {editingId === customer._id ? (
              <Form.Item
                name='mobile'
                rules={[
                  { required: true, message: 'Required!' },
                  { pattern: /^[0-9]{10}$/, message: 'Invalid phone number!' },
                ]}
              >
                <Input />
              </Form.Item>
            ) : (
              <h1 className='text-base font-medium'>{maskedMobile}</h1>
            )}
          </div>
        )
      },
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) =>
        moment(createdAt).format('DD MMM YYYY, hh:mm').toLocaleString(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, customer) =>
        editingId === customer._id ? (
          <div className='flex gap-2'>
            <Button
              icon={<CheckOutlined />}
              type='primary'
              onClick={() => handleSave(customer._id)}
            />
            <Button icon={<CloseOutlined />} onClick={handleCancel} danger />
          </div>
        ) : (
          <div className='flex gap-2'>
            <Button
              className='!bg-green-200 !text-xl !text-green-800'
              icon={<EditFilled />}
              onClick={() => handleEdit(customer)}
            />
            <Button
              className='!bg-rose-200 !text-rose-600 !text-xl '
              icon={<DeleteFilled />}
              onClick={() => handleDelete(customer._id)}
            />
          </div>
        ),
    },
  ]

  if (isLoading) return <Skeleton active />

  return (
    <>
      <Form form={form} component={false}>
        <Table dataSource={data} columns={columns} rowKey='_id' Total={5} />
      </Form>
      <div className=''>
        <FloatButton.Group
          trigger='click'
          type='primary'
          style={{
            insetInlineEnd: 24,
          }}
          icon={<UsergroupAddOutlined />}
        >
          <FloatButton
            tooltip={
              <div>
                <Link
                  to='/app/addCustomer'
                  className='font-bold !text-white !rounded-xl'
                  type='primary'
                >
                  Add Customer
                </Link>
              </div>
            }
            icon={<UserAddOutlined />}
          />
          <FloatButton
            trigger='click'
            tooltip={<div>Import Customer</div>}
            icon={<FileAddOutlined />}
          />
        </FloatButton.Group>
      </div>
    </>
  )
}

export default Customers
