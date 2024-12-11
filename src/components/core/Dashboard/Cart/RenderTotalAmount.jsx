import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {

    const {total,cart} = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleCoursePayment(){
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses...",courses);

        // API TODO payment gateway 
        buyCourse(token,courses,user,navigate,dispatch);
    }

  return (
    <div className='bg-richblack-800 border border-richblack-700 rounded-lg p-[24px] min-w-[280px]'>
        <div className='flex flex-col gap-[16px]'>
            <p className='text-sm font-semibold text-richblack-200'>Total:</p>
            <p className='text-yellow-50 font-semibold text-[24px] leading-[32px]'>Rs.{total}</p>
            <IconBtn onclick={handleCoursePayment} 
            text={"Buy Now"}
            customClasses={"text-center font-bold"}>
            </IconBtn>
        </div>
    </div>
  )
}

export default RenderTotalAmount