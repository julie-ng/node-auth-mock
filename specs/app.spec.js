import request from 'request'
// eslint-disable-next-line no-unused-vars
import { app } from '~/app'
import { User } from '~/user.collection'

const port = process.env.PORT || 3000

describe ('web layer', () => {
  beforeAll (() => {
    User.set('demo', 'secret')
  })

  afterAll (() => {
    User.unset('demo')
  })

  describe ('GET /', () => {
    it ('returns a 403 response', (done) => {
      request.get(url('/'), (error, response, body) => {
        expect(response.statusCode).toBe(403)
        done()
      })
    })
  })

  describe ('GET /api/status', () => {
    it ('returns a 200 response', (done) => {
      request.get(url('/api/status'), (error, response, body) => {
        expect(response.statusCode).toBe(200)
        done()
      })
    })

    it ('returns a status json', (done) => {
      request.get(url('/api/status'), (error, response, body) => {
        let res  = JSON.stringify({
          status: 200,
          message: 'healthy'
        })
        expect(response.body).toEqual(res)
        done()
      })
    })
  })

  describe ('POST /api/login', () => {
    context ('with valid credentials', () => {
      it ('returns 200 response', (done) => {
        loginRequest ('demo', 'secret', (err, res) => {
          expect(res.statusCode).toEqual(200)
          done()
        })
      })

      it ('returns some user data', (done) => {
        loginRequest ('demo', 'secret', (err, res) => {
          let user = res.body
          expect(typeof user).toEqual('object')
          expect(user.hasOwnProperty('name')).toBe(true)
          done()
        })
      })
    })

    context ('with invalid credentials', () => {
      it ('returns a 401 response', (done) => {
        loginRequest ('demo', 'wrongPassword', (err, res) => {
          expect(res.statusCode).toEqual(401)
          done()
        })
      })
    })

    context ('with an invalid username', () => {
      it ('returns a 401 response', (done) => {
        loginRequest ('doesNotExist', 'password', (err, res) => {
          expect(res.statusCode).toEqual(401)
          done()
        })
      })
    })
  })
})

function loginRequest (user, pass, callback) {
  return request.post(url('/api/login'), {
    json: true,
    body: {
      user: user,
      password: pass
    }
  },
  callback)
}

function url (path = '') {
  return `http://localhost:${port}` + path
}