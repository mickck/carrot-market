import mail from "@sendgrid/mail";
import twilio from "twilio";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

//put apikey to sendgrid client
mail.setApiKey(process.env.SENDGRID_API_KEY!);

//put apikey, token to twilio client
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// handle the views
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 90000) + "";
  const token = await client.token.create({
    data: {
      payload,

      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);
  // if (email) {
  //   user = await client.user.findUnique({
  //     //findUnique helps find user when you use where
  //     where: {     email,
  //     },
  //   });
  //   if (user) console.log("found it.");
  //   if (!user) {
  //     console.log("Did not find. it will create.");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",    email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     //findUnique helps find user when you use where
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (user) console.log("found it.");
  //   if (!user) {
  //     console.log("Did not find. it will create.");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: "mikemwkim@gmail.com",
    //   to: "mikemwkim@gmail.com",
    //   subject: "Your Sunny Marekt Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(email);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
