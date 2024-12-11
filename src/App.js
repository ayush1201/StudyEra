import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import Settings from "./pages/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import CourseView from "./pages/CourseView";
import ViewDetails from "./components/core/CourseView/ViewDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>
        <Route path="/signup" element={
          <OpenRoute>
            <Signup/>
          </OpenRoute>
        }/>
        <Route path="/login" element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>
        }/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail/>
          </OpenRoute>
        }/>
        <Route path="/about" element={
            <About/>
        }/>
        <Route path="/contact" element={<ContactUs/>}/>

        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/settings" element={<Settings/>}/>
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="/dashboard/cart" element={<Cart/>}/>
          <Route path="/dashboard/add-course" element={<AddCourse/>}/>
          <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
          <Route path="/dashboard/instructor" element={<Instructor/>}/>
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
        </Route>

        <Route element={
          <PrivateRoute>
            <CourseView/>
          </PrivateRoute>
        }>
          <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<ViewDetails/>}/>
        </Route>

        <Route path="*" element={<Error/>}/>
      </Routes>

    </div>
  );
}

export default App;
