// import mysql from "mysql2";
// import dotenv from "dotenv";
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

const getUsers = async () => {
  const [result] = await pool.query("SELECT * FROM users");
  return result;
};

const getUser = async (email) => {
  const [result] = await pool.query(
    `
        SELECT * FROM users WHERE email = ?
    `,
    [email]
  );
  return result[0];
};

const orderProductWFax = async (
  userfname,
  userlname,
  email,
  phone,
  alt_name,
  alt_email,
  alt_phone,
  billing_address,
  shipping_address,
  item_one,
  item_two,
  item_three,
  item_four,
  fax_number,
  user_id
) => {
  const [result] = await pool.query(
    `
        INSERT INTO orders (userfname, userlname, email, phone, alt_name, alt_email, alt_phone, billing_address, shipping_address, item_one, item_two, item_three, item_four,fax_number, user_id) VALUES 
        ('?', '?', '?', '?', '?', '?', '?', '?', '?', ?, ?, ?, ?, ?, ?);
    `,
    [
      userfname,
      userlname,
      email,
      phone,
      alt_name,
      alt_email,
      alt_phone,
      billing_address,
      shipping_address,
      item_one,
      item_two,
      item_three,
      item_four,
      fax_number,
      user_id,
    ]
  );
  return result;
};

const orderProduct = async (
  userfname,
  userlname,
  email,
  phone,
  alt_name,
  alt_email,
  alt_phone,
  billing_address,
  shipping_address,
  item_one,
  item_two,
  item_three,
  item_four,
  user_id
) => {
  const [result] = await pool.query(
    `
        INSERT INTO orders (userfname, userlname, email, phone, alt_name, alt_email, alt_phone, billing_address, shipping_address, item_one, item_two, item_three, item_four, user_id) VALUES 
        ('?', '?', '?', '?', '?', '?', '?', '?', '?', ?, ?, ?, ?, ?);
    `,
    [
      userfname,
      userlname,
      email,
      phone,
      alt_name,
      alt_email,
      alt_phone,
      billing_address,
      shipping_address,
      item_one,
      item_two,
      item_three,
      item_four,
      user_id,
    ]
  );
  return result;
};

const createUser = async (userfname, userlname, email, phone) => {
  const [result] = await pool.query(
    `
        INSERT INTO users (userfname, userlname, email, phone) VALUES  (?, ?, ?, ?)
    `,
    [userfname, userlname, email, phone]
  );
  return getUser(result.insertId);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  orderProduct,
  orderProductWFax,
};

// const notes = await createNote("test", "test");
// // const getNot = await getNotes();
// console.log(notes);
