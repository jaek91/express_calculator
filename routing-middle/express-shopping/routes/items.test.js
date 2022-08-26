process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

//sample JSON data to send to test client
let cheerios = { name: "Cheerios", price: 5.52};
let lucky_charms = { name: "Lucky Charms", price: 6.20};

beforeEach(function () {
  items.push(cheerios);
  items.push(lucky_charms);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all current items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [cheerios, lucky_charms] })
  })
})

describe("GET /items/:name", () => {
  test("Get items by name", async () => {
    const res = await request(app).get(`/items/${cheerios.name}`);
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(cheerios)
  })
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/cereal`);
    expect(res.statusCode).toBe(404)
  })
})

describe("POST /items", () => {
  test("Creating an item", async () => {
    const res = await request(app).post("/items").send({ name: "Kashi", price: 6.75});
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "Kashi", price: 6.75 } });
  })
  test("Responds with 400 if item is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
  })
})

describe("/PATCH /items/:name", () => {
  test("Updating an item's name", async () => {
    const res = await request(app).patch(`/items/${cheerios.name}`).send({name: "Honey Nut Cheerios"});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({updated: {name: "Honey Nut Cheerios", price: 5.52}});
  })
  test("Responds with 404 for item with invalid name", async () => {
    const res = await request(app).patch(`/items/hostess`).send({name: "Cakes", price:5.20});
    expect(res.statusCode).toBe(404);
  })
})

describe("/DELETE /items/:name", () => {
  test("Deleting the lucky charms cereal", async () => {
    const res = await request(app).delete(`/items/${lucky_charms.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
  })
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/life`);
    expect(res.statusCode).toBe(404);
  })
})