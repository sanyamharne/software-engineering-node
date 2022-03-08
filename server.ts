import express, {Request, Response} from 'express';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import LikeController from './controllers/LikeController';
import MessageController from './controllers/MessageController';
import BookmarkController from './controllers/BookmarkController';
import FollowController from './controllers/FollowController';
import mongoose from 'mongoose';

// Connnect to DB
const connectionString = `mongodb+srv://admin:admin@cluster0.y7ooj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(connectionString)

const app = express();
app.use(express.json());

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);

const likeController = LikeController.getInstance(app);
const messageController = MessageController.getInstance(app);

const bookmarkController = BookmarkController.getInstance(app);
const followController = FollowController.getInstance(app);

const PORT = 4000
app.listen(process.env.PORT || PORT);