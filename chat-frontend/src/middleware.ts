import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 import {cookies} from "next/headers";

export const validateUser = async (token) => {
  let headersList = {
    "Accept": "*/*",
    "Cookie":`token=${token}`,
    "Content-Type": "application/json"
  }
let response = await fetch(process.env.LOCAL_BACKEND+ "/api/auth/verify", { 
  method: "GET",
  headers: headersList
});
if(response.status !== 200){
    const {message} = await response.json()
    throw new Error("error!",message)
  } 
  const responseParsed = await response.json()
  return responseParsed
}


export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("token")
  if(!access_token){
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  }
  if(access_token){
    try{
    const tokenValidation = await validateUser(access_token.value)
    return NextResponse.next();
    } catch(error){
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      return NextResponse.redirect(url);
    }  
  }
  

}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/chat/:path*']
};