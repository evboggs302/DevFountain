const userController = require("./userController");
const testInit = require("../../test/init");
const sinon = require("sinon");
const sandbox = sinon.createSandbox();

describe("integration tests", () => {
  let db;
  function clearDatabase() {
    return db.query("DELETE FROM movies");
  }

  beforeAll(() => {}), beforeEach(() => {}), afterAll(() => {});
});

// EVAN
describe("register new user success", () => {
  it("responds with new user", done => {
    const req = {
      app: {
        get: () => db
      },
      body: {
        first: "Evan",
        last: "Boggs",
        developer: true,
        email: "evan@evan.com",
        password: "eboggs123456789"
      }
    };
    const res = {
      json: function(data) {
        expect(data).toMatchObject({
          first: "Evan",
          last: "Boggs",
          developer: true,
          email: "evan@evan.com"
        });
        done();
      }
    };
    userController.register(req, res);
  });

  it("responds with an error on user already existing", done => {});
});
