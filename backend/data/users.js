import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Roland Sidamonidze',
    email: 'rolandsidamonidze@gmail.com',
    password: bcrypt.hashSync('123', 10),
  },
];

export default users;
