import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import request from "supertest";
import app from "../src/app.js";

describe("POST /auth/register", () => {
    it("deve rejeitar senha fraca", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "Joao",
                email: "gsilva04950@<>gmail.com",
                password: "123"
            });

        expect(res.status).toBe(400);
    });
});