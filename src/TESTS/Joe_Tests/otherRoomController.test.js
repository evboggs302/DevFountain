const messageController = require("../../../server/controllers/messageController");
const testInit = require("../../../test/init");
const sinon = require("sinon");
const sandbox = sinon.createSandbox();

describe("integration tests", () => {
  let db;
  function clearDatabase() {
    return db.query("DELETE FROM rooms");
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

  describe("get rooms", () => {
    it("SUCCESSFUL GET ROOMS", done => {
      const req = {
        app: {
          get: () => db
        },
        body: {},

        session: {
          user: {
            email: "joe@joe.com"
          }
        }
      };
      const res = {
        send: function(data) {
          expect(data).toMatchObject({
            first_email: "joe@joe.com",
            second_email: "josh@josh.com",
            room_name: "joe@joe.comjosh@josh.com"
          });
          done();
        },
        status(num) {
          expect(num).toBe(200);
          return this;
        }
      };
      db.query().then(() => messageController.getMyRooms(req, res));
    });
    it("error", done => {
      const req = {
        app: {
          get: () => db
        },
        body: {},
        session: {
          user: {
            email: "joejoe@joe.com"
          }
        }
      };
      const res = {
        send: function(data) {
          expect(data).toEqual("message");
          done();
        },
        status(num) {
          expect(num).toBe(500);
          return this;
        }
      };
      db.query().then(() => messageController.getMyRooms(req, res));
    });
  });
});
