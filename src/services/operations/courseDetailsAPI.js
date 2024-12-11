
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import {categoryEndpoints,courseEndpoints, ratingEndpoints} from "../apis"
import { useSelector } from "react-redux";

export const fetchCategories = async() => {
    let result = [];
    try{
        const res = await apiConnector("GET",categoryEndpoints.COURSECATEGORY_API);

        console.log("ALL CATEGORIES API RESPONSE....",res);

        if(!res.data.success){
            throw new Error("Could Not Fetch Course Categories")
        }

        result = res?.data?.getAllCategory
        console.log(result);
    }
    catch(err){
        console.log("COURSE_CATEGORY_API API ERROR............", err);
        toast.error(err.message);
    }
    return result
}

export const editCourseDetails = async(data,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const res = await apiConnector("POST",courseEndpoints.EDITCOURSE_API,data,
        {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }
        );

        console.log("EDIT COURSE API RESPONSE....",res);

        if(!res.data.success){
            throw new Error("Could Not edit Course")
        }

        toast.success("Course Details Updated Successfully");
        result = res?.data?.data;
    }
    catch(err){
        console.log("EDIT COURSE API ERROR............", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result
}

export const addCourseDetails = async(data,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        console.log("BEFORE CREATE COURSE API....",data);
        const res = await apiConnector("POST",courseEndpoints.CREATECOURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("CREATE COURSE API RESPONSE....",res);

        if(!res.data.success){
            throw new Error("Could Not Create Course")
        }

        toast.success("Course Created Successfully");
        result = res?.data?.data;        
    }
    catch(err){
        console.log("CREATE COURSE API ERROR............", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async(data,token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", courseEndpoints.DELETECOURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result;
}

export const updateSection = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const res = await apiConnector("POST",courseEndpoints.UPDATE_SECTION_API,data,{
            Authorization: `Bearer ${token}`,
        })

        console.log("HITTING UPDATE SECTION...",res);

        if(!res?.data?.success){
            throw new Error("Could Not Update Lecture")
        }

        toast.success("Section Updated");
        result = res?.data?.data;
    }
    catch(err){
        console.log("UPDATE SUB-SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const res = await apiConnector("POST",courseEndpoints.CREATE_SECTION_API,data,{
            Authorization: `Bearer ${token}`,
        })

        console.log("HITTING CREATE SECTION...",res);

        if(!res?.data?.success){
            throw new Error("Could Not Add Lecture")
        }

        toast.success("Section Added");
        result = res?.data?.updatedCourse;
    }
    catch(err){
        console.log("CREATE SUB-SECTION API ERROR............", err)
        toast.error(err.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const removeSection = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const res = await apiConnector("DELETE",courseEndpoints.DELETESECTION_API,data,{
            Authorization: `Bearer ${token}`,
        });

        console.log("DELETE API HIT...",res);

        if(!res?.data?.success){
            throw new Error("Could Not Delete Lecture topic")
        }

        toast.success("Section Delete");
        result = res?.data?.data;
    }   
    catch(err){
        console.log("DELETE SECTION API ERROR............", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const removeSubSection = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const res = await apiConnector("POST",courseEndpoints.DELETESUBSECTION_API,data,{
            Authorization: `Bearer ${token}`,
        })

        console.log("DELETE SUBSECTION API HIT...",res);

        if(!res?.data?.success){
            throw new Error("Could Not Delete Lecture");
        }

        toast.success("Lecture deleted");
        result = res?.data?.data;
    }
    catch(err){
        console.log("DELETE SUB SECTION API ERROR............", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSubSection = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const res = await apiConnector("POST",courseEndpoints.CREATESUBSECTION_API,data,{
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE SUBSECTION API HIT...",res);

        if(!res?.data?.success){
            throw new Error("Could Not ADD Lecture");
        }

        toast.success("Lecture added");
        result = res?.data?.data;
    }
    catch(err){
        console.log("CREATE SUB SECTION API ERROR............", err);
        toast.error(err.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const editSubSection = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const res = await apiConnector("POST",courseEndpoints.EDITSUBSECTION_API,data,{
            Authorization:`Bearer ${token}`,
        })

        console.log("UPDATE SUB-SECTION API RESPONSE............", res);

        if (!res?.data?.success) {
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = res?.data?.data
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const getInstructorCourses = async(token) => {
    const toastId = toast.loading("Loading...");
    let result;
    try{
        const res = await apiConnector("GET",courseEndpoints.INSTRUCTORCOURSES_API,null,{
            Authorization:`Bearer ${token}`
        })

        console.log("INSTRUCTOR COURSES API RESPONSE............", res);

        // res?.data?.data?.forEach((item,index) => {
        //     console.log("The course is",item);
        // })

        if (!res?.data?.success) {
            throw new Error("Could Not get Courses")
        }
        toast.success("Courses Fetched")
        result = res?.data?.data;
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const getCourseDetails = async (courseId,token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
      const response = await apiConnector(
        "POST",
        courseEndpoints.GETCOURSEDETAILS_API,
        {
          courseId,
        },
        {
            Authorization: `Bearer ${token}`
        },
      )
      console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data;
    } catch (error) {
      console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
      result = error.response.data
      // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}

export const createRating = async(data,token) => {
    const toastId = toast.loading("Loading...");
    let result;
    try{
        console.log("DATA OF CREATE API.....",data);
        const res = await apiConnector("POST",courseEndpoints.CREATERATING_API,data,{
            Authorization: `Bearer ${token}`
        })

        console.log("CREATE_RATING_API API RESPONSE............", res);
        
        if(!res.data.success){
            throw new Error(res.data.message)
        }

        toast.success("Review added Successfully");
    }
    catch(err){
        console.log("CREATE RATING API ERROR............", err)
        result = err.response.data
    }
    toast.dismiss(toastId);
}

export const getAvgRatingReviews = async(data) => {
    const toastId = toast.loading("Loading...");
    let result;
    try{
        console.log("DATA OF CREATE API.....",data);
        const res = await apiConnector("GET",ratingEndpoints.GETAVGRATING_API,data)

        console.log("AVG_RATING API RESPONSE............", res);
        
        if(!res.data.success){
            throw new Error(res.data.message)
        }

        toast.success("Review fetched Successfully");
    }
    catch(err){
        console.log("AVG RATING API ERROR............", err)
        result = err.response.data
    }
    toast.dismiss(toastId);
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", courseEndpoints.MARK_LECTURE_COMPLETE_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }