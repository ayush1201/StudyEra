import {AiOutlineArrowRight} from "react-icons/ai"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import TagInput from "./TagInput"
import { fetchCategories,editCourseDetails,addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { BiUpload } from 'react-icons/bi';
import RequirementField from './RequirementField';
import { setStep, setCourse} from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import IconBtn from "../../../../common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import ChipInput from "./ChipInput";                                                                                                                                                 
import ImageUpload from "../ImageUpload";

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {step,course, editCourse} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(()=> {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCategories();
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            console.log("COURSE TAGS ARE.....",course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() )
            return true;
        else
            return false;
    }

    //handles next button click 
    const onSubmitForm = async(data) => {

      console.log("THE FORM DATA.....",data);

        if(editCourse) {
            if(isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if(currentValues.courseImage !== course.thumbnail){
                    formData.append("thumbnail",data.courseImage);
                }

                if(currentValues.courseTags !== course.tags){
                formData.append("tag",JSON.stringify(data.courseTags));
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if(currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } 
            else {
                toast.error("NO Changes made so far");
            }
            console.log("PRINTING result", result);

            return;
        }

        //create a new course
        const formData = new FormData();

        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("thumbnail",data.courseImage);
        formData.append("tag",(data.courseTags));
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", "Draft");

        setLoading(true);
        console.log("PRINTING FORMDATA", formData);
    
        const result = await addCourseDetails(formData,token);
        if(result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);

    }

  return (
    <form
    onSubmit={handleSubmit(onSubmitForm)}
    className='rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8 text-white'
    >
        <div className='flex flex-col gap-y-[6px]'>
            <label  htmlFor='courseTitle' className='label'>Course Title<sup className='sup'>*</sup></label>
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required:true})}
                className='w-full text-richblack-400 bg-richblack-700 rounded-lg p-3'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
            {
                errors.courseTitle && (
                    <span>Course Title is Required**</span>
                )
            }
        </div>

        <div className='flex flex-col gap-y-[6px]'>
            <label  htmlFor='courseShortDesc' className='label'>Course Short Description<sup className='sup'>*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className='min-h-[140px] w-full text-richblack-400 bg-richblack-700 rounded-lg p-3'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                />
            {
                errors.courseShortDesc && (<span>
                    Course Description is required**
                </span>)
            }
        </div>

        <div className='relative flex flex-col gap-y-[6px]'>
            <label htmlFor='coursePrice' className='label'>Course Price<sup className='sup'>*</sup></label>
            <input
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true
                })}
                className='w-full text-richblack-400 bg-richblack-700 rounded-lg p-3 px-10'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            />
            <HiOutlineCurrencyRupee  className='absolute top-10 text-richblack-400 w-[22px] h-[22px] left-2'/>
            {
                errors.coursePrice && (
                    <span>Course Price is Required**</span>
                )
            }
        </div>

        <div className='flex flex-col gap-y-[6px]'>
            <label htmlFor='courseCategory' className='label'>Course Category<sup className='sup'>*</sup></label>
            <select
            id='courseCategory'
            className='w-full text-richblack-400 bg-richblack-700 rounded-lg p-3'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            defaultValue=""
            {...register("courseCategory", {required:true})}
            >
                <option value="" disabled>Choose a Category</option>

                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }

            </select>
            {errors.courseCategory && (
                <span>
                    Course Category is Required
                </span>
            )}
        </div>

        <TagInput
          name="courseTags"
          label="Tags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        {/* <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        /> */}
        <ImageUpload
            label="Course Thumbnail"
            name="courseImage"
            setValue={setValue}
            getValues={getValues}
            register={register}
            errors={errors}
        />

        <div className='flex flex-col gap-y-[6px]'>
            <label htmlFor='coursebenefits' className='label'>Benefits of the course<sup className='sup'>*</sup></label>
            <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className='min-h-[130px] w-full text-richblack-400 bg-richblack-700 rounded-lg p-3'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            />
            {errors.courseBenefits && (
                <span>
                    Benefits of the course are required**
                </span>
            )}
        </div>

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />

        
        <div className="flex justify-end gap-x-2">
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <IconBtn
                disabled={loading}
                text={!editCourse ? "Next" : "Save Changes"}
                >
                <MdNavigateNext />
            </IconBtn>
        </div>
    </form>
  )
}

export default CourseInformationForm
