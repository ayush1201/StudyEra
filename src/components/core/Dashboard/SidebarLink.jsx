import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"
// import * as Icons from "react-icons/ai"

const SidebarLink = ({link,iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return route === location.pathname;
    }

    // const handleClick = (e) => {
        
    // }

  return (
    <NavLink to={link.path}
    // onClick={(link.path) => {m}}
    className={`relative px-8 py-2 text-sm text-richblack-300 font-medium transition-all duration-200 ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0"}`}
    >
        <span className={`absolute left-0 top-0 h-full transition-all duration-200 w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "bg-yellow-50" : "bg-opacity-0"}`}>

        </span>

        <div className='flex items-center gap-x-2'>
            <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink