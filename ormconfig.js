require('dotenv/config');

module.exports = {
   "type": process.env.DATABASE_TYPE,
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_DB,
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entities/**/*.ts"
    ],
    "migrations": [
       "src/database/migration/**/*.ts"
    ],
    "subscribers": [
       "src/database/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entities",
       "migrationsDir": "src/database/migration",
       "subscribersDir": "src/database/subscriber"
    }
 }