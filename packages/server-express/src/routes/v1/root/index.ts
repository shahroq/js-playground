import express from "express";
import type { NextFunction, Response } from "express";
import { config, loggerService, utils } from "@/common/container";

const appRouter = express.Router();

// home
appRouter.get("/", (_: any, res: Response) => {
  loggerService.info(`Here at home!`);
  res.send(`API Sandbox Home: Hello World [${utils.formatISO()}]`);
});

// health
appRouter.get("/health", (req: any, res: Response) => {
  res.json({ ok: true, environment: config.env });
});

// sandbox
appRouter.get("/sandbox", async (_: any, res: Response, next: NextFunction) => {
  let data = null;

  /*
    const mail = {
      to: config.mailer.admin_email,
      subject: "Sandbox",
      text: "Sent from sand box",
    };
    await mailer.send(mail).catch((error) => new AppError("Mailtrap Error."));
    res.json("mail sent!");
    */
  /*
    let error = null;
    let errorApp = null;

    error = new Error("error sent from sandbox");
    errorApp = new AppError("custom error sent from sandbox", {
      statusCode: 455,
    });
    data = { x: 1 };

    // throw error;
    // next(error);

    // throw errorApp;
    // next(errorApp);

    */

  res.json(data);
});

export default appRouter;
