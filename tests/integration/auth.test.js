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
        expect(res.body.password).toBeUndefined();
    });
});

describe("POST /auth/register - duplicate email", () => {
    it("should reject registering with an email that already exists", async () => {
        const email = "duplicado@gmail.com";

        await request(app)
            .post("/auth/register")
            .send({ name: "Primeiro", email, password: "Senha@123" });

        const res = await request(app)
            .post("/auth/register")
            .send({ name: "Segundo", email, password: "Senha@123" });

        expect(res.status).toBe(409);
        expect(res.body.error).toBe("Email already registered");
    });
});

describe("POST /auth/login - success", () => {
    it("logging into the server", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "joao.silva@gmail.com",
                password: "Senhaaaaaa@123"
            });

        expect(res.status).toBe(200);

        expect(typeof res.body.token).toBe("string");
        expect(res.body.token).toBeDefined();

        expect(res.body.user.name).toBe("Joao Silva");
        expect(res.body.user.email).toBe("joao.silva@gmail.com");
    });
});

describe("POST /auth/login - wrong password", () => {
    it("should reject login with correct email but wrong password", async () => {
        await request(app)
            .post("/auth/register")
            .send({ name: "Maria", email: "maria@gmail.com", password: "Senha@123" });

        const res = await request(app)
            .post("/auth/login")
            .send({ email: "maria@gmail.com", password: "SenhaErrada@123" });

        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Invalid email or password");
    });
});

describe("POST /auth/login - nonexistent email", () => {
    it("should reject login with an email that was never registered", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({ email: "naoexiste@gmail.com", password: "Senha@123" });

        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Invalid email or password");
    });
});

describe("Full flow - register, login and access protected route", () => {
    it("should allow a registered user to log in and access their tasks", async () => {
        await request(app)
            .post("/auth/register")
            .send({ name: "Pedro", email: "pedro@gmail.com", password: "Senha@123" });

        const loginRes = await request(app)
            .post("/auth/login")
            .send({ email: "pedro@gmail.com", password: "Senha@123" });

        const token = loginRes.body.token;
        const tasksRes = await request(app)
            .get("/tasks")
            .set(`Authorization`, `Bearer ${token}`);

        expect(tasksRes.status).toBe(200);
        expect(Array.isArray(tasksRes.body)).toBe(true);
    });
});