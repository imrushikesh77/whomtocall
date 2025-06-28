import knexfile from "../knexfile.js";
import knex from "knex";

const env = process.env.NODE_ENV || "development";
const db = knex(knexfile[env]);

export default db;