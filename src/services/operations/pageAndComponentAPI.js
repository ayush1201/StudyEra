import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogEndpoints } from '../apis';

export const getCatalogPageData = async(categoryId) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const res = await apiConnector("POST",catalogEndpoints.CATALOGDETAILS_API,{categoryId:categoryId});

        console.log("CATALOG DETAILS API...............",res);

        if(!res?.data?.success){
            throw new Error("Could not Fetch Category page data");
        }

        result = res?.data;
    }
    catch(error){
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}
