
import { useEffect, useState } from "react";
import Cards from "./Cards.jsx";
import { toast } from "react-toastify";
import { fetchCompleteData } from "../customsApi.js";


export default function Complete(){

   const [data , setData] = useState([])
   const [loading , setLoading] = useState(false);


   const fetchComData= async ()=>{
      try{
         setLoading(true);

         const {success , message , data} = await fetchCompleteData();
         
         if(success){
            setData(data);
         }else{
            return toast.error("failed to load tasks")
         }
      }catch(err){
         console.log(err);
         // toast.error("something went wrong")

      }finally{
         setLoading(false);
      }
   }

   useEffect(()=>{
      fetchComData();
   } , [])


   return(
      <div className=" relative py-2 overflow-y-auto h-[calc(100vh-180px)] sm:h-[calc(100vh-133px)]">
          <h1 className="text-center font-semi-bold font-mono text-xl text-[#016849] pt-1">Completed Tasks </h1>

         {
            loading && (
               <div className="absolute inset-0 flex items-center justify-center"> 

                  <span className=" loading loading-lg loading-ring"></span>
               </div>
            )
         }
         <Cards data={data} fetchCom = {fetchComData} />
      </div>
   )
}