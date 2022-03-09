import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";

export default class FollowDao implements FollowDaoI {
	private static followDao: FollowDao | null = null;

	public static getInstance = (): FollowDao => {
		     if(FollowDao.followDao === null) {
				FollowDao.followDao = new FollowDao();
		     }
		     return FollowDao.followDao;
		 }
		 private constructor() {}
	findAllFollowersForUser = async(uid: string): Promise<Follow[]> => 
		FollowModel.find({user : uid}).populate("user").exec();

	findAllFollowingUser = async(uid: string): Promise<Follow[]> =>
		FollowModel.find({userFollowed : uid}).populate("userFollowed").exec();
	
	userFollowsUser= async(uid1: string, uid2: string): Promise<Follow> => 
		FollowModel.create({user : uid1, userFollowed: uid2});

	userUnFollowsUser = async (uid1: string, uid2: string): Promise<any>  =>
		FollowModel.deleteOne({user : uid1, userFollowed: uid2});

}