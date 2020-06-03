const cidades = require('./Cidades');
const estados = require('./Estados');
const {promisify} = require('util');
let fs = require('fs');

const sleep = promisify(setTimeout);
let ufs = [];
let qntCity;
const smallers = [];
const biggers = [];

//createArqUf();
//lerArqUf('AL');
//maisCidades();
//menosCidades();
//namesBiggers();
//namesSmallers();
//nameBiggest();
//nameSmallest();

function createArqUf(){
    for(let i = 1; i <= estados.length; i++){
        ufs = cidades.filter(cidade=>{
            return cidade.Estado == i;
        });
        const data =JSON.stringify(ufs);
        fs.writeFile('./arquivos/'+estados[i-1].Sigla+'.json', data, {enconding:'utf-8',flag: 'w'}, err => {
            if (err) throw err;
            console.log('Arquivo criado!\n');
        });
        ufs = [];
    }

}


async function lerArqUf(uf){
    
    fs.readFile('./arquivos/'+uf+'.json', 'utf-8', (err, data) =>{
        if(err) throw err;
        data = JSON.parse(data);
        qntCity = data.length;
    });
    
}

async function maisCidades(){

    const vet = [];
    const fiveMore = [];
    for(let i = 1; i <= estados.length; i++){
        lerArqUf(estados[i-1].Sigla);
        await sleep(5);
        vet.push(estados[i-1].Sigla+'-'+qntCity);
    }

    vet.sort((a,b)=>{
        const A = a.split('-');
        const B = b.split('-');
        return parseInt(B[1]) - parseInt(A[1]);
    });
    

    for(let i = 0; i < 5;i++){
        fiveMore.push(vet[i]);
    }

    console.log(fiveMore);
    
}

async function menosCidades(){

    const vet = [];
    const fiveLess = [];
    for(let i = 1; i <= estados.length; i++){
        lerArqUf(estados[i-1].Sigla);
        await sleep(5);
        vet.push(estados[i-1].Sigla+'-'+qntCity);
    }

    vet.sort((a,b)=>{
        const A = a.split('-');
        const B = b.split('-');
        return parseInt(A[1]) - parseInt(B[1]);
    });
    

    for(let i = 0; i < 5;i++){
        fiveLess.push(vet[i]);
    }

    console.log(fiveLess);
}

async function namesBiggers(){

    for(let i = 1; i <= estados.length; i++){

        fs.readFile('./arquivos/'+estados[i-1].Sigla+'.json', 'utf-8', (err, data) =>{
            if(err) throw err;
            ufs = JSON.parse(data);
        });
        await sleep(17);
        
        ufs.sort((a,b)=>{
            A = a.Nome.length;
            B = b.Nome.length;
            if(A>B){
                return -1;
            }else if(A<B){
                return 1;
            }else{
                a = a.Nome.toLowerCase();
                b = b.Nome.toLowerCase();
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            }
        });   
        biggers.push(ufs[0].Nome+' - '+estados[i-1].Sigla);
        ufs = [];
    }
    console.log(biggers);

}

async function namesSmallers(){

    for(let i = 1; i <= estados.length; i++){

        fs.readFile('./arquivos/'+estados[i-1].Sigla+'.json', 'utf-8', (err, data) =>{
            if(err) throw err;
            ufs = JSON.parse(data);
        });
        await sleep(18);
        
        ufs.sort((a,b)=>{
            A = a.Nome.length;
            B = b.Nome.length;
            if(A>B){
                return 1;
            }else if(A<B){
                return -1;
            }else{
                a = a.Nome.toLowerCase();
                b = b.Nome.toLowerCase();
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            }
        });   
        smallers.push(ufs[0].Nome+' - '+estados[i-1].Sigla);
        ufs = [];
    }
    console.log(smallers);

}

async function nameBiggest(){
    
    await namesBiggers();
    
    biggers.sort((a,b)=>{
        a = a.split('-');
        b = b.split('-');
        A = a[0].length;
        B = b[0].length;
        if(A>B){
            return -1;
        }else if(A<B){
            return 1;
        }else{
            a = a[0].toLowerCase();
            b = b[0].toLowerCase();
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }
    });
    console.log(biggers[0]);
}

async function nameSmallest(){
    
    await namesSmallers();
    
    smallers.sort((a,b)=>{
        a = a.split('-');
        b = b.split('-');
        A = a[0].length;
        B = b[0].length;
        if(A>B){
            return 1;
        }else if(A<B){
            return -1;
        }else{
            a = a[0].toLowerCase();
            b = b[0].toLowerCase();
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }
    });
    console.log(smallers[0]);
}
