const userController = require("./userController");
const testInit = require("../../test/init");
const sinon = require("sinon");
const sandbox = sinon.createSandbox();

describe("integration tests", () => {
  let db;
  function clearDatabase() {
    return db.query("DELETE FROM users");
  }

  beforeAll(() => {
    sandbox.stub(console, "error");
    return testInit.initDb().then(database => {
      db = database;
    });
  }),
    beforeEach(() => {
      return clearDatabase();
    }),
    afterAll(() => {
      sandbox.restore();
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
        },
        session: {
          user: {}
        }
      };
      const res = {
        send: function(data) {
          expect(data).toMatchObject({
            first: "Evan",
            last: "Boggs",
            developer: true,
            email: "evan@evan.com"
          });
          done();
        },
        status(num) {
          expect(num).toBe(200);
          return this;
        }
      };
      userController.register(req, res);
    });

    it("responds with an error on user already existing", done => {
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
        },
        session: {
          user: {}
        }
      };
      const res = {
        send: function(data) {
          expect(data).toEqual("Email already exists!");
          done();
        },
        status(num) {
          expect(num).toBe(500);
          return this;
        }
      };
      userController.register(req, res);
    });
  });
});
