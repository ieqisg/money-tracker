

export function success(res, data, message = "success", status = 200) {
  return res.status(status).json({
    success: true,
    data,
    error: null,
    message,
  })
}

export function failed(res, message = "something went wrong", error = "SOMETHING_WENT_WRONG", status = 500) {
  return res.status(status).json({
    success: false,
    error,
    message,
  })
}
