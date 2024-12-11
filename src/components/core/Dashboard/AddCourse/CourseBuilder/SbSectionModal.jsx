import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, editSubSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { setLoading } from '../../../../../slices/authSlice';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import IconBtn from '../../../../common/IconBtn';
import { useState } from 'react';
import Upload from './Upload';
import ImageUpload from '../ImageUpload';

const SbSectionModal = ({
    modalData,
    setModalData,
    add = false,
    edit = false,
    view = false
}) => {

    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
        getValues
    } = useForm();

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDescription",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
    },[]);

    const isFormUpdated = () => {
        const currValues = getValues();
        if((currValues.lectureTitle !== modalData.title) || 
        (currValues.lectureDescription !== modalData.description) || 
        (currValues.lectureVideo !== modalData.videoUrl)){
            return true;
        }
        else{
            return false;
        }

    }

    const handleEditSubSection = async() => {
        const currValues = getValues();
        const formData = new FormData();

        formData.append("sectionId",modalData.sectionId);
        formData.append("subSectionId",modalData._id);

        if(currValues.lectureTitle !== modalData.title){
            formData.append("title",currValues.lectureTitle);
        }

        if(currValues.lectureDescription !== modalData.description){
            formData.append("description",currValues.lectureDescription);
        }

        if(currValues.lectureVideo !== modalData.videoUrl){
            formData.append("videoUrl",modalData.videoUrl);
        }

        // now edit subsection api call
        setLoading(true);
        const res = await editSubSection(formData,token);

        if(res){
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? res : section);
            const updatedCourse = {...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);

    }

    const onSubmit = async(data) => {
        // if only view
        if(view){
            return;
        }
        
        // if edit just check if form is updated or not
        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the form")
            }
            else{
                handleEditSubSection();
            }
            return;
        }

        // now add the sub section 
        const formData = new FormData();
        formData.append("sectionId",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDescription);
        formData.append("videoUrl",data.lectureVideo);

        // now call the create subsection api
        const result = await createSubSection(formData,token);

        if(result){
            // TODO CHECK FOR UPDATION
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section);
            const updatedCourse = {...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <ImageUpload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDescription"
              placeholder="Enter Lecture Description"
              {...register("lectureDescription", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDescription && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SbSectionModal