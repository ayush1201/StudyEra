import React from 'react'
import Button from './Button'
import HighlightText from './HighlightText'
import {AiOutlineArrowRight} from "react-icons/ai"
import { TypeAnimation } from 'react-type-animation';


const CodeBlocks = ({position,heading,subheading,button1,button2,codeblock,backgroundGradient,codeColor}) => {
  return (
    <div className={`flex ${position} justify-between my-20 gap-10 items-center`}>
        
        {/* section 1 */}
        <div className={`flex flex-col w-[50%] gap-8`}>
            <div>
                {heading}
                <div className='text-richblack-300 font-bold mt-4'>
                    {subheading}
                </div>
            </div>

            <div className='flex gap-7 mt-7 '>
                <Button active={button1.active} linkto={button1.linkto}>
                    <div className='flex items-center gap-2'>

                        {button1.btnText}
                        <AiOutlineArrowRight/>
                    </div>
                </Button>

                <Button active={button2.active} linkto={button2.linkto}>
                    {button2.btnText}
                </Button>
            </div>

        </div>


        {/* section 2 */}
        <div className='flex w-[100%] text-[15px] lg:w-[500px]'>
            {/* HW-gradient add karna hai */}

            <div className='w-[10%] flex flex-col text-center text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col font-mono gap-2 pr-2 ${codeColor}`}>
                <TypeAnimation
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks