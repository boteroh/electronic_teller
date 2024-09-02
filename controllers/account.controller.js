import Accounts from "../models/account_model.js";
import bcrypt from "bcryptjs";

// GET ===> LIST ACCOUNTS
export async function getAccount (req, res) {
    try {
        const accounts = await Accounts.find();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.msg });
    }
};

// GET ===> VIEW AN ACCOUNT
export async function getAccountById (req, res) {
    try {
        const account = await Accounts.findById(req.params.id);
        if (!account) {
            res.status(404).json({ message: 'Account no found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST ===> CREATE ACCOUNT
export async function postAccount (req, res) {
    let msg = "Account created";
    const body = req.body;
    try {
        const accounts = new Accounts(body);
        accounts.password = await bcrypt.hash(`${accounts.account_number}`,5);
        await accounts.save();
    } catch (error) {
        msg = error.message
    }
    res.json({ msg: msg });
};

// POST ===> DESPOSIT
// export async function depositAccount (req, res) {
//     let msg = "Deposit succesfull";
//     try {
//         const { account_balance } = req.body;
//         const account = await Accounts.findByIdAndUpdate(req.params.id);
//         if (account_balance >= 0) {

//         }
//     } catch (error) {
        
//     }
// };

// PUT ===> UPDATE ACCOUNT
export async function updateAccount (req, res) {
    let msg = "Account updated";
    try {

    } catch (error) {
        
    }
};

// DELETE ===> DELETE ACCOUNT
export async function deleteAccount (req, res) {
    try {
        const account = await Accounts.findByIdAndDelete(req.params.id);
        if (!account) {
            res.status(404).json({ message: 'Account no found' });
        }
        res.json({ message: 'Account deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};