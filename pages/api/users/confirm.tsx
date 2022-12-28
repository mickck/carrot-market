import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSesssion } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  console.log(token);
  if (!foundToken) return res.status(404).end();
  //put user id in req.ssession.user
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();
  // console.log(exists);
  //delete token
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  res.json({ ok: true });
}

export default withApiSesssion(withHandler("POST", handler));
