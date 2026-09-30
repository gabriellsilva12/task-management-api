import request from "supertest";
import app from "../../src/app.js";

describe("POST /auth/register - success", () => {
    it("create a new user with valid data", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "Joao Silva",
                email: "joao.silva@gmail.com",
                password: "Senhaaaaaa@123"
            });

        expect(res.status).toBe(201);
        expect(res.body.name).toBe("Joao Silva");
        expect(res.body.email).toBe("joao.silva@gmail.com");
    });
});