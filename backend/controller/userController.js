import { validateCreateProfile } from "../middleware/profileValidator";
import { findUserByEmail } from "../models/userModel";

export async function findExistingUser(req, res) {
  try {
    const { email } = req.body;
    const result = await findUserByEmail(email);
    res.status(409).json({
      success: true,
      data: result,
      message: "User already found",
    });
  } catch (error) {
    console.error(error);
  }
}

//add a function from models to
export async function createProfile(req, res) {
  try {
    const userId = req.userId;
    if (!userId)
      return res.json({ success: false, message: "User id is required" });
    const { age, currSavings, goalSavings, jobTitle, monthlyIncome } = req.body;
    const profileNotValid = validateCreateProfile(req.body);
    if (profileNotValid) {
      return res.status(400).json({ success: false, message: profileNotVlaid });
    }
    return res.status(201).json({
      success: true,
      data: { currSavings, goalSavings, jobTitle, monthlyIncome, age },
      message: "Profile created successfully",
    });
  } catch (error) {
    res.json({ message: error });
  }
}
