const fs = require('fs').promises;
const {promisify} = require('util');
const sleep = promisify(setTimeout);
let datas = null;

module.exports = {

    async create(req, res){

        await fs.readFile('./src/datas/grades.json', 'utf-8').then(data=>{
            datas = JSON.parse(data);
        }).catch(err=>{
            console.log(err);
        });

        const {student, subject, type, value} = req.body;
        const id = datas.nextId;
        datas.nextId++;
        const timestamp = new Date();

        const grade = {id: id, student: student, subject: subject, type: type, value: value, timestamp: timestamp};
        console.log(grade);
        datas.grades.push(grade);
        datas = JSON.stringify(datas);

        await fs.writeFile('./src/datas/grades.json', datas, {enconding:'utf-8',flag: 'w'}).then(()=>{
            console.log('Grade Created');
        }).catch(err=>{
            console.log(err);
        });
        res.send(grade);
    },

    async update(req, res){

        await fs.readFile('./src/datas/grades.json', 'utf-8').then(data=>{
            datas = JSON.parse(data);
        }).catch(err=>{
            console.log(err);
        });

        const {id, student, subject, type, value} = req.body;
        const grade = datas.grades.filter(data=>{
            return id === data.id;
        });

        if(grade.length === 0){
            res.send({msg: 'Grade not found'})
        }else{
            grade[0].student = student;
            grade[0].subject = subject;
            grade[0].type = type;
            grade[0].value = value;

            datas = JSON.stringify(datas);

            await fs.writeFile('./src/datas/grades.json', datas, {enconding:'utf-8',flag: 'w'}).then(()=>{
                console.log('Grade Created');
            }).catch(err=>{
                console.log(err);
            });

            res.send(grade[0]);
        }
    },

    async delete(req, res){

        await fs.readFile('./src/datas/grades.json', 'utf-8').then(data=>{
            datas = JSON.parse(data);
        }).catch(err=>{
            console.log(err);
        });

        const size = datas.grades.length;

        const {id} = req.body;

        let grades = datas.grades.filter(data=>{
            return id !== data.id;
        });

        if(grades.length === (size-1)){
            datas.grades = grades;
            datas = JSON.stringify(datas);

            await fs.writeFile('./src/datas/grades.json', datas, {enconding:'utf-8',flag: 'w'}).then(()=>{
                console.log('Grade Created');
            }).catch(err=>{
                console.log(err);
            });

            res.send({msg: "Grade excluded"});
        }else{
            res.send({mas: "Grade not found"});
        }
    },

    async index_byId(req, res){

        await fs.readFile('./src/datas/grades.json', 'utf-8').then(data=>{
            datas = JSON.parse(data);
        }).catch(err=>{
            console.log(err);
        });

        const {id} = req.body;

        const grade = datas.grades.filter(data => {
            return data.id === id;
        });

        if(grade.length)
            res.send(grade);
        else  
            res.send({msg: "Grade not found"});

    },

    async sumNotesSubject(req, res){

        await fs.readFile('./src/datas/grades.json', 'utf-8').then(data=>{
            datas = JSON.parse(data);
        }).catch(err=>{
            console.log(err);
        });

        const {student, subject} = req.body;

        const grades = datas.grades.filter(data => {
            return data.student === student && data.subject === subject;
        });

        let sum = 0;

        for(let i = 0; i < grades.length; i++)
            sum += grades[i].value;
        
        if(grades.length)
            res.send({sum: sum});
        else
            res.send({msg: "Grades not found"});

    },

    async medSubjType(req, res){

        await fs.readFile('./src/datas/grades.json', 'utf-8').then(data=>{
            datas = JSON.parse(data);
        }).catch(err=>{
            console.log(err);
        });

        const {subject, type} = req.body;

        const grades = datas.grades.filter(data => {
            return data.type === type && data.subject === subject;
        });

        let sum = 0;

        for(let i = 0; i < grades.length; i++)
            sum += grades[i].value;
        
        if(grades.length){
            const med = sum/grades.length;
            res.send({med: med});
        }else
            res.send({msg: "Grades not found"});
    },

    async threeBestsByType(req, res){

        await fs.readFile('./src/datas/grades.json', 'utf-8').then(data=>{
            datas = JSON.parse(data);
        }).catch(err=>{
            console.log(err);
        });

        const {subject, type} = req.body;

        const grades = datas.grades.filter(data => {
            return data.type === type && data.subject === subject;
        });

        const bests = grades.sort((a,b)=>{
            return b.value - a.value;
        });

        const threeBests = [];

        if(bests.length >= 3){
            for(let i = 0; i < 3; i++)
                threeBests.push(bests[i]);
            res.send(threeBests);
        }else if(bests.length === 0)
            res.send({msg: "Grades not found"});
        else
            res.send(bests);

    }

};