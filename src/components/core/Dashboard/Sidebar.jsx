import React, { useEffect, useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const [confirmationModal,setConfirmationModal] = useState(null);

    const {user,loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading || authLoading){
        return(
            <div className='custom-loader mt-10'></div>
        )
    }


  return (
    <div className='text-white relative'>
        <div className='min-w-[222px] flex flex-col border-r-[1px] border-r-richblack-700 h-full top-[56px] fixed bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type)return null;
                        return(
                            <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 w-10/12 h-[1px] bg-richblack-600'></div>

            <div className='flex flex-col'>
                <SidebarLink link={{name:"settings",path:"/dashboard/settings"}} iconName={"VscSettingsGear"}/>

                <button onClick={() => setConfirmationModal({
                    text1:"Are you sure?",
                    text2:"You will be Logged out of your account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null)
                })} 
                className='text-richblack-300 text-sm font-medium px-8 py-2'
                >

                    <div className='flex gap-x-2 items-center'>
                        <VscSignOut className='text-lg'/>
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar