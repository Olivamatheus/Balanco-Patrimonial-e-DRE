
// Ano
function anoCal () {
    const inputAno = document.getElementById('ano_in').value;
    outputAno = 0;
    
    if (inputAno !== "") {
        outputAno = inputAno;
        console.log(outputAno);
    }
    document.getElementById('ano_out').textContent = outputAno;
}

// Ativos Circulantes
const inputsAtvCirc = document.querySelectorAll(".atvcirc");
const arrayAtvCirc = [];

for (let i = 0; i < inputsAtvCirc.length; i++) {
    var inputAtvCirc = inputsAtvCirc[i];
    arrayAtvCirc.push({id:inputAtvCirc.id, value:0})
    inputAtvCirc.addEventListener('blur', (evt) => {

        const element = evt.target;
        var aux = {
            id:element.id,
            value:element.value
        }
        
        let indexArray = findArrayById(arrayAtvCirc, element.id);

        if (indexArray >= 0) {
            arrayAtvCirc[indexArray] = aux;
        } else {
            arrayAtvCirc.push(aux)   
        }
        calcAtvCirc(arrayAtvCirc);
    });
}

function calcAtvCirc(array) {
    var resatvcirc = 0;
    
    for (let i = 0; i < array.length; i++) {
        resatvcirc += Number(array[i].value)
    }
    document.getElementById('resatvcirc').textContent = resatvcirc;
    
}

//
function findArrayById (array, id) {
    for (let i = 0; i < array.length; i++){
        if (array[i].id == id) {
            return i;
        }
    }
    return -1;
}

// Ativos Não Circulantes
const inputsAtvNaoCirc = document.querySelectorAll(".atvNaoCirc");
const arrayAtvNaoCirc = [];

for(let i = 0; i < inputsAtvNaoCirc.length; i++){
    var inputAtvNaoCirc = inputsAtvNaoCirc[i];
    arrayAtvNaoCirc.push({id:inputAtvNaoCirc.id, value:0})
    inputAtvNaoCirc.addEventListener('blur', (evt) =>{

        const element = evt.target;
        var aux = {
            id:element.id,
            value:element.value
        }
        let indexArray = findArrayById(arrayAtvNaoCirc, element.id);

        if (indexArray >= 0) {
            arrayAtvNaoCirc[indexArray] = aux;
        } else {
            arrayAtvNaoCirc.push(aux)   
        }
        calcAtvNaoCirc(arrayAtvNaoCirc);
    })
}

function calcAtvNaoCirc(array) {
    var resAtvNaoCirc = 0;
    for (let i = 0; i < array.length; i++) {
        resAtvNaoCirc += Number(array[i].value)
    }
    document.getElementById('resAtvNaoCirc').textContent = resAtvNaoCirc;  
}

// Total do Ativo
const inputsAtv = document.querySelectorAll(".atv");
const arrayAtv = [];

for(let i = 0; i < inputsAtv.length; i++){
    var inputAtv = inputsAtv[i];
    arrayAtv.push({id:inputAtv.id, value:0})
    inputAtv.addEventListener('blur', (evt) =>{

        const element = evt.target;
        var aux = {
            id:element.id,
            value:element.value
        }
        let indexArray = findArrayById(arrayAtv, element.id);

        if (indexArray >= 0) {
            arrayAtv[indexArray] = aux;
        } else {
            arrayAtv.push(aux)   
        }
        calcAtv(arrayAtv);
        calcPl(arrayAtv);
        calcReserv(arrayAtv);
    })
}

function calcAtv(array) {
    var resAtv = 0;
    for (let i = 0; i < array.length; i++) {
        resAtv += Number(array[i].value)
    }
    document.getElementById('resTotAtv').textContent = resAtv; 
}

// Total Passivo
const inputsPass = document.querySelectorAll(".pass");
const arrayPass = [];

for(let i = 0; i < inputsPass.length; i++){
    var inputPass = inputsPass[i];
    arrayPass.push({id:inputPass.id, value:0})
    inputPass.addEventListener('blur', (evt) =>{

        const element = evt.target;
        var aux = {
            id:element.id,
            value:element.value
        }
        let indexArray = findArrayById(arrayPass, element.id);
        
        if (indexArray >= 0) {
            arrayPass[indexArray] = aux;
        } else {
            arrayPass.push(aux)   
        }
        calcPass(arrayPass);
        calcPl(arrayPass)
        calcReserv(arrayPass);
    })
}

function calcPass(array) {
    var resPass = 0;
    for (let i = 0; i < array.length; i++) {
        resPass += Number(array[i].value)
    }
    document.getElementById('resPass').textContent = resPass; 
    calcPassPl(array);
}

// Patrimonio Liquido = Ativo - Passivo; Reservas = (-) Capital Social

function calcPl () {
    var atv = document.getElementById('resTotAtv').innerText;
    var psv = document.getElementById('resPass').innerText;
    var pl = 0;
    if (atv !== "" || psv !== "") {
        pl = (atv - psv);
       
    }
    document.getElementById('patLiq').textContent = pl;
    calcPassPl(pl);
}

// Reservas

function calcReserv () {
    const inputCapSoc = document.getElementById('capsoc').value;
    const outputPl = document.getElementById('patLiq').innerText;
    var reserv = 0;

    if (outputPl !== "" || inputCapSoc !== "") {
        reserv = outputPl - inputCapSoc;
    }
    document.getElementById('reserv').textContent = reserv;
}

// Total do passivo + PL // OBS: NaN
function calcPassPl () {
    var totPass = document.getElementById('resPass').innerText;
    var patLiq = document.getElementById('patLiq').innerText;
    var totPassPl = 0;

    if (totPass === "" || totPassPl === NaN) {
        document.getElementById('passEPl').textContent = parseInt(patLiq);
    } 
    totPassPl = parseInt(totPass) + parseInt(patLiq);
    document.getElementById('passEPl').textContent = totPassPl;
}

// Resultado do exercício
// Lucro bruto
function lucroB () {
    var vendaBruta = document.getElementById('vendBru').value;
    var imposDesc = document.getElementById('impDescon').value;
    var custoVenda = document.getElementById('custVen').value;
    var lucroBruto = 0;

    if (vendaBruta !== "" || imposDesc !== "" || custoVenda !== "") {
        lucroBruto = vendaBruta - imposDesc - custoVenda;
    }
    document.getElementById('lucroBruto').textContent = lucroBruto;
    lucroP();
    
}

// Lucro Parcial
function lucroP () {
    var despOper = document.getElementById('despOp').value;
    var despFinan = document.getElementById('despFin').value;
    var lucroBruto = document.getElementById('lucroBruto').innerText;
    var lucroParcial = ""; 

    if (despOper === "" || despFinan === "") {
        var lucroParc = parseInt(lucroBruto);
        document.getElementById('lucroParc').textContent = lucroParc;
    }
    lucroParcial = parseInt(lucroBruto) - despOper - despFinan;
    document.getElementById('lucroParc').textContent = lucroParcial;
    lucroL();
}

// Lucro Líquido
function lucroL () {
    var IrCs = document.getElementById('despIrCs').value;
    var lucroParc = document.getElementById('lucroParc').innerText;
    var lucroLiq = "";

    if (IrCs === "") {
        var lucroLiqd = parseInt(lucroParc);
        document.getElementById('lucroLiq').textContent = lucroLiqd;
    }
    lucroLiq = parseInt(lucroParc) - IrCs;
    document.getElementById('lucroLiq').textContent = lucroLiq;
}