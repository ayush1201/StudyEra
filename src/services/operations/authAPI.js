import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import {endpoints} from "../apis"



export const getPasswordResetToken = (email,setEmailSent) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const res = await apiConnector("POST",endpoints.RESETPASSWORDTOKEN_API,{email});
            console.log("Reset password token response -> ",res);

            if(!res.data.success){
                throw new Error(res.data.message);
            }

            toast.success("Reset email sent");
            setEmailSent(true);
        }
        catch(err){
            console.log("Reset password token error");
            toast.error("Failed to send resend password email");
        }
        dispatch(setLoading(false));
    }
}

export function updatePassword(password,confirmPassword,token,setResetDone){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const res = await apiConnector("POST",endpoints.RESETPASSWORD_API,{password,confirmPassword,token});
            console.log("Reset password response -> ",res);

            if(!res.data.success){
                throw new Error(res.data.message);
            }
            
            setResetDone(true);
            toast.success("Password resetted successfully");
        }
        catch(err){
            console.log("Reset password error");
            toast.error("Failed to reset the password");
        }

        dispatch(setLoading(false));
    }
}

export function signup(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{

            console.log("Inside try of signup....");
            const res = await apiConnector("POST",endpoints.SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            });
            console.log("SIGNUP API RESPONSE............", res);

            if(!res.data.success){
                throw new Error(res.data.message);
            }

            toast.success("Signup Successful")
            navigate("/login")

        }
        catch(err){
            console.log("COULDN'T SIGNUP ...",err);
            toast.error("Signup Failed");
            navigate("/login");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function sendOtp(email,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const res = await apiConnector("POST",endpoints.SENDOTP_API,{email});
            console.log("OTP is generated...",res);

            if(!res.data.success){
                throw new Error(res.data.message);
            }

            toast.success(`OTP sent to ${email}`);
            navigate("/verify-email");

        }
        catch(err){
            console.log("Couldn't send otp");
            toast.error("Couldn't send otp");
            
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function login(email,password,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const res = await apiConnector("POST",endpoints.LOGIN_API,{
                email,
                password
            })

            console.log("LOGIN API RESPONSE............", res);
            if(!res.data.success){
                throw new Error(res.data.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(res.data.token));
            
            // save user data also
            const userImage = res.data?.user.image ? res.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.firstName} ${res.data.user.lastName}`
            dispatch(setUser({...res.data.user,image:userImage}));

            localStorage.setItem("token",JSON.stringify(res.data.token));
            localStorage.setItem("user",JSON.stringify(res.data.user));
            navigate("/dashboard/my-profile");


        }
        catch(err){
            console.log("LOGIN API ERROR...",err);
            toast.error("Login failed ,try again");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/");
    }
}

export function submitContactForm(data){
    return async(dispatch) => {
        
    }
}

