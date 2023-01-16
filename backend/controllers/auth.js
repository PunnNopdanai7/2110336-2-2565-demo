const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

/*
 * @desc     Resigter user
 * @route    POST /api/v1/auth/register
 * @access   Public
 */
exports.register = async (req, res, _next) => {
  try {
    const { username, password } = req.body;
    try {
      const user = await User.create({
        username,
        password: await bcrypt.hash(password, 10),
      });

      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error });
    }

    //Create token
    //const token = user.getSignedJwtToken();

    //res.status(200).json({ success: true });
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};
