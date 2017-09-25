import { User } from '~/user.collection'

describe ('Users collection', () => {
  beforeEach(() => {
    User.set('hello', 'world')
  })

  afterEach(() => {
    User.unset('hello')
  })

  it ('can set users via environment varialbes', () => {
    expect(process.env['USER_HELLO']).toBeDefined()
  })

  it ('can unset users', () => {
    User.unset('hello')
    expect(process.env['USER_HELLO']).not.toBeDefined()
  })

  it ('can check if a user exists', () => {
    expect(User.exists('hello')).toBe(true)
    expect(User.exists('world')).toBe(false)
  })

  it ('can get user passwords', () => {
    expect(User.getPassword('hello')).toEqual('world')
  })

  it ('can validate credentials', () => {
    expect(User.validate('hello', 'world')).toBe(true)
    expect(User.validate('hello', 'wrongPassword')).toBe(false)
    expect(User.validate('notAUser', 'noPassword')).toBe(false)
  })
})
