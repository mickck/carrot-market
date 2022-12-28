import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
export default function withHandler(method: "GET" | "POST" | "DELETE", fn: (req: NextApiRequest, res: NextApiResponse) => void) {
  //method, function
  return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
    if (req.method !== "POST") {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ error });
    }
  };
}
