import { model, Schema } from "mongoose";

const accountSchema = new Schema({
  account_number: {
    type: Number,
    unique: true,
  },

  customer_document: {
    type: String,
    unique: true,
  },

  opening_date: {
    type: Date,
  },

  account_balance: {
    type: Number,
  },

  password: {
    type: String,
  },
});

accountSchema.pre("save", async function (next) {
    if (this.isNew && !this.account_number) {
        const lastAccount = await this.constructor.findOne().sort("-account_number");
        this.account_number = lastAccount ? lastAccount.account_number +1:1;
    }
    next();
});

export default model("Accounts", accountSchema, "accounts");
