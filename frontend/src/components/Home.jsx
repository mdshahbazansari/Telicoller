import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import { PhoneOutlined, PlayCircleOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import axios from 'axios'

axios.defaults.baseURL = 'https://telicoller-backend.onrender.com'

const Home = () => {
  return (
    <div className='bg-[#0A1931] text-white min-h-screen'>
      {/* Header */}
      <header className='flex flex-col md:flex-row justify-between items-center px-6 md:px-8 py-6 bg-opacity-90'>
        <h1 className='text-2xl md:text-3xl font-bold'>Teli-Coller</h1>
        <nav className='w-full md:w-auto mt-4 md:mt-0'>
          <ul className='flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6'>
            {['About Us', 'Services', 'Help Center', 'Contact Us'].map(
              (item, index) => (
                <li key={index}>
                  <Link href='#' className='hover:text-blue-400 !text-white'>
                    {item}
                  </Link>
                </li>
              )
            )}
            <li className='border-1 px-4 py-2 rounded bg-blue-500 !text-white'>
              <Link href='/login' className='font-semibold !text-base !text-white'>
                Login
              </Link>
            </li>
            <li>
              <Link href='/app' className='hover:text-blue-400 !font-semibold !text-base'>
                App
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-5 bg-cover bg-center bg-[url('/hero-bg.jpg')]">
        <h1 className='text-3xl md:text-5xl font-bold'>Good For Our Customer Experience</h1>
        <p className='mt-4 text-base md:text-lg max-w-lg mx-auto'>
          We are the unique set-up, ready to tackle global problems like unemployment.
        </p>
        <Button type='primary' shape='round' size='large' className='mt-6'>
          More About Us
        </Button>
      </section>

      {/* Features Section */}
      <section className='py-10 px-5'>
        <h2 className='text-center text-2xl md:text-3xl font-semibold'>Seamless Bond of Better Customer Satisfaction</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto'>
          {['We Deliver Excellence', 'Policies & Collection', 'Awesome Team', '24/7 We Work'].map((feature, index) => (
            <Card key={index} className='bg-[#12274D] text-white border-none p-6'>
              <h3 className='text-lg font-bold'>{feature}</h3>
              <p className='mt-2 text-sm'>
                The many variations of services help your business to grow efficiently.
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className='py-10 px-5 bg-[#12274D]'>
        <h2 className='text-center text-2xl md:text-3xl font-semibold'>Let’s Do Support Business First Class Quality</h2>
        <p className='text-center py-4 max-w-lg mx-auto text-base md:text-lg'>
          Create free hiring telecaller flyers, posters, social media graphics, and videos in minutes.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto'>
          {['Call Center', 'Debt Collection', 'Inbound Requests', 'Customer Support'].map((service, index) => (
            <Card key={index} className='bg-[#0A1931] text-white border-none p-6'>
              <h3 className='text-lg font-bold'>{service}</h3>
              <p className='mt-2 text-sm'>Offering seamless and efficient services to meet your needs.</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-10 px-5'>
        <h2 className='text-center text-2xl md:text-3xl font-semibold'>What Our Clients Say About Us</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto'>
          {['Shahbaz', 'Aamir', 'Ranjeet', 'Shahbaz', 'Aamir'].map((name, index) => (
            <Card key={index} className='bg-[#12274D] text-white border-none p-6'>
              <p className='text-sm'>"Great service and outstanding support. Highly recommend!"</p>
              <h3 className='mt-4 font-bold'>{name}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-10 px-5 bg-[#0A1931] text-center'>
        <h2 className='text-2xl md:text-3xl font-semibold'>Needs Experienced Call Center Services?</h2>
        <p className='mt-2 max-w-lg mx-auto text-base md:text-lg'>
          We provide the best solutions to accelerate your business.
        </p>
        <Button type='primary' shape='round' size='large' className='mt-6'>
          Get Started <PhoneOutlined />
        </Button>
      </section>

      {/* Footer */}
      <footer className='py-6 text-center bg-[#12274D]'>
        <p>&copy; 2025 searchandsolve.tech. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
