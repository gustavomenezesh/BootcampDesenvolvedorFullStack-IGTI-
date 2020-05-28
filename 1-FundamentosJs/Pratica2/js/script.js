let datas = [];
let filteredData = [];
let inputName = null;
let button = null;

window.addEventListener('load', () => {
    inputName = document.querySelector('input');
    button = document.querySelector('button');
    activateButton();
    request_data();
    preventFormSubmit();
    activateInput();
});

async function request_data(){
    const resp = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const jsonn = await resp.json();
    datas = jsonn.results;
}


function preventFormSubmit(){
    function handleFormSubmit(event){
        event.preventDefault();
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateButton(){
    function onClick(event){
        if(inputName.value.trim() !== ''){
            filteredData = datas.filter(data => {
                const name = (data.name.first +' '+ data.name.last).toUpperCase();
                return (name.indexOf(inputName.value.toUpperCase()) != -1) || (name.indexOf(inputName.value.toUpperCase()) != -1);
            });
            render();
            console.log(filteredData);
        }
        
        if(inputName.value.trim() === ''){
            inputName.value = '';
        }
    }

    button.addEventListener('click', onClick);
    inputName.focus();
}

function activateInput(){
    function handleTyping(event){
        if(event.key === "Enter" && inputName.value.trim() !== ''){
            filteredData = datas.filter(data => {
                const name = (data.name.first +' '+ data.name.last).toUpperCase();
                return (name.indexOf(event.target.value.toUpperCase()) != -1) || (name.indexOf(event.target.value.toUpperCase()) != -1);
            });
            render();
            console.log(filteredData);
        }
        
        if(inputName.value.trim() === ''){
            inputName.value = '';
        }
    }

    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function render(){

    const numbData = []
    let male = 0;
    let fem = 0;
    let AgeSum = 0;
    let AgeMed = 0;

    function createImg(i) {
        let im = document.createElement('img');
        im.classList.add('imagem');
        im.src = filteredData[i].picture.large;
        return im;
    };

    function createSpan(i){
        let span = document.createElement('span');
        span.textContent = filteredData[i].name.first +' '+ filteredData[i].name.last + ', ' + filteredData[i].dob.age + ' anos';
        return span; 
    };

    function estatistica(){
        for(let i = 0; i < filteredData.length; i++){
            if(filteredData[i].gender === 'male')
                male++;
            else
                fem++;
            AgeSum += filteredData[i].dob.age;
            AgeMed = (AgeSum/filteredData.length).toFixed(2);

        }
    }

    function loadStatistic(){
        numbData.push({label:'Sexo Masculino', value: male});
        numbData.push({label:'Sexo Feminino', value: fem});
        numbData.push({label:'Soma das Idades', value: AgeSum});
        numbData.push({label:'Média das Idades', value: AgeMed});
    }

    const ulUsers = document.querySelector('ul#lista-users');
    const ulNumb = document.querySelector('ul#numbers')
    const numbUsers = document.querySelector('h2#numb-users');
    const est = document.querySelector('h2#estatistica');

    ulUsers.innerHTML = '';
    ulNumb.innerHTML = '';
 
    numbUsers.textContent = filteredData.length+' Usuários encontrados';
    est.textContent = 'Estatística'

    for(let i = 0; i < filteredData.length; i++){

        const li = document.createElement('li');

        const img = createImg(i);
        const span = createSpan(i);

        li.appendChild(img);
        li.appendChild(span);
        ulUsers.appendChild(li);
    }

    estatistica();
    loadStatistic();

    for(let i = 0; i < 4; i++){

        const li = document.createElement('li');
        li.textContent = numbData[i].label+': ';

        const span = document.createElement('span');
        span.textContent = numbData[i].value;
        span.classList.add('spam');

        li.appendChild(span);
        ulNumb.appendChild(li);
    }


}

