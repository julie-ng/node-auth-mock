const User = {
  getPassword: function (name) {
    return process.env[usernameEnvVar(name)]
  },

  exists: function (name) {
    return process.env.hasOwnProperty(usernameEnvVar(name))
  },

  set: function (name, pass) {
    process.env[usernameEnvVar(name)] = pass
  },

  unset: function (name) {
    delete process.env[usernameEnvVar(name)]
  },

  validate: function (name, pass) {
    return this.getPassword(name) === pass
  }
}

function usernameEnvVar (name) {
  return `USER_${name.toUpperCase()}`
}

export { User }
