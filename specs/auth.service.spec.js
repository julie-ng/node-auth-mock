import { AuthService } from '~/auth.service'
import { User } from '~/user.collection'

describe ('AuthService', () => {
  beforeAll (() => {
    User.set('foo', 'bar')
  })

  afterAll (() => {
    User.unset('foo')
  })

  describe ('login()', () => {
    context ('user exists', () => {
      context ('with valid credentials', () => {
        it ('returns a user object', () => {
          let result = AuthService.login('foo', 'bar')
          expect(typeof result).toEqual('object')
          expect(result.hasOwnProperty('name')).toBe(true)
        })
      })

      context ('with invalid credentials', () => {
        it ('throws an error', () => {
          expect(() => {
            AuthService.login('foo', 'badPassword')
          }).toThrow('Invalid login credentials')
        })
      })
    })

    context ('user does not exist', () => {
      it ('returns undefined', () => {
        expect(() => {
          AuthService.login('doesNotExist', 'pass')
        }).toThrow()
      })
    })
  })

  describe ('userExists()', () => {
    context ('user exists', () => {
      it ('returns true', () => {
        expect(AuthService.userExists('foo')).toBe(true)
        expect(AuthService.userExists('FOO')).toBe(true)
      })
    })
    context ('user does not exist', () => {
      it ('returns false', () => {
        expect(AuthService.userExists('hello')).toBe(false)
      })
    })
  })
})
