import { Users } from '../users.js';
import { Roles } from 'meteor/alanning:roles';

Users.before.insert((userId, doc) => {
  const users = Users.find();

  doc.profile = {
    language: 'en' // DEFAULT LANGUAGE EN
  };
});

Users.after.insert((userId, doc) => {
  const users = Users.find();

  // The first register that users must have admin.
  if (_.isEqual(users.count(), 1)) {

    // ADD ROLE
    Roles.addUsersToRoles(doc._id, 'admin');
  }
});
