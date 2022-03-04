import Message from "../models/Message";

export default interface MessageDao {

    userSendsMessageToAnotherUser(sourceuid: string, targetuid: string,message:Message): Promise<any>
    findAllMessagesSent(uid: string): Promise<Message[]>
    findAllMessagesReceived(uid: string): Promise<Message[]>
    userDeletesAMessage(uid: string, mid: string): Promise<any>

}