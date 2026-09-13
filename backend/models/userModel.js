import pool from "../config/db";

export async function findUserByEmail(email) {
  try {
    const result = await pool.query(`SELECT * FROM "user" WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
}

export async function createProfileModel(profileData) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const insertProfile = await client.query(
      `INSERT INTO profile (user_id, current_savings, goal_savings, job_title, age, monthly_income) VALUES ($1, $2, $3, $4, $5 , $6) RETURNING *`,
      [
        profileData.userId,
        profileData.currSavings,
        profileData.goalSavings,
        profileData.jobTitle,
        profileData.age,
        profileData.monthlyIncome,
      ],
    );
    await client.query(
      `UPDATE "user" SET is_profile_complete = $1 where id = $2 RETURNING *`,
      [true, profileData.userId],
    );
    await client.query('COMMIT')
    return insertProfile.rows[0];
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  }
  finally {
    client.release()
  }
}

export async function getProfileModel(userId) {
  const getProfile = await pool.query(`SELECT * FROM "profile" WHERE user_id = $1`, [userId])
  return getProfile.rows[0]
}
