import toast from "react-hot-toast";
import razpLogo from "../../assets/Logo/rzp_logo.png"
import { studentEndpoints } from "../apis";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { apiConnector } from "../apiconnector";
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,COURSE_PAYMENT_EMAIL_API} = studentEndpoints;

// loading script
function loadscript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {resolve(true)};
        script.onerror = () => {resolve(false)}; 
        document.body.appendChild(script);
    })
}

// buy course function
export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        // load script
        const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay sdk failed to load");
            return;
        }


        // create order
        console.log("COUURSESES",courses);
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses:courses},{
            Authorization:`Bearer ${token}`,
        })

        console.log("ORDER RESPONSE....",orderResponse);
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        // create options
        const RAZORPAY_KEY = 'rzp_test_iffbYDNeQlrnIi'
        const options = {
            key: RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            amount: `${orderResponse.data.data.amount}`,
            currency: orderResponse.data.data.currency,
            description: "Thank you for purchasing course",
            order_id:orderResponse.data.data.id,
            name:"studyera",
            // image: razpLogo,
            prefill:
                {
                email: userDetails.email,
                name:`${userDetails.firstName}`
                },  
            handler:function(response){
                // send successful mail
                console.log("Helooooo4");
                sendPaymentSuccessful(response,orderResponse.data.data.amount,token);

                // verify payment
                verifyPayment({...response,courses},token,navigate,dispatch);
            }
        }

        console.log("OPTIONS...",options);
        console.log("BASE URL...",RAZORPAY_KEY);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            console.log("Response....",response);
            toast.error("oops payment failed");
            console.log(response.error);
        })
    }
    catch(err){
        console.log("PAYMENT API ERROR....",err);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessful(response,amount,token){
    try{
        await apiConnector("POST",COURSE_PAYMENT_EMAIL_API,{
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },
        {
            Authorization:`Bearer ${token}`,
        })
    }
    catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERROR....", err);
    }
}

async function verifyPayment(data,token,navigate,dispatch){
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));
    try{
        const res = await apiConnector("POST",COURSE_VERIFY_API,data,{
            Authorization:`Bearer ${token}`,
        })

        if(!res.data.success){
            throw new Error(res.data.message);
        }

        toast.success("payment successful,you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(err){
        console.log("PAYMENT VERIFY ERROR....", err);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}