import Bao from "baojs";
import { queue } from "./lib";

const app = new Bao();
const port = parseInt(process.env.PORT || "8080");

const q = queue("");

q.process((job, done) => {
  console.log(job);
  done();
});

app.get("/", (ctx) => {
  return ctx.sendText("Hello world from Bao.js running on Railway!");
});

const server = app.listen({ port });
console.log(`Server listening on ${server.hostname}:${port}`);
