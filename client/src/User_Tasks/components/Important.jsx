
import { useEffect, useState } from "react";
import Cards from "./Cards.jsx";
import { toast } from "react-toastify";
import { fetchImportantData } from "../customsApi.js";


export default function Important(){

   const [important , setImportant] = useState([]);

   const [loading , setLoading] = useState(false);


 const fetchImpData= async ()=>{
      try{
         setLoading(true);

         const { data } = await fetchImportantData();

         if(data.success){
         setImportant(data.impart);
         }else{
            toast.error("failed to load data")
         }

      }catch(err){
         toast.error("something went wrong")

      }finally{
         setLoading(false);
      }
   }

   useEffect(()=>{
      fetchImpData();
   } , [])



   return(
      <div className=" relative py-2 overflow-y-auto h-[calc(100vh-180px)] sm:h-[calc(100vh-133px)]">
          <h1 className="text-center font-semi-bold font-mono text-xl text-[#016849] pt-1">Important Tasks </h1>
         {
            loading && (
               <div className="absolute inset-0 flex items-center justify-center"> 

                  <span className=" loading loading-lg loading-ring"></span>
               </div>
            )
         }
         <Cards data={important} fetchImp = {fetchImpData} />
      </div>
   )
}