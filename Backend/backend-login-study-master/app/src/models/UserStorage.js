'use strict';

const db = require('../config/db');
class UserStorage {

  // Users login()에서 받은 유저 정보를 db에 접근한 후 반환 | 로그인 로직
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = 'select * from users where id = ?;';
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
        // resolve와 reject가 같이 있으면 resolve가 반환이 됨
      });
    });
  }

  // Users register()에서 받은 유저 정보를 db에 저장 | 회원가입 로직
  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = 'insert into abc(id, name, psword) values(?, ?, ?);';
      db.query(
        query,
        [userInfo.id, userInfo.name, userInfo.psword],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

module.exports = UserStorage;