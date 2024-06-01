// ini bukan front end javascript, jangan di hapus/diotak atik
const Auth = require("../models/auth-model");

function isEmpty(value) {
  return !value || value.trim() === "";
}
function checkEmail(email) {
  return email || email.includes("@");
}
function checkPassword(password) {
  return password.trim().length >= 6;
}
function passwordConfirmed(password, confirmPassword) {
  return password === confirmPassword;
}
async function emailExist(email) {
  const user = new Auth(email);
  let findUser;
  try {
    findUser = await user.findUser();
  } catch (error) {
    throw error;
  }
  return findUser;
}
async function loginIsNotvalid(email, password) {
  let error;
  const auth = new Auth(email, password);
  const user = await emailExist(email);
  if (user.length <= 0) {
    return (error = "akun belum ada");
  }
  const passwordIsCorrect = await auth.checkPassword(user[0].password_user);
  if (!passwordIsCorrect) {
    return (error = "password salah");
  }
  return error;
}
async function signUpIsNotValid(name, email, password, confirmPassword) {
  let error;
  if (isEmpty(password) || !checkPassword(password)) {
    error = "password harus minimal 6 karakter";
  }
  if (!passwordConfirmed(password, confirmPassword)) {
    error = "password tidak sama";
  }
  if (isEmpty(email) || !checkEmail(email)) {
    error = "masukkan email yang benar";
  }
  if (isEmpty(name)) {
    error = "masukkan nama yang benar";
  }
  const userEmailexist = await emailExist(email);
  if (userEmailexist.length > 0) {
    error = "email sudah terdaftar";
  }
  return error;
}

function pengaduanIsNotValid(title, description, category, location, imageUrl) {
  let error;
  console.log(imageUrl);


  if (isEmpty(imageUrl)) {
    error = "masukkan foto yang benar";
  }
  if (isEmpty(location)) {
    error = "masukkan lokasi yang benar";
  }
  if (isEmpty(category)) {
    error = "masukkan kategori yang benar";
  }
  if (isEmpty(description)) {
    error = "masukkan deskripsi yang benar";
  }
  if (isEmpty(title)) {
    error = "masukkan judul yang benar";
  }
  return error;
}
function beritaIsNotValid(title, description, content, imageUrl) {
  let error;
  if (isEmpty(imageUrl)) {
    error = "masukkan foto yang benar";
  }
  if (isEmpty(content)) {
    error = "masukkan isi yang benar";
  }
  if (isEmpty(description)) {
    error = "masukkan deskripsi yang benar";
  }

  if (isEmpty(title)) {
    error = "masukkan judul yang benar";
  }
  return error;
}

module.exports = {
  signUpIsNotValid: signUpIsNotValid,
  loginIsNotvalid: loginIsNotvalid,
  pengaduanIsNotValid: pengaduanIsNotValid,
  beritaIsNotValid: beritaIsNotValid,
};
