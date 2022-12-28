import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "sunnysession",
  password: process.env.COOKIE_PASSWORD!,
};

//function to get sesstion from api route
export function withApiSesssion(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
