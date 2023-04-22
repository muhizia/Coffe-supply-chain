const request = require("supertest");
const app = require("../app");
request()
const { generateAccessToken } = require("../util/jwt");
/* Connecting to the database before each test. */
var token;
const user = {
    id: 1,
    email: 'muhizia4@gmail.com',
    firstname: null,
    lastname: null,
    active: 0
}
beforeEach(async () => {
    await request(app).post("/users").send({
        email: "muhizia4@gmail.com",
        password: "muhizi123",
        re_type: "muhizi123",
    })

    await request(app).post("/country").send({
        name: "Rwanda",
    })
    await request(app).post("/region").send({
        name: "Rwanda",
        country_id: 1
    })
    token = generateAccessToken(user)
});

//   /* Closing database connection after each test. */
  afterEach(async () => {
    // delete all data inserted while testing
  });

describe(" /producers", () => {

    describe("/producer ", () => {
        test("should respond with a 400 status code when region does not exist", async () => {
            const response = await request(app).post("/producer")
                .send({
                    name: "Names",
                    address: "address",
                    region_id: 10000
                })
                .set('Authorization', 'bearer ' + token)
            expect(response.statusCode).toBe(400)
        })
        test("should respond with a 400 status code without data", async () => {
            const response = await request(app).post("/producer")
                .set('Authorization', 'bearer ' + token)
            expect(response.statusCode).toBe(400)
        })
        test("should respond with a 403 status code when correct data are sent with token", async () => {
            const response = await request(app).post("/producer")
                .send({
                    name: "Names",
                    address: "address",
                    region_id: 1
                })
                .set('Authorization', 'bearer ' + token)
            expect(response.statusCode).toBe(201)
        })
    })

    describe("/producer ", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/producer")
                .set('Authorization', 'bearer ' + token)
            expect(response.statusCode).toBe(200)
        })
        test("should respond with a 401 status code without a token", async () => {
            const response = await request(app).post("/producer")
            expect(response.statusCode).toBe(401)
        })
        test("should respond with a 403 status code when invalid token", async () => {
            const response = await request(app).post("/producer")
                .set('Authorization', 'bearer token')
            expect(response.statusCode).toBe(403)
        })
    })

    describe("/producer", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/producer/100")
                .set('Authorization', 'bearer ' + token)
            expect(response.statusCode).toBe(400)
        })
        test("should respond with a 401 status code without a token", async () => {
            const response = await request(app).get("/producer/1")
            expect(response.statusCode).toBe(401)
        })
        test("should respond with a 403 status code when invalid token", async () => {
            const response = await request(app).get("/producer/1")
                .set('Authorization', 'bearer ' + token)
            expect(response.statusCode).toBe(200)
        })
    })

})