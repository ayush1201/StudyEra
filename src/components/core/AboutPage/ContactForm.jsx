import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactForm = () => {
  return (
    <div className='flex flex-col gap-5 text-richblack-25 lg:w-[600px] font-inter'>
        <h1 className='mx-auto text-4xl leading-[44px] font-semibold text-richblack-5'>Get in Touch</h1>
        <p className='mx-auto leading-[24px] text-richblack-300 font-medium'>We’d love to here for you, Please fill out this form.</p>
        <ContactUsForm/>
    </div>
  )
}

export default ContactForm