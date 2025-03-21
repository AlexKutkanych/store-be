const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  phone: {
    type: String,
    required: [true, 'Please enter a phone number'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Min password length is 6'],
  },
});

// fire before document saved to DB
userSchema.pre('save', async function (next) {
  // 'this' refers to User before create & save
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('incorrect email')
  }

  const auth = await bcrypt.compare(password, user.password)

  if (auth) {
    return user;
  }
  throw Error('incorrect password')
}

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
