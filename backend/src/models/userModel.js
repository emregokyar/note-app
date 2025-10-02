import pool from "../config/db";

async function findUserByEmail(email) {
  try {
    const result = pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return (await result).rows[0];
  } catch (error) {
    console.error("Error Creating user: ", error);
    return null;
  }
}

async function createUser(email, password) {
  try {
    const result = pool.query(
      "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      [email, password]
    );
    return (await result).rows[0];
  } catch (error) {
    console.error("Error Creating user: ", error);
    return null;
  }
}

async function createGoogleUser(email) {
  try {
    const result = pool.query(
      "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      [email, "google"]
    );
    return (await result).rows[0];
  } catch (error) {
    console.error("Error Creating user: ", error);
    return null;
  }
}
