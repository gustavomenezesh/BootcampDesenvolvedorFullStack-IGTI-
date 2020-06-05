let fs = require('fs');
const crypto = require('crypto')
const {promisify} = require('util');
const sleep = promisify(setTimeout);


module.exports = {

    async create(req, res){
        
        let datas = [];

        async function read(){
            fs.readFile('./src/datas/accounts.json', 'utf-8', (err,data)=>{
                if(err){
                    console.log(err);
                    return 0;
                }else{
                    
                    if(data){
                        datas = JSON.parse(data);
                    }
                    return 1;
                }
            });
        }
        if(!read()) return;
        await sleep(5);
        let account = req.body;

        const id = crypto.randomBytes(4).toString('Hex');
        account = {id: id, name: account.name, balance: account.balance}
        datas.push(account);

        datas = JSON.stringify(datas);
        fs.writeFile('./src/datas/accounts.json', datas, {enconding:'utf-8',flag: 'w'}, err => {
            if (err) console.log(err);
            console.log('Conta cadastrada!\n');
        });
        await sleep(5);
        res.send(account);
        console.log(JSON.parse(datas).length);
    },

    async deposit(req, res){
        let datas = [];

        async function read(){
            fs.readFile('./src/datas/accounts.json', 'utf-8', (err,data)=>{
                if(err){
                    console.log(err);
                    return 0;
                }else{
                    
                    if(data){
                        datas = JSON.parse(data);
                    }
                    return 1;
                }
            });
        }
        if(!read()) return;
        await sleep(5);
        const {id, val} = req.body;
       
        const account = datas.filter(data=>{
            return data.id === id;
        });
        account[0].balance += val; 
        
        datas = JSON.stringify(datas);
        fs.writeFile('./src/datas/accounts.json', datas, {enconding:'utf-8',flag: 'w'}, err => {
            if (err) console.log(err);
            console.log('Depósito Realizado!\n');
        });
        await sleep(5);
        res.send(account);
    },

    async withdraw(req, res){
        let datas = [];

        async function read(){
            fs.readFile('./src/datas/accounts.json', 'utf-8', (err,data)=>{
                if(err){
                    console.log(err);
                    return 0;
                }else{
                    
                    if(data){
                        datas = JSON.parse(data);
                    }
                    return 1;
                }
            });
        }
        if(!read()) return;
        await sleep(5);
        const {id, val} = req.body;
        const account = datas.filter(data=>{
            return data.id === id;
        });
        if(val <= account[0].balance){
            account[0].balance -= val; 

            datas = JSON.stringify(datas);
            fs.writeFile('./src/datas/accounts.json', datas, {enconding:'utf-8',flag: 'w'}, err => {
                if (err) console.log(err);
                console.log('Saque Realizado!\n');
            });
            await sleep(5);
            res.send(account);
        }else{
            res.send({err:'Saldo Insuficiente'})
        }
    },

    async balance(req, res){
        let datas = [];

        async function read(){
            fs.readFile('./src/datas/accounts.json', 'utf-8', (err,data)=>{
                if(err){
                    console.log(err);
                    return 0;
                }else{
                    
                    if(data){
                        datas = JSON.parse(data);
                    }
                    return 1;
                }
            });
        }
        if(!read()) return;
        await sleep(5);
        const {id} = req.body;
        const account = datas.filter(data=>{
            return data.id === id;
        });;

        res.send({balance: account[0].balance});
    },

    async delete(req, res){
        let datas = [];

        async function read(){
            fs.readFile('./src/datas/accounts.json', 'utf-8', (err,data)=>{
                if(err){
                    console.log(err);
                    return 0;
                }else{
                    
                    if(data){
                        datas = JSON.parse(data);
                    }
                    return 1;
                }
            });
        }
        if(!read()) return;
        await sleep(5);
        const {id} = req.body;
        

        datas = datas.filter(data => {
            return data.id !== id;
        });

        datas = JSON.stringify(datas);
        fs.writeFile('./src/datas/accounts.json', datas, {enconding:'utf-8',flag: 'w'}, err => {
            if (err) console.log(err);
            console.log('Conta Deletada!\n');
        });
        await sleep(5);
        res.send({message: "Conta deletada"});
    }

};