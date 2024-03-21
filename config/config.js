module.exports = {
  HOST: "dpg-cmifpeeg1b2c73d551eg-a",
  PORT: "5432",
  USER: "root",
  PASSWORD: "VdYkUExhD7Wn3SsSsuOSzbsrsbwWA1e7",
 // DB: "ckyc_db_uat",
  DB: "school_app_wm64",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
};
