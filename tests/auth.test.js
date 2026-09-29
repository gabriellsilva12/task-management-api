import request from "supertest";
import app from "../src/app.js";

describe("GET /", () => {
    it("return that the API is running", async () => {
        const res = await request(app).get("/");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("API to-do-list running");
    });
});

describe("GET /tasks", () => {
    it("block request without token", async () => {
        const res = await request(app).get("/tasks");

        expect(res.status).toBe(401);
    });

    it("block invalid token", async () => {
        const res = await request(app)
            .get("/tasks")
            .set("Authorization", "Bearer token-inventado");

        expect(res.status).toBe(401);
    });
});

describe("POST /auth/register", () => {
    it("reject weak password", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "Joao",
                email: "joao@gmail.com",
                password: "123"
            });

        expect(res.status).toBe(400);
    });

    it("reject invalid name", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "Joao123",
                email: "joao@gmail.com",
                password: "Senha@123"
            });

        expect(res.status).toBe(400);
    });

    it("reject name longer than 30 characters", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "Joao".repeat(10),
                email: "joao@gmail.com",
                password: "Senha@123"
            });

        expect(res.status).toBe(400);
    });

    it("reject register without name", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                email: "joao@gmail.com",
                password: "Senha@123"
            });

        expect(res.status).toBe(400);
    });

    it("reject register with empty body", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({});

        expect(res.status).toBe(400);
    });

    it("reject name with script tags (XSS attempt)", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "<script>alert(1)</script>",
                email: "joao@gmail.com",
                password: "Senha@123"
            });

        expect(res.status).toBe(400);
    });

    it("reject email with script injection attempt", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "Joao",
                email: "<script>alert(1)</script>@gmail.com",
                password: "Senha@123"
            });

        expect(res.status).toBe(400);
    });

    it("reject malformed email", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: "Joao",
                email: "nao-e-um-email",
                password: "Senha@123"
            });

        expect(res.status).toBe(400);
    });

    it("reject register with non-string fields", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                name: 12345,
                email: "joao@gmail.com",
                password: "Senha@123"
            });

        expect(res.status).toBe(400);
    });

    it("reject malformed JSON body", async () => {
        const res = await request(app)
            .post("/auth/register")
            .set("Content-Type", "application/json")
            .send('{"name": "Joao", "email": }');

        expect(res.status).toBe(400);
    });
});

describe("POST /auth/register - password rules", () => {
    const validBase = { name: "Joao", email: "joao@gmail.com" };

    it("reject password without uppercase", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validBase, password: "senha@123" });

        expect(res.status).toBe(400);
    });

    it("reject password without lowercase", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validBase, password: "SENHA@123" });

        expect(res.status).toBe(400);
    });

    it("reject password without number", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validBase, password: "Senha@abc" });

        expect(res.status).toBe(400);
    });

    it("reject password without special character", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validBase, password: "Senha1234" });

        expect(res.status).toBe(400);
    });

    it("reject password shorter than 8 characters", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validBase, password: "S1@a" });

        expect(res.status).toBe(400);
    });

    it("reject password longer than 64 characters", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validBase, password: "Senha@123".repeat(10) });

        expect(res.status).toBe(400);
    });

    it("reject password with spaces", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({ ...validBase, password: "Senha @123" });

        expect(res.status).toBe(400);
    });
});

describe("POST /auth/login", () => {
    it("reject login without password", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "joao@gmail.com" });

        expect(res.status).toBe(400);
    });

    it("reject login without email", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ password: "Senha@123" });

        expect(res.status).toBe(400);
    });

    it("reject login with password as number", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "joao@gmail.com", password: 123456 });

        expect(res.status).toBe(400);
    });
});