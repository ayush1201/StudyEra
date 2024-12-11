import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {MdModeEdit,MdOutlineDeleteForever} from "react-icons/md"
import {AiFillCaretDown, AiOutlinePlus} from "react-icons/ai"
import { setLoading } from '../../../../../slices/authSlice'
import { removeSection, removeSubSection } from '../../../../../services/operations/courseDetailsAPI'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { setCourse } from '../../../../../slices/courseSlice'
import SbSectionModal from './SbSectionModal'

const NestedView = ({handleChangeEditName}) => {

    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const [addSubSection,setAddSubSection] = useState(null);
    const [editSubSection,setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    console.log("THE UPDATED COURSE IS....",course);

    const deleteSection = async(sectionId) => {
        console.log("INSIDE DELETE......");
        setLoading(true);
        try{
            const res = await removeSection({
                sectionId:sectionId,
                courseId:course._id,
            },token);
            console.log("THE DELTED COURSE IS .....",res);

            if(res){
                dispatch(setCourse(res));
            }

            // setconfirmation modal to null which means to close

        }
        catch(err){
            // console.error(message.err);
            console.log("CANNOT DELETE THIS SECTION....");
        }
        setLoading(false);
    }

    const deleteSubSection = async(subSectionId,sectionId) => {
        console.log("INSIDE DELETE......");
        setLoading(true);
        try{
            const res = await removeSubSection({
                subSectionId,
                sectionId,
                courseId:course._id,
            },token);

            if(res){
                dispatch(setCourse(res));
            }

            // setconfirmation modal to null which means to close

        }
        catch(err){
            // console.error(message.err);
            console.log("CANNOT DELETE THIS SUB SECTION....");
        }
        setLoading(false);
    }

  return (
    <div className='text-richblack-300 rounded-lg bg-richblack-700 border border-richblack-600 p-6 px-8'>
        <div>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id}>
                        {/* showing sections */}
                        <summary className='flex items-center gap-x-3 border-b-2 justify-between py-2'>
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu className='text-[25px]'/>
                                <p className='font-medium text-richblack-50 text-[16px] leading-[24px]'>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center text-[25px] gap-x-2'>
                                <div className='flex items-center gap-x-2'>
                                    <button onClick={() => handleChangeEditName(section._id,section.sectionName)}>
                                        <MdModeEdit/>
                                    </button>
                                    <button onClick={() => setConfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => deleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })}>
                                        <MdOutlineDeleteForever/>
                                    </button> 
                                </div>
                                <div className='w-[1px] h-4 bg-richblack-400'>

                                </div>
                                <div className='flex items-center'>
                                    <AiFillCaretDown className='cursor-pointer'/>
                                </div>
                                
                            </div>
                        </summary>

                        {/* showing subsection */}
                        <div>
                            {
                                section?.subSection?.map((data) => (
                                    <div key={data._id} onClick={() => setViewSubSection(data)}
                                    className='flex items-center justify-between gap-x-3 border-b-[1px] px-2 py-2'>
                                        <div className='flex items-center gap-x-3'>
                                            <RxDropdownMenu className='text-[25px]'/>
                                            <p className='font-medium text-richblack-50 text-[14px] leading-[22px]'>{data.title}</p>
                                        </div>
                                        <div className='flex items-center gap-x-3 text-[25px]' onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => setEditSubSection({...data,sectionId:section._id})}>
                                                <MdModeEdit/>
                                            </button>
                                            <button onClick={() => setConfirmationModal({
                                                    text1: "Delete this Sub-Section?",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>deleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                    })}>
                                                <MdOutlineDeleteForever/>
                                            </button> 

                                        </div>
                                    </div>
                                ))
                            }

                            {/* add subsection */}
                            <button onClick={() => setAddSubSection(section._id)}
                            className='mt-4 text-yellow-50 flex items-center gap-x-2'>
                                <AiOutlinePlus/>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>
        {
            addSubSection ? (<SbSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>) 
            : editSubSection ? (<SbSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>) 
            : viewSubSection ? (<SbSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>)
            : (<div></div>)
        }
        {
            confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal}/>
            ) : (<div></div>)
        }
    </div>
  )
}

export default NestedView