import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class PostsService {
    async find(query = {}) {
        let values = await dbContext.Posts.find(query).populate(
            "creator",
            "name picture"
        );
        return values;
    }
    async findById(id) {
        let value = await dbContext.Posts.findById(id);
        if (!value) {
            throw new BadRequest("Invalid Id");
        }
        return value;
    }
    async create(body) {
        return await dbContext.Posts.create(body)
    }
    async remove(id, email) {
        // let post = await dbContext.Posts.findOne({_id: id, creatorEmail: email})
        // if(!post){
        //     throw new BadRequest("Cannot delete")
        // }
        let post = await this.findById(id)
        // @ts-ignore
        if (post.creatorEmail != email) {
            throw new UnAuthorized("Cannot delete another persons post")
        }
        await dbContext.Posts.findByIdAndDelete(id);
        return "successfully deleted"
    }
}

export const postsService = new PostsService();
