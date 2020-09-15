import express from "express";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments");
    this.router
      .get("", this.getAll)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.remove)
      .put("/:id", this.edit)
  }
  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorEmail = req.userInfo.email;
      let data = await commentsService.edit(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await commentsService.find()
      res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorEmail = req.userInfo.email;
      let data = await commentsService.create(req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      await commentsService.remove(req.params.id, req.userInfo.email)
      res.send("Delorted")
    } catch (error) {
      next(error)
    }
  }
}
