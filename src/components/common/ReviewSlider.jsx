import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"
import {Swiper, SwiperSlide} from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {ratingEndpoints} from "../../services/apis"
import { apiConnector } from '../../services/apiconnector';
import { GiNinjaStar } from 'react-icons/gi';

const ReviewSlider = () => {

    const [reviews,setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchRating = async() => {
           const res = await apiConnector("GET",ratingEndpoints.GETREVIEW_RATING_API);
           console.log("REVIEW DATA>>>>",res?.data);

           const {data} = res;
           if(res.data.success){
            setReviews(data.data);
           }

           console.log("ALL REVIEWS......",reviews);
        }
        fetchRating();
    },[]);

  return (
    <div className='text-white'>
        <div className='my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent'>
            <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay:2500,
            }}
            modules={[Autoplay,FreeMode,Pagination]}
            className='w-full'
            >
                {
                    reviews?.map((review,ind) => (
                        
                        <SwiperSlide key={ind}>
                            <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                                <div className='flex items-center gap-x-3'>
                                    <img src={review?.user?.image ? review?.user?.image : 
                                    `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`} 
                                    alt="Profile pic" 
                                        className='w-9 h-9 object-cover rounded-full'
                                    />
                                    <div className='flex flex-col'>
                                        <p className='font-semibold text-richblack-5'>{`${review.user.firstName}`} {`${review.user.lastName}`}</p>
                                        <p className='text-[12px] font-medium text-richblack-500'>{`${review.user.email}`}</p>
                                    </div>
                                </div>

                                <p className="font-medium text-richblack-25">
                                    {review?.reviews.split(" ").length > truncateWords
                                    ? `${review?.reviews
                                        .split(" ")
                                        .slice(0, truncateWords)
                                        .join(" ")} ...`
                                    : `${review?.reviews}`}
                                </p>

                                <div className='flex items-center gap-2'>
                                    <p className='font-semibold text-yellow-100'>{review?.rating.toFixed(1)}</p>
                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        fullIcon={<GiNinjaStar/>}
                                        emptyIcon={<GiNinjaStar/>}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"

                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider