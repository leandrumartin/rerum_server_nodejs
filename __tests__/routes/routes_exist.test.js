let request = require("supertest")

//Fun fact, if you don't require app, you don't get coverage even though the tests run just fine.
let app = require('../../app')

//A super fun note.  If you do request(app), the tests will fail due to race conditions.  
//client.connect() in db-controller.js will not finish before some calls to the routes.  So strange.
//request = request(app)
request = request("http://localhost:3333")

/**
 * All the routes that work for GET requests or paths to HTML pages.
 */ 

describe('Top level routing -- no CRUD API checks in here.', function() {

  it('http://{server}:{port}/ -- Server index.  HTML page with with Express "hello world". ', function(done) {
    request
      .get('/')
      .expect('Content-Type', /html/)
      .expect('X-Powered-By', 'Express')
      .expect(200, done)
  })

  it('http://{server}:{port}/v1/ -- App index.  Responds with a JSON object as a "hello world". ', function(done) {
    request
      .get("/v1")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .then(response => {
          expect(response.body.message).toBe('Welcome to v1 in nodeJS!')
          done()
      })
      .catch(err => done(err))
  })

  it('http://{server}:{port}/v1/api/ -- RERUM API index.  Responds with a JSON object as a "hello world". ', function(done) {
    request
      .get("/v1/api")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
          expect(Object.keys(response.body.endpoints).length).toBe(7)
          done()
      })
      .catch(err => done(err))
  })

  it('http://{server}:{port}/v1/id/{_id} -- RERUM object URL GET by _id pattern.', function(done) {
    request
      .post('/v1/id/1111')
      .expect(405, done)
  })

  it('http://{server}:{port}/maintenance.html -- RERUM API maintenance page. ', function(done) {
    request
    .get("/maintenance.html")
    .expect("Content-Type", /html/)
    .expect(200, done)
  })

  it('http://{server}:{port}/v1/context.json -- RERUM API context.json. ', function(done) {
    request
    .get("/v1/context.json")
    .expect("Content-Type", /json/)
    .expect(200, done)
  })

  it('http://{server}:{port}/v1/terms.txt -- RERUM API vocabulary terms. ', function(done) {
    request
    .get("/v1/terms.txt")
    .expect("Content-Type", /text/)
    .expect(200, done)
  })

  it('http://{server}:{port}/v1/API.html -- RERUM API HTML page. ', function(done) {
    request
    .get("/v1/API.html")
    .expect("Content-Type", /html/)
    .expect(200, done)
  })

})

describe('Checking each CRUD enpoint exists behind /api', function() {

  it('/create', function(done) {
    request
      .get('/v1/api/create')
      .expect(405, done)
  })

  it('/update', function(done) {
    request
      .get('/v1/api/update')
      .expect(405, done)
  })

  it('/patch', function(done) {
    request
      .get('/v1/api/patch')
      .expect(405, done)
  })

  it('/set', function(done) {
    request
      .get('/v1/api/set')
      .expect(405, done)
  })

  it('/unset', function(done) {
    request
      .get('/v1/api/unset')
      .expect(405, done)
  })

  it('/delete', function(done) {
    request
      .get('/v1/api/delete')
      .expect(405, done)
  })

  it('/query', function(done) {
    request
      .get('/v1/api/query')
      .expect(405, done)
  })

})