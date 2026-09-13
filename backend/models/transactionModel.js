import { finalize } from "zod/v4/core";
import pool from "../config/db";



export async function addTransactionModel(transaction) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await client.query(
      `INSERT INTO transaction (user_id, transaction_type, category, amount, description, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * 
`, [transaction.userId, transaction.transType, transaction.category, transaction.amount, transaction.description, transaction.date, transaction.time]
    )
    await client.query(
      `UPDATE profile p
        SET 
	        monthly_income = monthly_income + CASE WHEN $2 = 'income' THEN $1 ELSE 0 END,
	        monthly_expense = monthly_expense + CASE WHEN $2 = 'expense' THEN $1 ELSE 0 END,
          current_savings = current_savings + CASE WHEN $2 = 'saving' THEN $1 ELSE 0 END
        WHERE user_id = $3
       `, [transaction.amount, transaction.transType, transaction.userId]

    ), await client.query('COMMIT')
    return result.rows[0]
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }

}
