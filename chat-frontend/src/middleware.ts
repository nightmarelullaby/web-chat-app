import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {getUserInformation} from '@/services/getUserInformation';
 
export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("token")
  if(!access_token){
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  }
  try{
    const tokenValidation = await getUserInformation()
    return NextResponse.next();
  }catch(error){
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  }

}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/chat/:path*']
};