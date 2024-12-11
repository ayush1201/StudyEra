
const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showCatgory"
}

// auth endpoints
export const endpoints = {
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    LOGIN_API:BASE_URL + "/auth/login"
}

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// settings endpoints
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
    UPDATEPROFILE_API:BASE_URL + "/profile/updateProfile",
    UPDATEPASSWORD_API:BASE_URL + "/auth/changePassword",
    DELETEPROFILE_API:BASE_URL + "/profile/deleteAccount"
}

// profile endpoints
export const profileEndpoints = {
    GETENROLLEDCOURSES_API:BASE_URL + "/profile/getEnrolledCourses",
    GETINSTRUCTORSTATS_API:BASE_URL + "/profile/instructorDashboard"
}

// category endpoints
export const categoryEndpoints = {
    COURSECATEGORY_API:BASE_URL + "/course/showCategory"
}

// course endpoints
export const courseEndpoints = {
    CREATECOURSE_API:BASE_URL + "/course/courseCreate",
    EDITCOURSE_API:BASE_URL + "/course/editCourse",
    UPDATE_SECTION_API:BASE_URL + "/course/updateSection",
    CREATE_SECTION_API:BASE_URL + "/course/createSection",
    DELETESECTION_API:BASE_URL + "/course/deleteSection",
    DELETESUBSECTION_API:BASE_URL + "/course/deleteSubSection",
    CREATESUBSECTION_API:BASE_URL + "/course/createSubsection",
    EDITSUBSECTION_API:BASE_URL + "/course/updateSubSection",
    INSTRUCTORCOURSES_API:BASE_URL + "/course/getInstructorCourses",
    DELETECOURSE_API:BASE_URL + "/course/deleteCourse",
    GETCOURSEDETAILS_API:BASE_URL + "/course/getCourseDetails",
    CREATERATING_API: BASE_URL + "/course/ratingAndReviews",
    MARK_LECTURE_COMPLETE_API:BASE_URL + "/course/updateCourseProgress"
}


// category page details endpoints
export const catalogEndpoints = {
    CATALOGDETAILS_API:BASE_URL + "/course/categoryPageDetails"
}

// student endpoints
export const studentEndpoints = {
    COURSE_PAYMENT_API:BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API:BASE_URL + "/payment/verifyPayment",
    COURSE_PAYMENT_EMAIL_API:BASE_URL + "/payment/sendPaymentSuccessful"
}

// get rating endpoints
export const ratingEndpoints = {
    GETREVIEW_RATING_API:BASE_URL+"/course/getAllRating",
    GETAVGRATING_API:BASE_URL + "/course/getAvgerageRating"
}

// contact us endpoints
export const contactUsEndpoints = {
    CONTACTUS_API:BASE_URL + "/reach/contact"
}