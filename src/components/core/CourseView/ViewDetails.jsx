import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/courseViewSlice';
import { BigPlayButton, Player } from 'video-react';
import { CiPlay1 } from "react-icons/ci";
import 'video-react/dist/video-react.css';
import IconBtn from '../../common/IconBtn';

const ViewDetails = () => {

  const {courseId,sectionId,subSectionId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const ref = useRef();
  const {token} = useSelector((state) => state.auth);
  const {courseSectionData,
        courseEntireData,
        completedLectures} = useSelector((state) => state.viewCourse);
  
  const [videoData,setVideoData] = useState([]);
  const [videoEnded,setVideoEnded] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificData = async() => {
      if(!courseSectionData.length){
        return;
      }
      if(!courseId || !sectionId || !subSectionId){
        navigate("/dashboard/enrolled-courses");
      }
      else{
        // all 3 are present ,now set the video to be displayed
        const filteredData = courseSectionData.filter(
            (course) => course._id === sectionId
        )

        const filteredVideoData = filteredData?.[0].subSection.filter(
            (data) => data._id === subSectionId
        )

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    }
    setVideoSpecificData();
  },[courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currSecInd = courseSectionData.findIndex((data) => data._id === sectionId);
    const currSubSecInd = courseSectionData[currSecInd].subSection.findIndex((data) => data._id === subSectionId);

    if(currSecInd === 0 && currSubSecInd === 0){
      return true;
    }
    else{
      return false;
    }
  }

  const isLastVideo = () => {
    const currSecInd = courseSectionData.findIndex((data) => data._id === sectionId);
    const currSubSecInd = courseSectionData[currSecInd].subSection.findIndex((data) => data._id === subSectionId);

    if(currSecInd === courseSectionData.length-1 && currSubSecInd === courseSectionData[currSecInd].subSection.length-1){
      return true;
    }
    else{
      return false;
    }
  }

  const goToNextVideo = () => {
    const currSecInd = courseSectionData.findIndex((data) => data._id === sectionId);
    const currSubSecInd = courseSectionData[currSecInd].subSection.findIndex((data) => data._id === subSectionId);

    // now check that if it's same section or next section 1st video should be displayed
    if(currSubSecInd === (courseSectionData[currSecInd].subSection.length-1)){
      // last video index in that section ,find next section
      const nextSecId = courseSectionData[currSecInd+1]._id;
      const nextSubSecId = courseSectionData[currSecInd+1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSecId}/sub-section/${nextSubSecId}`)
    }
    else{
      // in same section, just next video
      const nextSubSecId = courseSectionData[currSecInd].subSection[currSubSecInd+1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSecId}`) 
    }
  }

  const goToPrevVideo = () => {
    const currSecInd = courseSectionData.findIndex((data) => data._id === sectionId);
    const currSubSecInd = courseSectionData[currSecInd].subSection.findIndex((data) => data._id === subSectionId);

    // now check that if it's same section or prev section video should be displayed
    if(currSubSecInd === 0){
      // first video index in that section ,find prev section
      const prevSecId = courseSectionData[currSecInd-1]._id;
      const prevSubSecId = courseSectionData[currSecInd-1].subSection[courseSectionData[currSecInd-1].subSection.length-1]._id;
      navigate(`/view-course/${courseId}/section/${prevSecId}/sub-section/${prevSubSecId}`)
    }
    else{
      // in same section, just prev video
      const prevSubSecId = courseSectionData[currSecInd].subSection[currSubSecInd-1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSecId}`) 
    }
  }

  const handleCompletion = () => {
    // create mark lecture completed controller
    setLoading(true);
    const res = markLectureAsComplete({courseId:courseId,subSectionId:subSectionId},token);

    // state update
    if(res){
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 text-white max-h-max">
      {
        !videoData ? (<div>
          No Data found
        </div>) : (
          
          <Player
            ref={ref}
            playsInline
            aspectRatio='16:7'
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}>

            <BigPlayButton position="center" />

            {
              videoEnded && (
                <div 
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                  className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                  {
                    !completedLectures.includes(subSectionId) && (
                      <IconBtn
                        disabled={loading}
                        onclick={() => handleCompletion()}
                        text={!loading ? "Mark as Completed" : "Loading..."}
                        customClasses="text-xl max-w-max px-4 mx-auto"
                      />
                    )
                  }

                  <IconBtn
                    text={"Rewatch"}
                    disabled={loading}
                    onclick={() => {
                      if(ref?.current){
                        ref.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                  />

                  {/* prev and next button */}
                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">

                    {
                      !isFirstVideo() && (
                        <button 
                        onClick={() => goToPrevVideo()}
                        disabled={loading}
                        className='blackButton'
                        >
                          Prev
                        </button>
                      )
                    }

                    {
                      !isLastVideo() && (
                        <button 
                        onClick={() => goToNextVideo()}
                        disabled={loading}
                        className='blackButton'
                        >
                          Next
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }
          </Player>

        )
      }
      <h1 className="text-3xl font-semibold">
        {videoData?.title}
      </h1>
      <p>
        {videoData?.description}
      </p>
    </div>
  )
}

export default ViewDetails