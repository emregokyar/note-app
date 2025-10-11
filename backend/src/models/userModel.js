import pool from "../config/db.js";

async function findUserByEmail(email) {
  try {
    const result = pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if ((await result).rows.length > 0) {
      return (await result).rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error looking for user: ", error);
    return null;
  }
}

async function createUser(email, password) {
  try {
    const result = pool.query(
      "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      [email, password]
    );
    if ((await result).rows.length > 0) {
      return (await result).rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating user: ", error);
    return null;
  }
}

async function createGoogleUser(email) {
  try {
    const result = pool.query(
      "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
      [email, "google"]
    );
    if ((await result).rows.length > 0) {
      return (await result).rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating user with google: ", error);
    return null;
  }
}

export { findUserByEmail, createGoogleUser, createUser };
