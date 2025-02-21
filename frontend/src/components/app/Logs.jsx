import React, { useEffect, useState } from 'react'
import { Table, Tag } from 'antd'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

const Logs = () => {
  const [loading, setLoading] = useState(true)

  const { data, error, isLoading } = useSWR('/api/call-logs', fetcher)

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customer',
      render: (_, item) => <div>{item.customer.fullname}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, item) => (
        <Tag color='blue' className='!font-semibold'>
          {item.status}
        </Tag>
      ),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'FpllowUp',
      dataIndex: 'followup',
      key: 'followup',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Start Time',
      dataIndex: 'startAt',
      key: 'startAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'End Time',
      dataIndex: 'endAt',
      key: 'endAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey='fullname'
      loading={isLoading}
    />
  )
}

export default Logs
