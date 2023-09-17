import { NextResponse } from "next/server";

export async function POST(req,res){
    const formData = await req.formData()

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