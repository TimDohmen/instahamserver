import { dbContext } from "../db/DbContext";
import { BadRequest, UnAuthorized } from "../utils/Errors";

class VotesService {
  async find(query = {}) {
    let values = await dbContext.Votes.find(query).populate(
      "post"
    );
    return values;
  }
  async findById(id) {
    let value = await dbContext.Votes.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
  async create(body) {
    return await dbContext.Votes.create(body)
  }
  async remove(id, email) {
    // let vote = await dbContext.Votes.findOne({_id: id, creatorEmail: email})
    // if(!vote){
    //     throw new BadRequest("Cannot delete")
    // }
    let vote = await this.findById(id)
    // @ts-ignore
    if (vote.creatorEmail != email) {
      throw new UnAuthorized("Cannot delete another persons vote")
    }
    await dbContext.Votes.findByIdAndDelete(id);
    return "successfully deleted"
  }
  async edit(body) {
    let vote = await dbContext.Votes.findOneAndUpdate({ _id: body.id, creatorEmail: body.creatorEmail }, body, { new: true })
    return vote
  }
}

export const votesService = new VotesService();
