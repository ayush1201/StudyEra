import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import Course_card from './Course_card'
import {Autoplay, Navigation, Pagination} from "swiper/modules"


const CourseSlider = ({courses}) => {
  return (
    <div>
      {
        courses?.length > 0 ? (
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={200}
            pagination={true}
            modules={[Autoplay,Pagination,Navigation]}
            className="max-h-[30rem]"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
                1024:{slidesPerView:3,}
            }}
            >
            {
              courses.map((course,index) => (
                <SwiperSlide key={index}>
                  <Course_card course={course} height={"h-[250px]"}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : (
          <p>No Course Found</p>
        )
      }
    </div>
  )
}

export default CourseSlider