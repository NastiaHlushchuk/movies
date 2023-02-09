const userDataValidate = {
  name: {
    notEmpty: true,
    isLength: {
      options: [1, 250],
    },
    isString: { errorMessage: "User name should be string" },
  },
  email: {
    isEmail: { errorMessage: "Please provide valid email" },
  },
  password: {
    exists: { errorMessage: "Password is required" },
    isString: { errorMessage: "password should be string" },
    isLength: {
      options: { min: 5 },
      errorMessage: "Password should be at least 5 characters",
    },
  },
};

module.exports = userDataValidate;
