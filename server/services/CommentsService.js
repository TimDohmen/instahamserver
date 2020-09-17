import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class CommentsService {
  async find(query = {}) {
    let values = await dbContext.Comments.find(query).populate(
      "post"
    );
    return values;
  }
  async findById(id) {
    let value = await dbContext.Comments.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
  async create(body) {
    return await dbContext.Comments.create(body)
  }
  async remove(id, email) {
    // let comment = await dbContext.Comments.findOne({_id: id, creatorEmail: email})
    // if(!comment){
    //     throw new BadRequest("Cannot delete")
    // }
    let comment = await this.findById(id)
    // @ts-ignore
    if (comment.creatorEmail != email) {
      throw new UnAuthorized("Cannot delete another persons comment")
    }
    await dbContext.Comments.findByIdAndDelete(id);
    return "successfully deleted"
  }
  async edit(body) {
    let comment = await dbContext.Comments.findOneAndUpdate({ _id: body.id, creatorEmail: body.creatorEmail }, body, { new: true })
    return comment
  }
}

export const commentsService = new CommentsService();
