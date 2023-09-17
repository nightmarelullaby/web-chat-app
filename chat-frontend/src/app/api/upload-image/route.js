import { NextResponse } from "next/server";
import {cookies} from "next/headers";
    
export async function POST(req,res){
    const cookieStore = cookies();
    const {value} = cookieStore.get("token");
    
    const formData = await req.formData()
    let headersList = {
        "Accept": "*/*",
        "Cookie":"token="+value,
        "Content-Type": "multipart/form-data",
    }
    let response = await fetch(process.env.LOCAL_BACKEND+"/api/upload-image", { 
        method: "POST",
        headers: headersList,
        body:formData,
      });
    const json = await response.json()
    if(response.response !== 200){
        return NextResponse.json({error:"error has ocurred"})
    }
    return NextResponse.json(json)
}