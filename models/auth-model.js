const bcrypt = require("bcryptjs");

const db = require("../data/database");

class Auth {
  constructor(email, password = "", name = "") {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.query(
      `INSERT INTO users (nama_user, email_user, password_user, kategori_user) VALUES (?, ?, ?, ?)`,
      //kategori_user:
      //0: user biasa
      //1: admin
      [this.name, this.email, hashedPassword, 0]
    );
  }
  async findUser() {
    const user = await db.query("SELECT * FROM users WHERE email_user = ?", [
      this.email,
    ]);
    return user[0];
  }
  static async findAll() {
    const user = await db.query("SELECT COUNT(*) AS total_user FROM users");
    return user[0][0].total_user;
  }
  static async updateUserProfile(
    userId,
    email,
    name,
    nohp,
    jenisKelamin,
    alamat,
    imagePath
  ) {
    const query = `
      UPDATE users 
      SET
        nama_user = ?, 
        email_user = ?,
        no_hp = ?, 
        jenis_kelamin = ?, 
        alamat = ?, 
        image_url = ? 
      WHERE 
        user_id = ?;
    `;
    await db.query(query, [
      name,
      email,
      nohp,
      jenisKelamin,
      alamat,
      imagePath,
      userId,
    ]);
  }

  async checkPassword(hashedPassword) {
    const passwordIsCorrect = await bcrypt.compare(
      this.password,
      hashedPassword
    );
    return passwordIsCorrect;
  }
}

module.exports = Auth;
