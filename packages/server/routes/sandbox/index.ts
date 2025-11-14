import express from "express";
import type { Request, Response } from "express";
import AppError from "../../core/app-error";

const router = express.Router();

const url = `https://jsonplaceholder.typicode.com/users/`;
const url2 = `https://jsonplaceholder2.typicode.com/users/`;

/** For Testing Prrpose */
router.get("/test1", async (req: Request, res: Response, next) => {
  // res.status(200).send("hello from test 1");
  // const x = undefined; x.get();
  // throw new Error("error 1");
  // next("error 2");
  // next(new Error("error 2B"));
  // Promise.reject("error 3").catch(next);
  Promise.reject(new AppError("error 3B")).catch(next); // works w/o async decorator*
});

router.get("/test2", async (req: Request, res: Response, next) => {
  res.status(200).send("hello from test 2");
  /*
  fetch(url2 + "1")
    .then((rslt) => rslt.json())
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));

  const rslt = await fetch(url + "1");
  const data = await rslt.json();
  res.status(200).json(data);
  */
});

export default router;
