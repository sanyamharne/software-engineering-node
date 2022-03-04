import {Request, Response} from "express";

export default interface LikeControllerI {
	findAllFollowersForUser (req: Request, res: Response): void;
	findAllFollowingUser (req: Request, res: Response): void;
	userFollowsUser (req: Request, res: Response): void;
	userUnFollowsUser (req: Request, res: Response): void;
};