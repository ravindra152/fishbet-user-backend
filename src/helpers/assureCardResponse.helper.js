import _ from 'lodash'

export const sendAssureCardSuccessResponse = ({ req, res, next }, data) => {
  res.payload = data

  if (data?.statusCode) {
    return res.status(data.statusCode).json({ ...data })
  }

  return res.status(200).json({ success: true, data })
}

export const sendAssureCardErrorResponse = ({ req, res, next }, error) => {
  if (error) {
    const { status, ...result } = error?.response?.data || { message: 'Internal Server Error' }
    const statusCode = error?.response?.status ?? 500

    res.payload = { success: false, error: result }
    return res.status(statusCode).json({ ...res.payload })
  }

  return res.status(500).json({
    success: false,
    error: { message: 'Internal Server Error' }
  })
}
