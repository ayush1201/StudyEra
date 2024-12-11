import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {GiNinjaStar} from "react-icons/gi"
import { RiDeleteBinLine } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/cartSlice';


const RenderCartCourse = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col">
        {
            cart.map((course,ind) => {
                return(
                    <div key={course._id}
                    className={`px-[24px] flex items-start gap-x-5 ${ind !== cart.length-1 && "border-b border-b-richblack-400 pb-6"} ${ind !== 0 && "mt-6"}`}>
                        <div className='flex flex-1 items-center flex-col xl:flex-row gap-4'>
                            <div className='w-[220px] h-[148px]'>
                                <img src={course?.thumbnail} alt="" className='rounded-lg object-cover'/>
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <p className="text-lg font-medium text-richblack-5">{course.courseName}</p>
                                <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                                <div className='flex items-center gap-x-2'>
                                    <span className='text-yellow-5'>4.8</span>
                                    <ReactStars
                                        count={5}
                                        value={course?.ratingAndReviews?.rating}
                                        edit={false}
                                        size={20}
                                        activeColor={"#ffd700"}
                                        fullIcon={<GiNinjaStar/>}
                                        emptyIcon={<GiNinjaStar/>}
                                        
                                    />
                                    <span className="text-richblack-400">({course?.ratingAndReviews.length} Ratings)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-[20px]'>
                            <button className='rounded-lg border border-richblack-700 bg-richblack-800 flex items-center p-[12px] gap-[8px] text-pink-200' onClick={() => dispatch(removeFromCart(course._id))}>
                                <RiDeleteBinLine className='text-[18px]'/>
                                <p className='text-[16px] leading-[24px] font-medium'>Remove</p>
                            </button>
                            <p className='text-yellow-50 font-semibold text-[24px] leading-[32px]'>Rs. {course?.price}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default RenderCartCourse