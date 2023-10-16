import type {NextRequest} from "next/server";
import type {NextFetchEvent} from "next/server";

import {NextResponse} from "next/server";
import {decodeJwt} from "jose";
export const runtime = "nodejs";

const validateTokenExp = (exp) => {
  const expToSeconds = Number(String(exp) + "000");
  var now = new Date();
  var nowIso = now.toISOString();
  var nowInMilliseconds = Date.parse(nowIso);

  if (expToSeconds < nowInMilliseconds) throw new Error("Token has expired");

  return;
};

export const validateToken = async (token) => {    
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

export async function middleware(req: NextRequest, context: NextFetchEvent) {
  const access_token = req.cookies.get("token");
  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  if (!access_token) {
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  }

  try {
    const decoded = decodeJwt(access_token.value);
    const expValidation = validateTokenExp(decoded.exp);

    context.waitUntil(
      validateToken(access_token.value)
        .then((response) => {
          if (response.status !== 200) throw new Error("invalid token");
        })
        .catch((error) => {
          throw new Error("There was an error");
        }),
    );
    url.pathname = `/chat`;
    return NextResponse.next();
  } catch (error) {
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/chat/:path*"],
};
