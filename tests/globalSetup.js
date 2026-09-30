import { config } from "dotenv";

config({ path: ".env.test" });

await import("../src/models/User.js");
await import("../src/models/Task.js");

const { syncDatabase } = await import(
    "../src/config/database.js"
);

export default async function () {
    await syncDatabase(true);
}