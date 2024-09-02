import { Router } from "express";
import { postAccount, getAccount, deleteAccount, updateAccount } from "../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.get("/", getAccount);
accountRouter.post("/", postAccount);
accountRouter.put("/:id", updateAccount);
accountRouter.delete("/:id", deleteAccount);

export default accountRouter;