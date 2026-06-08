import { serve } from "bun";
import data from "../data/data.json";
import fs from "fs";

const port = 3000;
const users = data.users;
const about = fs.readFileSync("public/about.html", "utf8");

const server = serve({
  development: true,
  port,
  fetch(req) {
    // console.log(req);
    const url = new URL(req.url);
    // console.log(url);
    switch (url.pathname) {
      case "/":
        return new Response("Home");
      case "/about":
        return new Response(about);
      case "/users":
        return Response.json(users);
      default:
        return new Response("Path not exist A", { status: 404 });
    }

    return new Response("Hi!");
  },
});

console.log(`🔥 Server w/plain running at http://localhost:${port}`);
