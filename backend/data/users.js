
import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'vaxotodadze@admin.com',
    password: bcrypt.hashSync('001admin', 10),
    isAdmin: true,
  },
  {
    name: 'Roland Sidamonidze',
    email: 'rolandsidamonidze@gmail.com',
    password: bcrypt.hashSync('123', 10),
  },
];

export default users;
