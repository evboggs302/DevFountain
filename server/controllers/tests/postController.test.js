const postController = require('../postController')
const testInit = require('../../../test/init')
const sinon = require('sinon');
const sandbox = sinon.createSandbox()

describe('integration tests', () => {
    let db;
    function clearPostsFromDatabase(){
        return db.query('DELETE FROM posts');
    }

    beforeAll(() => {
        sandbox.stub(console, 'error')
        return testInit.initDb().then(database => {
            console.log(database)
            db = database;
        });
    }),
    beforeEach(() => {
        return clearPostsFromDatabase();
    }),
    afterAll(() => {
        sandbox.restore()
    });

    //HECTOR
    describe('create new post', () => {
        it('SUCCESSFUL new post', done => {
            const req = {
                app: {
                    get: () => db
                },
                body: {
                    content: 'This is the first post'
                },
                session: {
                    user: {
                        user_id: 2
                    }
                }
            }

        })
    })
})