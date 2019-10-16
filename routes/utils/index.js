const successMessage = (res, data, status) =>
  res.status(200).json({ data, status });

const errorMessage = (res, error) =>
  res.status(500).json({ error, status: 500 });

module.exports = {
  successMessage,
  errorMessage
};
