import React, { useEffect } from 'react'
import { useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {

    const [requirement,setRequirement] = useState('');
    const [requirements,setRequirements] = useState([]);

    useEffect(() => {
        register(name,{required:true})
    },[]);

    useEffect(() => {
        setValue(name,requirements);
    },[requirements]);

    const handleAdd = () => {
        if(requirement){
            setRequirements([...requirements,requirement]);
            setRequirement('');
        }
    }

    const handleRemove = (index) => {
        const updatedRequirements = [...requirements];
        updatedRequirements.splice(index,1);
        setRequirements(updatedRequirements);
    }

    const handleChange = (e) => {
        setRequirement(e.target.value);
    }

  return (
    <div>
        <label className='label' htmlFor={name}>{label} <sup className='sup'>*</sup> </label>
        <div className='flex flex-col gap-y-[6px]'>
            <input type="text" 
                id={name}
                value={requirement}
                onChange={handleChange}
                placeholder='Enter Instructions'
                className='w-full text-richblack-400 bg-richblack-700 rounded-lg p-3'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
            <button type='button' 
            className='font-semibold text-yellow-50 text-left' 
            onClick={() => handleAdd()}>Add</button>
        </div>
        {
            requirements.length > 0 && (
                <ul>
                    {
                        requirements.map((requirement,index) => (
                            <li key={index}>
                                {requirement}
                                <button
                                type='button' 
                                onClick={() => handleRemove(index)}
                                className='text-xs text-pure-greys-300'
                                >Clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }

    </div>
  )
}

export default RequirementField