import { createClient } from "redis";
import Queue from "bull";
import knex from "knex";

const redisUrl = process.env.REDIS_URL;

const client = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const port = +process.env.DB_PORT;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

export const db = knex({
  client,
  connection: {
    host,
    port,
    user,
    password,
    database,
  },
});

export const redis = createClient({
  url: redisUrl,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

export function queue(q: string, opts?: Queue.QueueOptions) {
  if (!redisUrl) throw new Error("No REDIS URL!");
  return new Queue(q, redisUrl, opts);
}
