import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import { useState } from 'react'
import { useEffect } from 'react'
import GetAvgRating from '../../../utils/avgRating'
import { getAvgRatingReviews } from '../../../services/operations/courseDetailsAPI'

const Course_card = ({course,height}) => {

  const [avgRating,setAvgRating] = useState(0);

  useEffect(() => {
    // get ratings by calling api
    console.log("INSIDE GetAvgRating1",course?.ratingAndReviews)
    const res = GetAvgRating(course?.ratingAndReviews);
    console.log("INSIDE GetAvgRating2",course?.ratingAndReviews);
    setAvgRating(res);
    console.log("wfwfwf",avgRating);
  },[course]);

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img src={course?.thumbnail} alt="thumbnail" className={`${height} w-full object-cover rounded-xl`}/>
                </div>

                <div className="flex flex-col gap-2 px-1 py-3">
                  <p className="text-xl text-richblack-5">{course?.courseName}</p>
                  <p className="text-sm text-richblack-50">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                  <div className='flex gap-x-2 items-center'>
                    <span className="text-yellow-5">{avgRating || 0}</span>
                    <RatingStars review_count={avgRating}/>
                    <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                  </div>
                  <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_card