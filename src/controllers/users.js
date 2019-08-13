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

export default { getAllUsers };
