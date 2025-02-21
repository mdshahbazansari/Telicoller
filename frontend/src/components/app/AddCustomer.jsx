import { Button, Form, Input, message, Upload } from 'antd'
import React from 'react'
import axios from 'axios'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'

axios.defaults.baseURL = 'https://telicoller-backend.onrender.com'

const AddCustomer = () => {
  const [form] = Form.useForm()
  const { Dragger } = Upload

  const addCustomer = async (values) => {
    try {
      const updatedData = await form.validateFields()
      await axios.post('/api/customers', updatedData)
      message.success('Customer created')
    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://telicoller-backend.onrender.com/api/customers/read-file',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <div className=' grid grid-cols-2 items-center justify-between'>
      <div className='w-10/12'>
        <Form
          name='addCustomer'
          layout='vertical'
          form={form}
          onFinish={() => addCustomer()}
        >
          <Form.Item
            name='fullname'
            label='Full Name'
            rules={[
              { required: true, message: 'Please enter Customer name !' },
            ]}
          >
            <Input placeholder='Customer name' />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Please enter Customer email !' },
            ]}
          >
            <Input placeholder='Customer email' />
          </Form.Item>
          <Form.Item
            name='mobile'
            label='Mobile'
            rules={[
              { required: true, message: 'Please enter Customer mobile !' },
            ]}
          >
            <Input placeholder='Customer Mobile' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='bg-blue-500'>
              Add Customer
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className='flex items-center justify-center h-full w-full'>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to Import XLSX File to upload
          </p>
          <p className='ant-upload-hint'>Import Customer's || CSV file</p>
        </Dragger>
      </div>
    </div>
  )
}

export default AddCustomer
