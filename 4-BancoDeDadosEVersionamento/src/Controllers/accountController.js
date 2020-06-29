const Account = require('../models/account');
const datas = require('./accounts.json');

module.exports = {

    async init(req, res){
        const base = await Account.insertMany(datas);
        res.send(base);
    },

    async deposit(req, res){

        const {agencia, conta, value} = req.body;

        const account = await Account.findOne({agencia: agencia, conta: conta});

        if(account){

            const newVal = account.balance + value;

            const accountUpdated = await Account.updateOne(
                {agencia: agencia, conta: conta},
                {$set: {balance: newVal}}
            )
            if(accountUpdated.nModified)
                res.send({msg: "Sucessful operation"});
            else
                res.send({msg: "Operation failed"});
        }else
            res.send({err: "Account not found!"});
    }


}
