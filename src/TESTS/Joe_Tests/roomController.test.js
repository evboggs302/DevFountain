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

  describe("create new Room", () => {
    it("SUCCESSFUL NEW ROOM", done => {
      const req = {
        app: {
          get: () => db
        },
        body: {},

        params: {
          email2: "josh@josh.com"
        },

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
      messageController.createRoom(req, res);
    });

    it("error", done => {
      const insertDummyData = `INSERT INTO rooms(first_email, second_email, room_name)
           values
           ('joejoe@joe.com', 'joshjosh@josh.com', 'joejoe@joe.comjoshjosh@josh.com')`;
      const req = {
        app: {
          get: () => db
        },
        body: {},

        params: {
          email2: "joshjosh@josh.com"
        },

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
      db.query(insertDummyData).then(() =>
        messageController.createRoom(req, res)
      );
    });
  });
});
