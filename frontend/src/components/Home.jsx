import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import { PhoneOutlined, PlayCircleOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

const Home = () => {

  return (
    <div className='bg-[#0A1931] text-white'>
      <header className='flex justify-between items-center px-8 py-6 bg-opacity-90'>
        <h1 className='text-3xl font-bold'>Teli-Coller</h1>
        <nav>
          <ul className='flex space-x-6'>
            <li>
              <a href='#' className='hover:text-blue-400'>
                About Us
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-400'>
                Services
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-400'>
                Help Center
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-400'>
                Contact Us
              </a>
            </li>
            <li>
              <Link href='/app' className='hover:text-blue-400 font-semibold'>
                App
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-5 bg-[url('/hero-bg.jpg')] bg-cover">
        <h1 className='text-4xl md:text-6xl font-bold'>
          Good For Our Customer Experience
        </h1>
        <p className='mt-4 text-lg max-w-2xl mx-auto'>
          We are the unique set-up, ready to tackle global problems like
          unemployment.
        </p>
        <Button type='primary' shape='round' size='large' className='mt-6'>
          More About Us
        </Button>
      </section>

      {/* Features Section */}
      <section className='py-16 px-5'>
        <h2 className='text-center text-3xl font-semibold'>
          Seamless Bond of Better Customer Satisfaction
        </h2>
        <div className='grid md:grid-cols-4 gap-6 mt-10 max-w-5xl mx-auto'>
          {[
            'We Deliver Excellence',
            'Policies & Collection',
            'Awesome Team',
            '24/7 We Work',
          ].map((feature, index) => (
            <Card
              key={index}
              className='bg-[#12274D] text-white border-none p-6'
            >
              <h3 className='text-lg font-bold'>{feature}</h3>
              <p className='mt-2 text-sm'>
                The many variations of services help your business to grow
                efficiently.
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className='py-30 px-5 bg-[#12274D]'>
        <h2 className='text-center text-3xl font-semibold'>
          Let’s Do Support Business First Class Quality
        </h2>
        <p className='text-center py-4 justify-center w-7/12 mx-auto'>
          Create free hiring telecaller flyers, posters, social media graphics
          and videos in minutes. Choose from 9710+ eye-catching templates to wow
          your audience.
        </p>
        <div className='grid md:grid-cols-4 gap-6 mt-10 max-w-5xl mx-auto'>
          {[
            'Call Center',
            'Debt Collection',
            'Inbound Requests',
            'Customer Support',
          ].map((service, index) => (
            <Card
              key={index}
              className='bg-[#0A1931] text-white border-none p-6'
            >
              <h3 className='text-lg font-bold'>{service}</h3>
              <p className='mt-2 text-sm'>
                Offering seamless and efficient services to meet your needs.
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-16 px-5'>
        <h2 className='text-center text-3xl font-semibold'>
          What Our Clients Say About Us
        </h2>
        <div className='grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto'>
          {['Shahbaz', 'Aamir', 'Ranjeet', 'Shahbaz', 'Aamir'].map(
            (name, index) => (
              <Card
                key={index}
                className='bg-[#12274D] text-white border-none p-6'
              >
                <p className='text-sm'>
                  "Great service and outstanding support. Highly recommend!"
                </p>
                <h3 className='mt-4 font-bold'>{name}</h3>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-10 px-5 bg-[#0A1931] text-center'>
        <h2 className='text-3xl font-semibold'>
          Needs Experienced Call Center Services?
        </h2>
        <p className='mt-2 max-w-2xl mx-auto'>
          We provide the best solutions to accelerate your business.
        </p>
        <Button type='primary' shape='round' size='large' className='mt-6'>
          Get Started <PhoneOutlined />
        </Button>
      </section>

      {/* Footer */}
      <footer className='py-6 text-center bg-[#12274D]'>
        <p>&copy; 2024 SF-Pro. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
