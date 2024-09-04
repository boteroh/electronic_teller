import { Router } from "express";
import { postAccount, getAccount, deleteAccount, depositAccount } from "../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.get("/", getAccount);
accountRouter.post("/account", postAccount);
accountRouter.delete("/:id", deleteAccount);
accountRouter.put("/deposit", depositAccount);

export default accountRouter;