import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  role: string; // Ajout du champ "role"
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: string; // Ajout du champ "role"
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
  }
);

// Synchronisation de la base de données
(async () => {
  await sequelize.sync({ alter: true });

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "gerant", password: "gerant123", role: "gerant" },
    { username: "utilisateur", password: "user123", role: "utilisateur" },
  ];

  for (const user of users) {
    const existingUser = await User.findOne({ where: { username: user.username } });
    if (!existingUser) {
      await User.create(user);
      console.log(`Utilisateur créé : ${user.username} avec le rôle ${user.role}`);
    }
  }
})();