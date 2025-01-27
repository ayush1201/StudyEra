import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineArrowRight} from "react-icons/ai"
import HighlightText from '../components/core/HomePage/HighlightText'
import Button from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
import { FaArrowRight } from 'react-icons/fa'

const Home = () => {
  return (
    <div>

        {/* section 1 */}
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">

            <Link to={"/signup"}>
            <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <FaArrowRight />
                </div>
            </div>
            </Link>

            <div className='flex text-center text-4xl font-semibold'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <Button active={true} linkto={"/signup"}>
                    Learn More
                </Button>

                <Button active={false} linkto={"/login"}>
                    Book a Demo
                </Button>
            </div>

            <div>

                <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>

                    <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
                        <source src={Banner} type='video/mp4'/>
                    </video>
                </div>
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your <HighlightText text={"coding potential"}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    button1={
                        {
                            btnText:"try it yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    button2={
                        {
                            btnText:"learn more",
                            linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}

                />
            </div>

            {/* code section 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                            Start <HighlightText text={"coding in seconds"}/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    button1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    button2={
                        {
                            btnText:"learn more",
                            linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}

                />
            </div>

            <ExploreMore/>

            
        </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>

            <div className='bg_background h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-5 mx-auto'>
                    <div className='lg:h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white lg:mt-8'>

                        <Button active={true} linkto={"/signup"}>
                            <div className='flex gap-2 items-center justify-center'>
                                Explore Full Catalog
                                <AiOutlineArrowRight/>
                            </div>
                        </Button>

                        <Button active={false} linkto={"/login"}>
                            Learn More
                        </Button>
                    </div>
                </div>


                    
            </div>

            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center gap-7'>
                
                <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>

                    <div className='text-4xl font-semibold lg:w-[45%]'>
                        Get the skills you need for a 
                        <HighlightText text={"job that is in demand."}/>
                    </div>

                    <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                        <p className='text-[16px]'>
                        The modern studyera is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <Button active={true} linkto={"/signup"}>
                            Learn More
                        </Button>
                    </div>
                </div>

                <TimelineSection/>

                <LearningLanguageSection/>
            </div>

        </div>


        {/* section 3 */}
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-8 bg-richblack-900 text-white">
            {/* Become a instructor section */}
            <InstructorSection />

            {/* Reviws from Other Learner */}
            <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
            </h1>
            <ReviewSlider />
        </div>


        {/* footer */}
        <Footer/>

    </div>
  )
}

export default Home