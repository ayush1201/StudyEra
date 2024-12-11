import React from 'react'

const HighlightText = ({text}) => {
  return (
    <div>
    {/* add gradient in span tag */}
        <span className='font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text inline-block text-transparent'>
            {" "}
            {text}
        </span>
    </div>
  )
}

export default HighlightText