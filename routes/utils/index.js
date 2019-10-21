const successMessage = (res, data, status) =>
  res.status(200).json({ data, status });

const errorMessage = (res, error, status) =>
  res.status(500).json({ error, status });

module.exports = {
  successMessage,
  errorMessage
};
