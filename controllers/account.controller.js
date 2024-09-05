import Accounts from "../models/account_model.js";
import bcrypt from "bcryptjs";

// POST ===> CREATE ACCOUNT
export async function postAccount (req, res) {
    let msg = "Account created";
    const body = req.body;
    try {
        const { customer_document, pass } = req.body;
        if (!customer_document || !pass) {
            return res.status(400).json({ message: 'Please enter the complete information' });
        }

        if ( pass.length !== 4) {
            return res.status(400).json({ message: 'The password must be exactly 4 characters long' })
        }        
        const accounts = new Accounts(body);

        accounts.password = await bcrypt.hash(`${accounts.account_number}`,5);
        await accounts.save();
        
    } catch (error) {
        msg = error.message
    }
    res.json({ msg: msg });
};

// GET ===> LIST ALL ACCOUNTS
export async function getAccount (req, res) {
    try {
        const accounts = await Accounts.find();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.msg });
    }
};

// GET ===> VIEW AN ACCOUNT
export async function getAccountByNumber (req, res) {
    try {
        const accountN = req.params.account_number;
        const account = await Accounts.findOne({ account_number: accountN });
        if (!account) {
            res.status(404).json({ message: 'Account no found' });
        }
        return res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT ===> DESPOSIT
export async function depositAccount (req, res) {
    
    try {
        const { account_number, giveme_money } = req.body;
        if (!account_number || !giveme_money ) {
            res.status(400).json({ message: 'Incomplete values' });
        }
        if ( giveme_money <= 0 ) {
            res.status(400).json({ message: 'Please provide a value greater than 0 for deposit.' });
        } else {
            const account = await Accounts.findOne({ account_number: account_number});
            if ( !account ) {
                res.status(500).json({ message: "can't connect to database" });
            }
            account.account_balance += giveme_money;
            const result = await account.save();
            res.status(200).json({ message: result });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT ===> WITHDRAWAL
export async function withdrawalAccount (req, res) {
    try {
        const { account_number, withdrawal_money } = req.body;
        if (!account_number || !withdrawal_money) {
            return res.status(400).json({ message: 'Incorrect values, please check' });
        }
        const account = await Accounts.findOne({ account_number: account_number });
        if (!account) {
            return res.status(500).json({ message: "Can't connect to database" });
        }

        const balance = account.account_balance;

        if ( withdrawal_money > balance) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        if (withdrawal_money <= 0) {
            return res.status(400).json({ message: 'Please enter a valid input' });
        }else {
            account.account_balance -= withdrawal_money;
            const result = await account.save();
            console.log(result);
            return res.status(200).json({ message: result });
        }
    } catch (error) {
       return res.status(500).json({ message: error.message });       
    }
};

// DELETE ==> DELETE ACCOUNT
export async function deleteAccount (req, res) {
    try {
        const { account_number } = req.body;
        if ( !account_number ) {
            return res.status(404).json({ message: 'Account no found' });
        }   

        const account = await Accounts.findOne({ account_number: account_number });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const balance = account.account_balance;

        if (balance > 0) {
            return res.status(400).json({ message: 'The account has a balance and cannot be deleted' });
        } else {
            await Accounts.findOneAndDelete({ account_number: account_number });
            return res.json({ message: 'Account deleted' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};