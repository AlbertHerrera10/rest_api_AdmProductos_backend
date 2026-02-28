import dotenv from "dotenv";
dotenv.config() 
import { Sequelize } from "sequelize-typescript";

const db = new Sequelize(process.env.DATABASE_URL!,{
    dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // necesario para Supabase
    }
  },
    models: [__dirname + '/../models/**/*'],
    logging: false
})

export default db