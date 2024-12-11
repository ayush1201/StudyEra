import React, { useEffect } from 'react'
import { useState } from 'react'
import {RxCross2} from "react-icons/rx"
import { useSelector } from 'react-redux';

const TagInput = ({name,label,register,errors,setValue,getValues}) => {

    const [tag,setTag] = useState('');
    const [tags,setTags] = useState([]);
    const {course,editCourse} = useSelector((state) => state.course);

    useEffect(() => {
        if(editCourse){
            setTags(course.tag);
            console.log("THE TAG LIST IS.....",tags);
            }
       register(name,{required:true})
       
    },[])

    useEffect(() => {
        setValue(name,tags)
     },[tags]);

    const addTag = () => {
        if(tag){
            setTags([...tags,tag]);
            setTag('');
        }
        console.log("NEWDLY ADDED TAGS..............",tags);
    }

    const removeTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index,1);
        setTags(updatedTags);
    }

    const handleChange = (e) => {
        setTag(e.target.value);
        console.log("TAG IS....",tag);
    }

    const onPress = (e) => {
        if(e.key === ','){
            addTag();
        }
    }   

  return (
    <div className={`flex flex-col ${tags?.length > 0 ? "gap-y-[8px]" : "gap-y-[2px]"} text-white`}>
        <label className='label' htmlFor={name}>{label} <sup className='sup'>*</sup> </label>
        <div className='flex gap-x-2 items-center'>
            {
                tags?.map((tag,index) => (
                    <button onClick={() => removeTag(index)} className='bg-yellow-400 rounded-full flex items-center gap-x-2 px-[12px] py-[4px]'>
                        {tag}
                        <RxCross2/>
                    </button>
                ))
            }
        </div>
        <input type="text" 
        placeholder='Choose a Tag'
        onChange={handleChange}
        onKeyDown={onPress}
        value={tag}
        className='w-full text-richblack-400 bg-richblack-700 rounded-lg p-3'
        style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        />
        {
            errors[name] && (
                <span>Tag is required**</span>
            )
        }
    </div>
  )
}

export default TagInput