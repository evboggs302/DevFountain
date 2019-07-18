const marketplaceController = require("../../../server/controllers/marketplaceController");
const testInit = require("../../../test/init");
const sinon = require("sinon");
const sandbox = sinon.createSandbox();

describe("integration tests", () => {
  let db;
  function clearUsersFromDatabase() {
    return db.query("DELETE FROM users");
  }

  beforeAll(() => {
    sandbox.stub(console, "error");
    return testInit.initDb().then(database => {
      db = database;
    });
  }),
    beforeEach(() => {
      return clearUsersFromDatabase();
    }),
    afterAll(() => {
      sandbox.restore();
    });

  //HECTOR
  describe("get all developers", () => {
    it("SUCCESSFUL All devs", done => {
      let data = {
        user_id: 157,
        email: "Hec@tor.com",
        first: "Hector",
        last: "Silva",
        title: null,
        developer: true,
        linkedin: null,
        portfolio: null,
        profile_pic: null,
        password: "joejoejoe"
      };
      const req = {
        app: {
          get: () => db
        }
      };
      const res = {
        send: function() {
          // console.log(data)
          expect(data).toMatchObject({
            user_id: 157,
            email: "Hec@tor.com",
            first: "Hector",
            last: "Silva",
            title: null,
            developer: true,
            linkedin: null,
            portfolio: null,
            profile_pic: null,
            password: "joejoejoe"
          });
          done();
        },
        status(num) {
          expect(num).toBe(200);
          return this;
        }
      };
      marketplaceController.allUsers(req, res);
    });

    it("ERROR cannot get devs", done => {
      const insertDumbyData = `INSERT INTO users(first, last, developer, email, password)
                values
                ('Hector', 'Silva', true, 'Hec@tor.com', 'joejoejoe');`;
      const req = {
        app: {
          get: () => db
        }
      };
      const res = {
        send: function(data) {
          expect(data).toEqual("there was an error");
          done();
        },
        status(num) {
          expect(num).toBe(500);
          return this;
        }
      };
      db.query(insertDumbyData).then(() =>
        marketplaceController.allUsers(req, res)
      );
    });
  });
});
