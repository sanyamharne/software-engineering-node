/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class TuitController Implements RESTful Web service API for likes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
  *     no londer likes a tuit</li>
  * </ul>
  * @property {FollowDao} likeDao Singleton DAO implementing likes CRUD operations
  * @property {FollowController} FollowController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {



		private static followDao: FollowDao = FollowDao.getInstance();
		private static followController: FollowController | null = null;

	  /**
		* Creates singleton controller instance
		* @param {Express} app Express instance to declare the RESTful Web service
		* API
		* @return TuitController
		*/
	   private constructor() {}

	  public static getInstance = (app: Express): FollowController => {
			if(FollowController.followController === null) {
				 FollowController.followController = new FollowController();
				 app.get("/api/users/:uid/followers", FollowController.followController.findAllFollowingUser);
				 app.get("/api/users/:uid/follows", FollowController.followController.findAllFollowersForUser);
				 app.post("/api/users/:uid/follows/:uid", FollowController.followController.userFollowsUser);
				 app.delete("/api/users/:uid/unfollows/:uid", FollowController.followController.userUnFollowsUser);
			}
			return FollowController.followController;
	  }
 
	  findAllFollowingUser = (req: Request, res: Response) => 
	  FollowController.followDao.findAllFollowingUser(req.params.uid).then(followers => res.json(followers))

	  findAllFollowersForUser= (req: Request, res: Response) =>
	  FollowController.followDao.findAllFollowersForUser(req.params.uid).then(follows => res.json(follows))

	  userFollowsUser= (req: Request, res: Response) =>
	  FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2).then(follows => res.json(follows))

	  userUnFollowsUser= (req: Request, res: Response) =>
	  FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2).then(follows => res.json(follows))
 
	
 };