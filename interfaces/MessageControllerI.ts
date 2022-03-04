import {Request, Response} from "express";

export default interface MessageController{

    userSendsMessageToAnotherUser(req: Request, res: Response): void;
    findAllMessagesSent(req: Request, res: Response): void;
    findAllMessagesReceived(req: Request, res: Response): void;
    userDeletesAMessage(req: Request, res: Response): void;

};