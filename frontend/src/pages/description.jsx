import react from 'react';
import {useLocation } from 'react-router-dom'
import { useEffect,useState  } from 'react';
import UseContext from "../context/usercontest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE } from "../apiConfig";
function Description (){
    const location =useLocation();
    const {user} = UseContext();
    const blogId=location.state?.blogId;
    const [blogContent, setBlogContent] = useState(null);
    const [like,setlike] = useState(null);
    const [dislike,setdislike] = useState(null);
    const [comment,setComment] = useState("");
    const [viewcomment,setViewcomemnt] = useState(false);
    const [commentdata,setCommentdata] = useState(null);
    const [currStatus,setCurrStatus] = useState(null);
    useEffect( () => {
        const fetchdata= async()=>{
            try {
                    if (blogId) {
                    const response = await fetch(`${API_BASE}/user/all/${blogId}`,{
                        method: "GET",
                        credentials: "include" 
                    })
                    const data =await response.json();
                    if(response.ok){
                        setBlogContent(data.content);
                    }
                }
                }
                catch (errors){
                    toast.success("error occcured");
                    console.log(errors)
                }
            }
            fetchdata();
            
        }, [blogId]);

    useEffect(()=>{
        const fetchdata= async()=>{
            try {
                    if (blogId) {
                    const response = await fetch(`${API_BASE}/user/comment/${blogId}?userId=${user.id}`,{
                        method: "GET",
                        credentials: "include" 
                    })
                    const data =await response.json();
                    if(response.ok){
                        console.log("data",data);
                        setdislike(data.dislike);
                        setlike(data.like);
                        setCurrStatus(data.status)
                    }
                }
                }
                catch (errors){
                    toast.success("error occcured");
                    console.log(errors)
                }
            }
        fetchdata();
    },[blogId])

    const handleReaction=(reaction)=>{
        console.log(reaction);
        const fetchdata= async()=>{
            try {
                    if (blogId) {
                    const response = await fetch(`${API_BASE}/user/comment/${blogId}`,{
                        method: "POST",
                        credentials: "include" ,
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body:JSON.stringify({
                            userid:user.id ,
                            feature:reaction
                        })
                    })
                    const data =await response.json();
                    if(response.ok){
                        console.log("like: ",data.like ,"dislike: " ,data.dislike )
                        setdislike(data.dislike);
                        setlike(data.like);
                        
                    }
                }
                }
                catch (errors){
                    toast.success("error occcured");
                    console.log(errors)
                }
            }
        fetchdata();

    }

    const handlecomment=()=>{
        const fetchdata = async()=>{
            try{
                const response =   await fetch(`${API_BASE}/user/addcomment/${blogId}`,{
                method: "POST",
                credentials: "include" ,
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    userid:user.id ,
                    comment:comment
                })
               });
                const data = await response.json();
                if(response.ok){
                    console.log(data);
                }
                else{
                    console.log("error occur ");
                }
                setComment("");
            }
            catch(err){
                console.log("error occur ");
            }
        }
        fetchdata();
    }

    useEffect(()=>{
        if(viewcomment){
            const fetchdata=async()=>{
                const response = await fetch(`${API_BASE}/user/addcomment/${blogId}`,{
                    method:"GET",
                    headers:{
                    "Content-Type": "application/json"
                        },
                    credentials:"include",
                })
                const data = await response.json();
                if(response.ok){
                    console.log("commentdata: ",data);
                    if(data.data=="No comment found"){
                        setCommentdata(null);
                    }
                    else{
                        setCommentdata(data.data);
                    }
                    
                    console.log(commentdata);
                }
                else{
                    toast.success("error occur ")
                }
            }
            fetchdata();
        }
    },[viewcomment])


    return(
        <>  
        {blogContent} 
        <div className="mt-6 px-4">
            <div className="flex items-center justify-start space-x-4 mb-4">
            <button className={`flex items-center px-3 py-1 bg-white rounded-full shadow hover:bg-gray-100 transition `} value="like" onClick={()=> handleReaction("like")}>
                <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span className="ml-1 text-sm">{like || 0}</span>
            </button>
            <button className={`flex items-center px-3 py-1 bg-white rounded-full shadow hover:bg-gray-100 transition `} value="dislike" onClick={()=> handleReaction("dislike")} >
                <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5 0h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2.5" />
                </svg>
                <span className="ml-1 text-sm">{dislike || 0}</span>
            </button>
            </div>

            <div className="relative flex items-center mb-4">
                <input 
                    type="text" 
                    value={comment}
                    placeholder="Add a comment..." 
                    className="block w-full rounded-full border border-gray-300 pl-4 pr-10 py-1.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e)=>setComment(e.target.value)}
                />
                <button className="absolute right-2 text-indigo-600 hover:text-indigo-500" onClick={handlecomment}>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>

            <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 font-medium mb-6"
                onClick={()=>setViewcomemnt((prev)=>(!prev))}
            >
                {(!viewcomment) ? "View comments": "Hidden Comments" }
            </button>
            {viewcomment && (
                <div className="space-y-3">
                    {commentdata != null &&
                    commentdata.map((obj) =>
                        obj.com_Add.map((com) => (
                        <div
                            key={Math.random()}
                            className="p-3 bg-gray-100 rounded-lg shadow-sm border border-gray-200"
                        >
                            <p className="text-sm text-gray-700">{com}</p>
                        </div>
                        ))
                    )}
                </div>
            )}


        </div>
    </>
    )
}

export default Description;