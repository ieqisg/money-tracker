export function profileValidation(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Bad request",
        error: result.error.flatten()
      })
    }
    req.body = result.data

    next()
  }
}
