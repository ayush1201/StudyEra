import React, { useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import {FiUploadCloud} from 'react-icons/fi'
import "video-react/dist/video-react.css"

import { Player } from 'video-react';

const ImageUpload = ({label,name,setValue,getValues,register,errors,video,viewData=null,editData=null}) => {

  const {course} = useSelector((state) => state.course);
  const [selectedFile,setSelectedFile] = useState(null);
  const [previewSource,setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const inputRef = useRef(null);

  useEffect(() => {
    register(name,{required:true})
  },[register]);

  useEffect(() => {
    setValue(name,selectedFile);
  },[setValue,selectedFile]);

  const onDrop = (acceptedFiles) => {
    console.log("DROPPED FILES.......",acceptedFiles);
    const file = acceptedFiles[0];
    if(file){
      setSelectedFile(file);
      previewFile(file);
    }
  }

  const {getRootProps,getInputProps,isDragActive} = useDropzone({
    accept: !video
    ? { "image/*": [".jpeg", ".jpg", ".png"] }
    : { "video/*": [".mp4"] },onDrop})

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  return (
    <>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor={name} className='label'>{label} <sup className='sup'>*</sup> </label>
        <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}
        flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}>
          {
            !previewSource ? (
              <div className='flex w-full flex-col items-center p-6' {...getRootProps()}>
                <input {...getInputProps()} ref={inputRef}/>
                <div className='bg-pure-greys-800 w-14 aspect-square flex items-center justify-center rounded-full'>
                  <FiUploadCloud className='text-yellow-50 text-2xl'/>
                </div>
                <p className="mt-2 max-w-[240px] text-center text-sm text-richblack-200">
                  Drag and drop an {!video ? "image" : "video"}, or <span className='text-yellow-50 font-semibold'>Browse</span>
                </p>
                <ul className='flex mt-10 list-disc space-x-12 text-xs text-richblack-200'>
                  <li>Aspect ratio 16:9</li>
                  <li>Recommended size 1024x576</li>
                </ul>
              </div>
            ) : (
              <div className='flex flex-col w-full p-6'>
                {
                  !video ? (
                    <img src={previewSource} alt="Preview" 
                      className='h-full w-full rounded-md object-cover'
                    />
                  ) : (
                    <Player aspectRatio='16:9' playsInline src={previewSource}/>
                  )
                }
                {
                  !viewData && (
                    <button className='mt-3 bg-richblack-400 underline'
                    type='button'
                    onClick={() => {
                      setPreviewSource("");
                      setSelectedFile(null);
                      setValue(name,null);
                    }}
                    >
                      Cancel
                    </button>
                  )
                }
              </div>
            )
          }
        </div>
        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )}
      </div>
    </>
  )
}

export default ImageUpload