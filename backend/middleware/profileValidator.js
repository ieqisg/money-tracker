export function profileValidation(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Bad request",
        error: result.error.flatten(),
      });
    }
    req.body = result.data;

    next();
  };
}
//todo: validate empty profile submission
export function validateCreateProfile(profile) {
  if (!profile) return "Profile is required";
  if (profile.currSavings <= 0) {
    return "Current Savings should be greater than 0";
  }
  if (profile.goalSavings <= 0) {
    return "Goal Savings should be greater than 0";
  }
  if (profile.jobTitle === "") {
    return "Job Title should not be empty";
  }
  if (profile.age <= 0) {
    return "Age should be greater than 0";
  }
  if (profile.monthlyIncome <= 0) {
    return "Monthly Income should be greater than 0";
  }
  return null;
}
