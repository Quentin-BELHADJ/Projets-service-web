require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
console.log("🚀 Initialisation du modèle User");
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
		logging: false,
	}
);
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false }
});

module.exports = { User, sequelize };