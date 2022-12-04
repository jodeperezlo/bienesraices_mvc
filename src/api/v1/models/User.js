// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { dbConnection } from '../../../config/database.js';

const User = dbConnection.define(
  'User',
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Token: {
      type: DataTypes.STRING,
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
      },
    },
  }
);

export default User;
