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

// PUT ===> DESPOSIT
export async function depositAccount (req, res) {
    
    try {
        const { account_number, giveme_money } = req.body;
        if (!account_number || !giveme_money) {
            res.status(400).json({ message: 'Incomplete value' });
        }
        if ( giveme_money <= 0 ) {
            res.status(400).json({ message: 'Please provide a value greater than 0 for deposit.' });
        } else {
            const account = await Accounts.findOne({ account_number: account_number});
            if ( !account ) {
                res.status(500).json({ message: "can't connecto to database" });
            }
            account.account_balance += giveme_money;
            const result = await account.save();
            res.status(200).json({ message: result });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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