import toast from "react-hot-toast"
import { profileEndpoints } from "../apis"
import { apiConnector } from "../apiconnector"


export async function getUserEnrolledCourses(token){
    
        const toastId = toast.loading("Loading...");
        let result = [];
        try{

            console.log("BEFORE CALLING");
            const res = await apiConnector("GET",profileEndpoints.GETENROLLEDCOURSES_API,null,
            {
                Authorization: `Bearer ${token}`,
            });

            console.log("AFTER CALLING BACKEND FOR ENROLLED COURSES",res);

            if(!res.data.success){
                throw new Error(res.data.message);
            }

            result = res.data.data;

        }
        catch(err){
            console.log("COULD NOT GET COURSES",err);
            toast.error("Could not get courses");
        }
        toast.dismiss(toastId);
        return result;
}

export async function getInstructorData(token){
    const toastId = toast.loading;
    let result;
    try{
        const res = await apiConnector("GET",profileEndpoints.GETINSTRUCTORSTATS_API,null,{
            Authorization: `Bearer ${token}`
        });

        console.log("AFTER CALLING BACKEND FOR GETINSTRUCTORSTATS_API....",res);

        if(!res.data.success){
            throw new Error(res.data.message);
        }

        result = res.data.courses;
    }
    catch(err){
        console.log("COULD NOT GET COURSES DATA",err);
        toast.error("Could not get course stats");
    }
    toast.dismiss(toastId);
    return result;
}