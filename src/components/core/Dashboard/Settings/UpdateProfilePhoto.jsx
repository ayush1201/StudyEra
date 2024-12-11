import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {FiUpload} from "react-icons/fi"
import { updateProfilePicture } from '../../../../services/operations/settingsAPI';
import IconBtn from '../../../common/IconBtn';

const UpdateProfilePhoto = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null);
    const handleClick = () => {
        console.log(user);
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        // console.log("TARGET PHOTO is....",e.target.files);
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
        }
    }

    const handleUpload = () => {
        try{
            setLoading(true);

            // uploading photo by calling the api
            dispatch(updateProfilePicture(token,imageFile)).then(() => {
                setLoading(false);
            })
        }
        catch(err){
            console.log("ERROR MESSAGE - ", err.message)
        }
    }

  return (
    <div>
        <div className='w-full'>

            {/* section 1 */}
            <div className='flex items-center bg-richblack-700 p-[30px] gap-[20px] border-[1px]
            border-richblack-800 rounded-lg w-full'>
                <div className='flex items-center gap-5 w-full'>
                    <div className='w-[78px] h-[78px]'>
                        <img src={user?.image} className='rounded-full'/>
                    </div>
                    <div className='w-full flex flex-col gap-y-2'>
                        <p className='font-medium leading-[24px] text-richblack-25'>Change Profile Picture</p>
                        <div className='flex w-[206px] gap-x-3'>    
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg"
                            />
                            <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold 
                                bg-richblack-800 text-white hover:scale-95 transition-all duration-200'
                                onClick={handleClick}
                                disabled={loading}>
                                Select
                            </button>
                
                            <IconBtn
                                text={loading ? "Uploading..." : "Upload"}
                                onclick={handleUpload}
                            >
                                {!loading && (
                                <FiUpload className="text-lg text-richblack-900" />
                                )}
                            </IconBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfilePhoto