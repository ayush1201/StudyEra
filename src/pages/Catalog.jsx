import React from 'react'
import Footer from '../components/common/Footer'
import { useState } from 'react'
import { useEffect } from 'react';
import { apiConnector } from '../services/apiconnector';
import { categoryEndpoints } from '../services/apis';
import { useParams } from 'react-router-dom';
import {getCatalogPageData} from "../services/operations/pageAndComponentAPI"
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_card from '../components/core/Catalog/Course_card';

const Catalog = () => {

    const {catalogName} = useParams();
    const [categoryId,setCategoryId] = useState(null);
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [active,setActive] = useState(1);

    useEffect(() => {
        const getCategories = async() => {
            // getting the catalog id after selecting that catalog, get all categories list iin array and filter the category name equal to catalogName and extract it's id.
            const res = await apiConnector("GET",categoryEndpoints.COURSECATEGORY_API);
            const category_id = res?.data?.getAllCategory?.filter((cate) => cate.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(err){
                console.error(err);
            }
        }
        if(categoryId){
            getCategoryDetails();
        }
        
    },[categoryId]);

    console.log("Printing res222..................",catalogPageData);

  return (
    <div className='text-white'>
        
        {/* section 1 */}
        <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p>{`Home / Catalog /`} <span className="text-yellow-25">{catalogPageData?.data?.selectedCategory?.name}</span></p>
                <p className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.name}</p>
                <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
        </div>

            {/* section2  */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className='section_heading'>Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                    className={`px-4 py-2 ${
                    active === 1
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(1)} 
                    >Most Popular</p>
                    <p
                    className={`px-4 py-2 ${
                    active === 2
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(2)}
                    >New</p>
                </div>
                <div>
                    <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className='section_heading'>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
                <div className="py-8">
                    <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>
            
            {/* section 4 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className='section_heading'>Frequently Bought Together</p>

                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course,ind) => (
                                <Course_card course={course} key={ind} height={"h-[400px]"}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            
        <Footer/>
    </div>
  )
}

export default Catalog