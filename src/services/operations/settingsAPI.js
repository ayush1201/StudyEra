import toast from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector";
import {settingsEndpoints} from "../apis"
import { logout } from "./authAPI";

export function updateProfilePicture(token,imageFile){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        const formData = new FormData();
        console.log("UPDATED PHOTO...",imageFile);
        formData.append("displayPicture",imageFile);

        console.log("FORMDATA KI IMAGE...",formData.get("displayPicture"));
        try{
            const res = await apiConnector("PUT",settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
            );

            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                res
            )

            if (!res.data.success) {
                throw new Error(res.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(res.data.data))
        }
        catch(err){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", err);
            toast.error("Could Not Update Display Picture");
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token,data){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const res = await apiConnector("PUT",settingsEndpoints.UPDATEPROFILE_API,data,{
                Authorization: `Bearer ${token}`,
            })

            console.log("UPDATE_PROFILE_API API RESPONSE............", res);


            if (!res.data.success) {
                throw new Error(res.data.message)
            }

            // const userImage 
            toast.success("Profile Updated Successfully")
            // dispatch(setUser(res.data.updatedUserDetails));
        }
        catch(err){
            console.log("UPDATE_PROFILE_API API ERROR............", err);
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(token,data){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const res = await apiConnector("POST",settingsEndpoints.UPDATEPASSWORD_API,data,{
                Authorization: `Bearer ${token}`,
            })

            console.log("UPDATE_PASSWORD_API API RESPONSE............", res);


            if (!res.data.success) {
                throw new Error(res.data.message)
            }

            // const userImage 
            toast.success("Password Updated Successfully")
        }
        catch(err){
            console.log("UPDATE_PASSWORD_API API ERROR............", err);
            toast.error("Could Not Update Password");
        }
        toast.dismiss(toastId);
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{

            const res = await apiConnector("DELETE",settingsEndpoints.DELETEPROFILE_API,null,{
                Authorization: `Bearer ${token}`,
            })

            console.log("DELETE API RESPONSE............", res);


            // if (!res.data.success) {
            //     throw new Error(res.data.message)
            // }

            // const userImage 
            toast.success("Account Deleted Successfully");
            dispatch(logout(navigate))
        }
        catch(err){
            console.log("DEL API ERROR............", err);
            toast.error("Could Not Delete Account");
        }
        toast.dismiss(toastId);
    }
}