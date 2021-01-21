const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/.test(v);
      },
      message: (props) => `${props.value} не является валидной ссылкой!`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} не валидный email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({email}).select('+password')
    .then(user => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password)
    .then(matched => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return user
      })
  })
}

module.exports = mongoose.model('user', userSchema);
