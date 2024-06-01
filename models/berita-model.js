const db = require("../data/database");
class Berita {
  constructor(
    title,
    description,
    content,
    imageUrl,
    dateAdded,
    userId,
    status
  ) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.imageUrl = imageUrl;
    this.dateAdded = dateAdded;
    this.userId = userId;
    this.status = status;
  }
  async save() {
    await db.query(
      `INSERT INTO berita
    (judul_berita, isi_berita, waktu_berita, user_id, image_url, deskripsi_berita, status) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
      [
        this.title,
        this.content,
        this.dateAdded,
        this.userId,
        this.imageUrl,
        this.description,
        this.status,
      ]
    );
  }
  static async findAll(limit, offset, searchQuery) {
    let query = `
    SELECT * FROM berita
    WHERE (judul_berita LIKE ?)
    ORDER BY waktu_berita DESC
    LIMIT ? OFFSET ?`;

    const listBerita = await db.query(query, [
      `%${searchQuery}%`,
      limit,
      offset,
    ]);
    return listBerita[0];
  }
  static async findAllWithStatus(limit, offset, status, searchQuery) {
    let query = `
    SELECT * FROM berita
    WHERE status = ? and (judul_berita LIKE ?)
    ORDER BY waktu_berita DESC
    LIMIT ? OFFSET ?`;

    const listBerita = await db.query(query, [
      status,
      `%${searchQuery}%`,
      limit,
      offset,
    ]);
    return listBerita[0];
  }

  static async findOne(idBerita) {
    const berita = await db.query(
      `SELECT * FROM berita
       WHERE id_berita = ?`,
      [idBerita]
    );
    return berita[0][0];
  }
  static async countLengthWithoutStatus(searchQuery) {
    const count = await db.query(
      `SELECT COUNT(*) AS total_berita FROM berita
      WHERE (judul_berita LIKE ?)`,
      [`%${searchQuery}%`]
    );
    return count[0][0].total_berita;
  }

  static async countLength(status, searchQuery) {
    const querySearch = `%${searchQuery}%`;
    const count = await db.query(
      `SELECT COUNT(*) AS total_berita FROM berita
      WHERE status = ? AND (judul_berita LIKE ?)`,
      [status, querySearch]
    );
    return count[0][0].total_berita;
  }
  static async changeStatus(status, beritaId) {
    await db.query(
      `UPDATE berita 
     SET status = ?
     WHERE id_berita = ?`,
      [status, beritaId]
    );
  }
  static async delete(beritaId) {
    await db.query(
      `DELETE FROM berita
     WHERE id_berita = ?`,
      [beritaId]
    );
  }
  static async update(judul, isi, deskripsi, status, imagePath, id) {
    if (imagePath == null || imagePath.trim() == "") {
      await db.query(
        `UPDATE berita 
     SET judul_berita = ?, 
         isi_berita = ?, 
         deskripsi_berita = ?, 
         status = ?
     WHERE id_berita = ?`,
        [judul, isi, deskripsi, status, id]
      );
    } else {
      await db.query(
        `UPDATE berita 
     SET judul_berita = ?,
         isi_berita = ?,
         deskripsi_berita = ?,
         status = ?,
         image_url = ?
     WHERE id_berita = ?`,
        [judul, isi, deskripsi, status, imagePath, id]
      );
    }
  }
}
module.exports = Berita;
