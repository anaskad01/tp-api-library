import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  define: {
    timestamps: false,
  },
  storage: "./library.sqlite", 
});

export default sequelize;