import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; 
import { Book } from "./book.model";

export interface AuthorAttributes {
  id?: number;
  firstName: string;
  lastName: string;
}

export class Author extends Model<AuthorAttributes> implements AuthorAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;

  public toJSON(): AuthorAttributes {
    return {
      id: this.getDataValue('id'),
      firstName: this.getDataValue('firstName'),
      lastName: this.getDataValue('lastName')
    };
  }
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
  },
  {
    sequelize,
    tableName: "Author",
  }
);