/* eslint-disable no-console */
import { Users } from '../models';

function getAllUsers(req, res) {
  Users.findAll()
    .then((users) => {
      // show erron if users not avilable
      if (!users.length) {
        res.send('No users found');
      }
      // send users
      res.json(users);
    })
    .catch((error) => console.log('Error: ', error));
}

function addUser(req, res) {
  const { firstName, lastName, email } = req.body;
  Users.create({ firstName, lastName, email })
    .then((User) => res.json(User))
    .catch((error) => console.log('Error:', error));
}

export default { getAllUsers, addUser };
