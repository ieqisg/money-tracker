import { validateCreateProfile } from "../validation/profileValidator";
import { createProfileModel, findUserByEmail, getProfileModel } from "../models/userModel";

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
      return res
        .status(401)
        .json({ success: false, message: "User id is required" });
    const profileData = { userId, ...req.body };
    const profileNotValid = validateCreateProfile(req.body);
    if (profileNotValid) {
      return res.status(400).json({ success: false, message: profileNotValid });
    }

    const result = await createProfileModel(profileData);
    if (!result) {
      return res.json({ success: false, message: "No received data", result });
    }
    return res.status(201).json({
      success: true,
      data: result,
      message: "Profile created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}



export async function getProfile(req, res) {
  try {
    const userId = req.userId
    if (!userId) return res.status(400).json({ success: false, message: "User id is required" })
    const result = await getProfileModel(userId)
    const data = {
      currSavings: Number(result.current_savings),
      goalSavings: Number(result.goal_savings),
      age: result.age,
      jobTitle: result.job_title,
      monthlyIncome: Number(result.monthly_income),
      monthlyExpense: Number(result.monthly_expense),
      monthlyBalance: Number(result.monthly_balance),
    }
    if (!result) return res.json({ message: result })
    return res.status(201).json({ success: true, data: data, message: "Profile successfully retrieved" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}
