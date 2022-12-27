import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

// handle the views
async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  return res.status(200).end();
}

export default withHandler("POST", handler);
