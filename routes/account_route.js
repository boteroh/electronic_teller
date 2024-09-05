import { Router } from "express";
import { postAccount, getAccount, deleteAccount, depositAccount, getAccountByNumber, withdrawalAccount } from "../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.get("/", getAccount);
accountRouter.get("/consult/:account_number", getAccountByNumber);
accountRouter.post("/account", postAccount);
accountRouter.delete("/delete", deleteAccount);
accountRouter.put("/deposit", depositAccount);
accountRouter.put("/withdrawal", withdrawalAccount);

export default accountRouter;