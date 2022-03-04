/**
 * @file Declares User data type representing relationship between
 * users and messages, as in user messages another user
 */
 import User from "./User";

 /**
  * @typedef Message Represents messages relationship between a user and a user,
  * as in a user messages another user
  * @property {User} messageSentBy user sending the message
  * @property {User} messageSentTo user to which the message is sent
  * @property {string} message User sending the message
  * @property {Date} messageSentOn the date and time the message sent.
  */
 export default interface Message {
	  message:string,
	  messageSentOn:Date,
	  messageSentBy: User,
	  messageSentTo: User
 };