import dotenv from "dotenv";
dotenv.config()
import { Sequelize } from "sequelize-typescript";
import pg from "pg"; // 👈 importa pg explícitamente

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  dialectModule: pg, // 👈 esto le dice a Sequelize que use el pg importado
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  models: [__dirname + '/../models/**/*'],
  logging: false
})

export default db