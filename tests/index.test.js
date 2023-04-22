const request = require("supertest");
const app = require("../app");
request()

/* Connecting to the database before each test. */
beforeEach(async () => {
    await request(app).post("/users").send({ 
        email: "muhizia4@gmail.com", 
        password: "muhizi123",
        re_type: "muhizi123",
      })
  });
  
//   /* Closing database connection after each test. */
//   afterEach(async () => {
//     await mongoose.connection.close();
//   });

describe("POST /users", () => {

    describe("when passed a username and password", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/login").send({ 
              email: "muhizia4@gmail.com", 
              password: "muhizi123" 
            })
            expect(response.statusCode).toBe(200)
          })
          test("should respond with a 404 status code", async () => {
            const response = await request(app).post("/login").send({ 
              email: "muhizia4@gmail.com", 
              password: "muhizid123" 
            })
            expect(response.statusCode).toBe(404)
          })
          test("should respond with a 404 status code", async () => {
            const response = await request(app).post("/login").send({ 
              email: "muhizia4@gmail.com", 
              password: "muhizid123" 
            })
            expect(response.statusCode).toBe(404)
          })
    })
  
  })
