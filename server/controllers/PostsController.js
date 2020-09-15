import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";

export class PostsController extends BaseController {
    constructor() {
        super("api/posts");
        this.router
            .get("", this.getAll)
            .get("/:id/comments", this.getCommentsByPostId)
            .get("/:id", this.getById)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.remove)
    }
    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            req.body.creatorEmail = req.userInfo.email;
            let data = await postsService.edit(req.body)
            res.send(data)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        let data = await postsService.findById(req.params.id)
        res.send(data)
    }
    async getCommentsByPostId(req, res, next) {
        try {
            let data = await commentsService.find({ post: req.params.id })
            res.send(data)
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            let data = await postsService.find()
            res.send(data)
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorEmail = req.userInfo.email;
            let data = await postsService.create(req.body)
            return res.send(data)
        } catch (error) {
            next(error);
        }
    }
    async remove(req, res, next) {
        try {
            await postsService.remove(req.params.id, req.userInfo.email)
            res.send("Delorted")
        } catch (error) {
            next(error)
        }
    }
}
