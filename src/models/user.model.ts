import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; 
export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  role: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: string;

  public toJSON(): UserAttributes {
    return {
      id: this.getDataValue('id'),
      username: this.getDataValue('username'),
      password: this.getDataValue('password'),
      role: this.getDataValue('role')
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "utilisateur",
    },
  },
  {
    sequelize,
    tableName: "User",
  }
);
