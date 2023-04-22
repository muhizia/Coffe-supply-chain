const { removeUndefined, generateShipmentID } = require('../util/validate')

describe("removeUndefined of an items", () => {
    test("It should return {firstName:'John', lastName:'Doe'}", () => {
        expect(removeUndefined({firstName:"John", lastName:"Doe"})).toEqual({firstName:"John", lastName:"Doe"})
    })
    test("It should return {} 1", () => {
        expect(removeUndefined({})).toEqual({})
    })
    test("It should return {} 2", () => {
        expect(removeUndefined({firstname: undefined})).toEqual({})
    })
    test("It should return {} 3", () => {
        expect(removeUndefined({firstname: ''})).toEqual({})
    })
})


describe("generateShipmentID", () => {
    test("It should return SHP001", () => {
        expect(generateShipmentID(undefined)).toBe(undefined)
    })
    test("It should return undefined", () => {
        expect(generateShipmentID({})).toEqual(undefined)
    })
    test("It should return undefined 2", () => {
        expect(generateShipmentID('')).toEqual(undefined)
    })
    test("It should return undefined 3", () => {
        expect(generateShipmentID({shipment_id: ""})).toEqual(undefined)
    })
    test("It should return undefined 4", () => {
        expect(generateShipmentID({shipment_id: {"SHTtt": ""}})).toEqual(undefined)
    })
    test("It should return undefined 5", () => {
        expect(generateShipmentID({shipment_id:  "hello"})).toEqual(undefined)
    })
})






//   describe("DELETE /producer/:id", () => {
//     it("should delete a product", async () => {
//       const res = await request(app).delete(
//         "/api/products/6331abc9e9ececcc2d449e44"
//       );
//       expect(res.statusCode).toBe(200);
//     });
//   });
/* Closing database connection after each test. */
afterEach(async () => {

});