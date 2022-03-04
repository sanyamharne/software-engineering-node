import Follow from "../models/Follow";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface FollowDaoI {
    findAllFollowersForUser (uid: string): Promise<Follow[]>;
    findAllFollowingUser (uid: string): Promise<Follow[]>;
    userFollowsUser (uid1: string, uid2: string): Promise<Follow>;
    userUnFollowsUser (uid1: string, uid2: string): Promise<any>;
};