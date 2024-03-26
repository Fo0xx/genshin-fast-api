import { Elysia, NotFoundError, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { genshin } from "./services/genshin";

const app = new Elysia()
  .use(swagger())
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;

      return "Not Found :(";
    }
  })
  .use(genshin)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
function async(arg0: { params: { type: any } }): any {
  throw new Error("Function not implemented.");
}
