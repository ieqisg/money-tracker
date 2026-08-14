import { findUserByEmail } from "../models/userModel"


export async function findExistingUser(req, res) {
  try {
    const { email } = req.body
    const result = await findUserByEmail(email)
    res.status(409).json({
      success: true,
      data: result,
      message: "User already found"
    })

  } catch (error) {
    console.error(error)
  }

}

//add a function from models to 
export async function createProfile(req, res) {
  try {
    const result = await (req.body)
    res.status(201).json({
      success: true,
      data: result,
      message: "success"
    })
  } catch (error) {
    res.json({ message: error })
  }
}
