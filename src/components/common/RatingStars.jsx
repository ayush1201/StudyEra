import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {TiStarFullOutline, TiStarHalfOutline, TiStarOutline} from "react-icons/ti"

const RatingStars = ({review_count,star_size}) => {

    const [starCount,setStarCount] = useState({
        full:0,
        half:0,
        empty:0
    })

    useEffect(() => {
        const wholeStars = Math.floor(review_count) || 0;
        setStarCount({
            full:wholeStars,
            half:Number.isInteger(review_count) ? 0 : 1,
            empty:Number.isInteger(review_count) ? 5-wholeStars : 4-wholeStars,
        })
    },[review_count]);

  return (
    <div className="flex gap-1 text-yellow-100">
        {
            [...new Array(starCount.full)].map((_,i) => {
                return <TiStarFullOutline key={i} width={star_size || 20}/>
            })
        }
        {
            [...new Array(starCount.half)].map((_,i) => {
                return <TiStarHalfOutline key={i} width={star_size || 20}/>
            })
        }
        {
            [...new Array(starCount.empty)].map((_,i) => {
                return <TiStarOutline key={i} width={star_size || 20}/>
            })
        }
    </div>
  )
}

export default RatingStars