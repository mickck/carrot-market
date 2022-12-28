import { withIronSessionApiRoute } from "iron-session/next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  console.log(token);
  if (!exists) res.status(404).end();
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  console.log(exists);
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "sunnysession",
  password: "8109!2381092890ssdfs9f0109asdasdasda123xxnhjhjklyuye!2",
});
