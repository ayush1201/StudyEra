import React from 'react'
import { BsFillCaretRightFill } from 'react-icons/bs';
import { FaShareSquare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { addToCart } from '../../../slices/cartSlice';
import ConfirmationModal from '../../common/ConfirmationModal';

const CourseDetailsCard = ({course,setConfirmationModalData,handleBuyCourse}) => {

    const {
        thumbnail:ThumbnailImage,
        price:Price,
    } = course;

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = async() => {
        if(user && user?.accountType === "Instructor"){
            toast.error("You cannot buy the course");
            return;
        }
        if (token) {
            console.log("DISPATCHING COURSE....");
            dispatch(addToCart(course))
            return;
        }
        setConfirmationModalData({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModalData(null),
          })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

  return (
    <div className='flex flex-col font-inter w-[400px]'>
        <img src={ThumbnailImage} alt="" 
            className='max-h-[300px] min-h-[180px] w-[400px] rounded-t-lg'
        />

        <div className='p-[24px] bg-richblack-700 rounded-b-lg flex flex-col gap-[16px]'>
            <p className='text-richblack-5 font-bold text-[30px] leading-[38px]'>Rs. {Price}</p>

            <div className='flex flex-col gap-[12px]'>
                <button onClick={user && course?.studentsEndrolled.some((student) => student._id === user._id) ? () => navigate("/dashboard/enrolled-courses")
                : () => handleBuyCourse()} 
                className='rounded-lg bg-yellow-50 px-[24px] py-[12px]'>
                    <div className='text-[16px] leading-[24px] font-medium text-richblack-900'>
                        {
                            user && course?.studentsEndrolled.some((student) => student._id === user._id) ? "Go to Course" : "Buy Now"
                        }
                    </div>
                    
                </button>

                {
                    user && !course?.studentsEndrolled.some((student) => student._id === user._id) && (
                        <button className='rounded-lg bg-richblack-800 px-[24px] py-[12px] w-full' onClick={() => handleAddToCart()}>
                            <p className='text-[16px] leading-[24px] font-medium text-richblack-5'>Add to cart</p>
                        </button>
                    )
                }


            </div>

            <div>
                <p className=" pt-6 text-center text-sm text-richblack-25">
                    30-Day Money-Back Guarantee
                </p>
            </div>

            <div className={``}>
                <p className={`my-2 text-xl font-semibold `}>
                    This Course Includes :
                </p>
                <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                {course?.instructions?.map((item, i) => {
                    return (
                    <p className={`flex gap-2 items-center`} key={i}>
                        <BsFillCaretRightFill />
                        <span>{item}</span>
                    </p>
                    )
                })}
                </div>
            </div>
            <div className="text-center">
                <button
                className="mx-auto flex items-center gap-2 py-2 text-yellow-100 "
                onClick={() => handleShare()}
                >
                <FaShareSquare size={15} /> Share
                </button>
            </div>
        </div>
        
    </div>

    
  )
}

export default CourseDetailsCard