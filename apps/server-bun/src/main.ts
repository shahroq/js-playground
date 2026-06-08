import { serve } from "bun";
import data from "../packages/json/catalog.json";

const port = 3000;

const users = data.users;

// type Handler = (req: Request) => Response | Promise<Response>;
// type Routes = Record<string, Handler | Response>;
// type RoutesStrict = Record<string, Handler>;
// type RoutesWMethods = Record<string, Handler2>;

const routes = {
  "/": () => new Response("Home"),
  "/users/:id": (req) => {
    const id = req?.params?.id;
    return Response.json(users[0]);
  },
  // "/users": (req) => Response.json(users),
  "/users": {
    GET: (req) => Response.json(users),
    POST: async (req) => {
      const body = await req.json();
      // save the user
      // ...
      return Response.json(body);
    },
  },
  "/*": () => new Response("Root catchall"),
};

const server = serve({
  development: true,
  port,
  routes,
  fetch(req) {
    return new Response("Not Found!", { status: 404 });
  },
});

// console.log(server);
console.log(`🔥 Server w/routes running at http://localhost:${port}`);
