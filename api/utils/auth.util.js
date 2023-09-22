const bcrypt = require("bcrypt");

exports.hashedPassword = async(password) => {
  try{

    const salt = 10;
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;

  } catch(err) {
    console.log(err);
  }
}

exports.comparePassword = async(password, hashedPassword) => {
  try{

    return bcrypt.compare(password, hashedPassword);

  } catch(err) {
    console.log(err);
  }
}