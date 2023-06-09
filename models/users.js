/**
 * A module used for all calls to the table users in the database
 * Uses setup in /helpers/database for this function
 * @module models/users
 * @author Jonathan Martin
 * @see helpers/database for the models that require this module
 */

const db = require('../helpers/database');
const encrypt=require("./encrypt");
/*
exports.Login = async function Login(data){
	console.log('data test')
	console.log(data.username)
	console.log(data.password)
	
	let query="SELECT * FORM users WHERE username =? && password =?";
	let username="alice";
	let password="Test";
	username=data.username;
	password=data.password;
	query="select * from users where username='"+username+"' && "+"password='"+password+"';"
	let values=[username,password];
	let data2=await db.run_query(query);
	return data2
}
*/
/**
 * finds user by username
 * @param {string} username username of the user
 * @returns {object} object containing user
 */
exports.findByUsername=async function findByUsername(username){
	let query="Select * from users WHERE username= ?"
	let values = [username];
	let data = await db.run_query(query, values);
  return data;
}
/**
 * adds a new user
 * @param {string} username username of the user
 * @param {string} password password of the user
 * @returns {object} object containing success message
 */
exports.addUser=async function addUser(username,password){
	let query="insert INTO users(username,password) values(?,?)"
	let tem=await encrypt.genSalt(password);
	let values=[username,tem];
	let data = await db.run_query(query, values);
  return data;
} 
/**
 * deletes user
 * @param {string|number} UserId id of the user
 * @returns {object} object containing success message
 */
exports.deleteUser=async function deleteUser(UserId){
	let query="DELETE from users where id =?"
	let values=[UserId]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * updates User's role 
 * @param {string} role new role of the user
 * @param {string|number} id id of the user
 * @returns {object} object containing success message
 */
exports.update=async function update(role,id){
	let query="update users set UserRole =? where id=?"
	let values=[role,id]
	let data = await db.run_query(query, values);
  return data;
}
/**
 * gets all users 
 * @returns {object} object containing all users
 */
exports.getAll=async function getAll(){
	let query="select * from users;"
	let data = await db.run_query(query);
  return data;
}