import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { withApiSesssion } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { name, price, description },
    //from upload.tsx
    session: { user },
  } = req;
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "xx",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  //upload product
  res.json({
    ok: true,
    product,
  });
}

export default withApiSesssion(
  withHandler({
    method: "POST",
    handler: handler,
  })
);
