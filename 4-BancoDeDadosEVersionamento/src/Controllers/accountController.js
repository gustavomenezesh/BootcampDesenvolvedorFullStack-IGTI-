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
        
    },

    async draw(req, res){

        const {agencia, conta, value} = req.body;

        const account = await Account.findOne({agencia: agencia, conta: conta});

        if(account){

            if(account.balance >= value){

                const newVal = account.balance - value;
                const accountUpdated = await Account.updateOne(
                    {agencia: agencia, conta: conta},
                    {$set: {balance: newVal}}
                )

                res.send({msg: 'Sucessful Operation'})

            }else
                res.send({msg:'Balance insuficient'});

        }else  
            res.send({msg:'Account not found'});

    },

    async consultBalance(req, res){

        const {agencia, conta} = req.body;

        const account = await Account.findOne({agencia: agencia, conta: conta});

        account ? res.send({balance: account.balance}) : res.send({err: 'Account not found'});

    },

    async deleteAccount(req, res){
        const {agencia, conta} = req.body;

        const account = await Account.deleteOne({agencia: agencia, conta: conta});

        if(account.deletedCount){
            const accounts = await Account.find({agencia: agencia});
            res.send({accountsCount: accounts.length});
        }else
            res.send({err: 'Account not found'});

    },

    async transfer(req, res){

        const {origin, distiny, value} = req.body;

        const accountDistiny = await Account.findOne({conta: distiny});
        const accountOrigin = await Account.findOne({conta: origin});

        if(accountDistiny && accountOrigin){

            if(accountOrigin.agencia === accountDistiny.agencia){

                if(accountOrigin.balance >= value){

                    const originBalance = accountOrigin.balance - value;
                    const destinyBalance = accountDistiny.balance + value;

                    const originUpdated = await Account.updateOne(
                        {agencia: accountOrigin.agencia, conta: accountOrigin.conta}, 
                        {$set: {balance: originBalance}}
                    );

                    const destinyUpdated = await Account.updateOne(
                        {agencia: accountDistiny.agencia, conta: accountDistiny.conta},
                        {$set: {balance: destinyBalance}}
                    );

                    res.send({balance: originBalance});

                }else
                    res.send({err: 'Balance insuficient'})
            }else{

                if(accountOrigin.balance >= value+8){

                    const originBalance = accountOrigin.balance - value+8;
                    const destinyBalance = accountDistiny.balance + value;

                    const originUpdated = await Account.updateOne(
                        {agencia: accountOrigin.agencia, conta: accountOrigin.conta}, 
                        {$set: {balance: originBalance}}
                    );

                    const destinyUpdated = await Account.updateOne(
                        {agencia: accountDistiny.agencia, conta: accountDistiny.conta},
                        {$set: {balance: destinyBalance}}
                    );

                    res.send({balance: originBalance});

                }else
                    res.send({err: 'Balance insuficient'})

            }

        }else
            res.send({err: 'Account distiny or origin not found'});

    }


}
