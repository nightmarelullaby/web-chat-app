import { NextResponse } from "next/server";
import {cookies} from "next/headers";
    
export async function POST(req,res){
    try{
    const cookieStore = cookies();
    const {value} = cookieStore.get("token");

    const formData = await req.formData()
    let headersList = {
        "Accept": "*/*",
        "Cookie":"token="+value,
    }
    let response = await fetch(process.env.LOCAL_BACKEND+"/api/upload-image", { 
        method: "POST",
        headers: headersList,
        body:formData,
      });
    const json = await response.json()
    console.log(json)
    if(response.status !== 200){
        return NextResponse.json({error:"error has ocurred"})
    }
    return NextResponse.json(json)    
}catch(error){
    return NextResponse.json({error:error.message},{status:500})    
}
    
}