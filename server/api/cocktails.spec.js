/* global describe beforeEach it */

const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Cocktail },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe("Cocktail routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/cocktails/", () => {
    it("GET /api/cocktails", async () => {
      const res = await request(app).get("/api/cocktails").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(20);
    });
  });
});
