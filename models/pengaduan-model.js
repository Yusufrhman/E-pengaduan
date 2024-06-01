const db = require("../data/database");

class Pengaduan {
  constructor(
    title,
    description,
    category,
    imagePath,
    location,
    time,
    userID,
    pengaduanId
  ) {
    (this.title = title),
      (this.description = description),
      (this.category = category),
      (this.imagePath = imagePath),
      (this.location = location),
      (this.time = time);
    this.userID = userID;
    this.pengaduanId = pengaduanId;
  }
  async save() {
    await db.query(
      `INSERT INTO pengaduan
    (judul_pengaduan, deskripsi_pengaduan, kategori_pengaduan, foto_pengaduan, lokasi_pengaduan, waktu_pengaduan, user_id) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
      [
        this.title,
        this.description,
        this.category,
        this.imagePath,
        this.location,
        this.time,
        this.userID,
      ]
    );
  }
  async update() {
    if (this.imagePath == null) {
      await db.query(
        `UPDATE pengaduan 
     SET judul_pengaduan = ?, 
         deskripsi_pengaduan = ?, 
         kategori_pengaduan = ?, 
         lokasi_pengaduan = ?
     WHERE id_pengaduan = ?`,
        [
          this.title,
          this.description,
          this.category,
          this.location,
          this.pengaduanId,
        ]
      );
    } else {
      await db.query(
        `UPDATE pengaduan 
     SET judul_pengaduan = ?, 
         deskripsi_pengaduan = ?, 
         kategori_pengaduan = ?, 
         foto_pengaduan = ?, 
         lokasi_pengaduan = ?
     WHERE id_pengaduan = ?`,
        [
          this.title,
          this.description,
          this.category,
          this.imagePath,
          this.location,
          this.pengaduanId,
        ]
      );
    }
  }
  static async delete(pengaduanId) {
    await db.query(
      `DELETE FROM pengaduan
     WHERE id_pengaduan = ?`,
      [pengaduanId]
    );
  }

  static async findWithID(userID, status, pageIndex, searchQuery) {
    const offset = (pageIndex - 1) * 10;
    const querySearch = `%${searchQuery}%`;
    const listPengaduan = await db.query(
      `SELECT * FROM pengaduan
       WHERE user_id = ? AND status_pengaduan = ? AND (judul_pengaduan LIKE ?)
       LIMIT 10 OFFSET ?`,
      [userID, status, querySearch, offset]
    );
    return listPengaduan[0];
  }

  static async findOne(id) {
    const pengaduan = await db.query(
      `SELECT * FROM pengaduan
      where id_pengaduan = ?`,
      [id]
    );
    return pengaduan[0][0];
  }
  static async find10(status, searchQuery, pageIndex) {
    const offset = (pageIndex - 1) * 10;
    const querySearch = `%${searchQuery}%`;
    const pengaduan = await db.query(
      `
    SELECT pengaduan.*, users.nama_user AS nama_pengadu FROM pengaduan
    INNER JOIN users ON pengaduan.user_id = users.user_id
    WHERE status_pengaduan = ? AND judul_pengaduan LIKE ?
    ORDER BY pengaduan.id_pengaduan DESC
    LIMIT 10 OFFSET ?`,
      [status, querySearch, offset]
    );
    return pengaduan[0];
  }

  static async countAllPengaduan(status, searchQuery) {
    const querySearch = `%${searchQuery}%`;
    const count = await db.query(
      `SELECT COUNT(*) AS total_pengaduan FROM pengaduan
      WHERE status_pengaduan = ? AND (judul_pengaduan LIKE ?)`,
      [status, querySearch]
    );
    return count[0][0].total_pengaduan;
  }
  static async countAllWithoutStatus() {
    const count = await db.query(
      `SELECT COUNT(*) AS total_pengaduan FROM pengaduan`,
    );
    return count[0][0].total_pengaduan;
  }

  static async countPengaduan(userId, status, searchQuery) {
    const querySearch = `%${searchQuery}%`;
    const count = await db.query(
      `SELECT COUNT(*) AS total_pengaduan FROM pengaduan
      WHERE user_id = ? AND status_pengaduan = ? AND (judul_pengaduan LIKE ?)`,
      [userId, status, querySearch]
    );
    return count[0][0].total_pengaduan;
  }
  static async changeStatusPengaduan(status, pengaduanId) {
    await db.query(
      `UPDATE pengaduan 
     SET status_pengaduan = ?
     WHERE id_pengaduan = ?`,
      [status, pengaduanId]
    );
  }
}
module.exports = Pengaduan;
