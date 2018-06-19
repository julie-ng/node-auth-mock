import faker from 'faker/locale/de';
import { User } from './user.collection';

const AuthService = {
  login: function (name, pass) {
    if (User.validate(name, pass)) {
      return {
        name: faker.name.findName()
      };
    }
    throw 'Invalid login credentials';
  },

  userExists: function (name) {
    return User.exists(name);
  }
};

export { AuthService };
