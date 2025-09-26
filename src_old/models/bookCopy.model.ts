import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Book } from "./book.model";

export class BookCopy extends Model {
  public id!: number;
  public bookId!: number;
  public status!: "available" | "borrowed" | "reserved";
}

BookCopy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "book_id",
    },
    status: {
      type: DataTypes.ENUM("available", "borrowed", "reserved"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "BookCopies",
  }
);

// Relation avec le modèle Book
BookCopy.belongsTo(Book, { foreignKey: "bookId", as: "book" });