/**
 * @file Controller RESTful Web service API for messages resource
 */
 import {Express, Request, Response} from "express";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageControllerI";
 
 /**
  * @class MessageController Implements RESTful Web service API for messages resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /users/:uid/messages/sent to retrieve all the messages sent by a user
  *     </li>
  *     <li>GET /users/:uid/messages/receive to retrieve all messages received by the user.
  *     </li>
  *     <li>POST /users/:sourceuid/messages/:targetuid to record that a user sends a message to
  *     another user</li>
  *     <li>DELETE /users/:uid/messages/:mid to record that a user
  *     deletes message, both source user and target user message will be deleted</li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
  * @property {MessageController} MessageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
	  private static messageDao: MessageDao = MessageDao.getInstance();
	  private static messageController: MessageController | null = null;
 
	  /**
		* Creates singleton controller instance
		* @param {Express} app Express instance to declare the RESTful Web service
		* API
		* @return MessageController
		*/
	  public static getInstance = (app: Express): MessageController => {
			if (MessageController.messageController === null) {
				 MessageController.messageController = new MessageController();
				 app.post("/api/users/:sourceuid/messages/:targetuid",
					  MessageController.messageController.userSendsMessageToAnotherUser);
				 app.delete("/api/users/:uid/messages/:mid",
					  MessageController.messageController.userDeletesAMessage);
				 app.get("/api/users/:uid/messages/sent",
					  MessageController.messageController.findAllMessagesSent);
				 app.get("/api/users/:uid/messages/receive",
					  MessageController.messageController.findAllMessagesReceived);
			}
			return MessageController.messageController;
	  }
 
	  private constructor() {
	  }
 
	  /**
		* @param {Request} req Represents request from client, including the
		* path parameters sourceuid, targetuid and body representing the user sending message to another
		* user.
		* @param {Response} res Represents response to client, including the
		* body formatted as JSON containing the new message that was inserted in the
		* database both for source user and target user.
		*/
	  userSendsMessageToAnotherUser = (req: Request, res: Response) =>
			MessageController.messageDao.
			userSendsMessageToAnotherUser(req.params.sourceuid, req.params.targetuid, req.body)
				 .then(message => res.json(message));
 
 
	  /**
		* @param {Request} req Represents request from client, including the
		* path parameters uid and mid representing the user deleting the message deletes
		* from both source and target user.
		* @param {Response} res Represents response to client, including status
		* on whether deleting the message was successful or not
		*/
	  userDeletesAMessage = (req: Request, res: Response) =>
			MessageController.messageDao.userDeletesAMessage(req.params.uid, req.params.mid)
				 .then(status => res.send(status));
 
	  /**
		* Retrieves all messages sent by user from the database
		* @param {Request} req Represents request from client, including the path
		* parameter uid representing the user sent the messages.
		* @param {Response} res Represents response to client, including the
		* body formatted as JSON arrays containing the message objects that were sent.
		*/
	  findAllMessagesSent = (req: Request, res: Response) =>
			MessageController.messageDao.findAllMessagesSent(req.params.uid)
				 .then(message => res.json(message));
 
	  /**
		* Retrieves all messages received by user from the database
		* @param {Request} req Represents request from client, including the path
		* parameter uid representing the user received the messages.
		* @param {Response} res Represents response to client, including the
		* body formatted as JSON arrays containing the message objects that were received.
		*/
	  findAllMessagesReceived = (req: Request, res: Response) =>
			MessageController.messageDao.findAllMessagesReceived(req.params.uid)
				 .then(message => res.json(message));
 };