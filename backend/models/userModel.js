import pool from "../config/db";

//try indexing to simulate million users
export async function findUserByEmail(email) {
  try {
    const result = await pool.query("SELECT * FROM user WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}
