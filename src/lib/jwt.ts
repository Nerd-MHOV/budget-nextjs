import jwt, { JwtPayload } from "jsonwebtoken";
import {NextResponse} from "next/server";

interface SignOptions {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: "1h",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function verifyRoute(request: Request, isAdmin = false) {
  const accessToken = request.headers.get("accessToken");
  const isVerifyJwt = verifyJwt(accessToken ?? "");
  const response = NextResponse.json({error: "unauthorized"}, {status: 401}
  );

  if (!accessToken || !isVerifyJwt) {
    return response
  }

  if(isAdmin && isVerifyJwt.level < 2) {
    return response
  }
}
