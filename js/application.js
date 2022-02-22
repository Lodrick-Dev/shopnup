let btn_add = document.getElementById('btn-add');
const parentB = document.querySelector('.result')
let sous_to;
let id_counter= 0;
function addProduction(e) {
    id_counter = Math.random();
    e.preventDefault();
    let produit = {
        id : id_counter,
        product : document.getElementById("put-text").value,
        prix : document.getElementById("put-price").value,
        quant : document.getElementById("put-quant").value,
        sous_to : document.getElementById("put-price").value * document.getElementById("put-quant").value,
    }
    //json.parse() pour traduir un format Json en objetJavascript
    //json.stringify() pour traduir un objetJavascript en fromat 'JSon'
    let prodRecordLocal = JSON.parse(localStorage.getItem('produitLocal'));//important de déclarer avec Json.parse

    //si y a des déjà des produit dans le localStorage
    if(prodRecordLocal){
        prodRecordLocal.push(produit);
        localStorage.setItem("produitLocal", JSON.stringify(prodRecordLocal));
        console.log(prodRecordLocal);
        // window.location.reload();//pour rafraichir la page
    } else{
            prodRecordLocal = []; //important de mettre ceci vide quand il y a pas de localStorage
            prodRecordLocal.push(produit);
            localStorage.setItem("produitLocal", JSON.stringify(prodRecordLocal));
            console.log(prodRecordLocal);
        }
        window.location.reload();//pour rafraichir la page
}



//pour recupérer ce qu'il y a dans le tableau
let prodRecordLocal = JSON.parse(localStorage.getItem('produitLocal'));//important de déclarer avec Json.parse
let structure_add = [];
///affiche ce qu'il ya dans le localStorage dans le html
//si y a rien dans le localStorage
if(!prodRecordLocal || prodRecordLocal == 0){
    console.log("vide");
    const no_prod = `
    <div class="no-prod">Aucun produit a été ajouté</div>`;
    parentB.innerHTML = no_prod;

} else{
    //permet d'afficher ce qu'il y a dans le local storage
    for(i = 0; i < prodRecordLocal.length; i++){
        sous_to =  prodRecordLocal[i].prix * prodRecordLocal[i].quant; //pour calculer prix * quant
        structure_add = structure_add + `
        <div class="prod-add-js">
        <div class="id-none">${prodRecordLocal[i].id}</div>
        <div>${prodRecordLocal[i].product}</div>
        <div>${prodRecordLocal[i].prix}</div>
        <div>${prodRecordLocal[i].quant}</div>
        <div>${sous_to}</div>
        <button class="btn-supp-new-js">Supp</button>
        </div>`;
    }
    if(i == prodRecordLocal.length){
        //inject dans html depuis localStorage
        parentB.innerHTML = structure_add;
    }
    
}

//recupérer les btn
let btn_sup = document.querySelectorAll('.btn-supp-new-js');
//console.log(btn_sup);
//select de id de l'obj prod ajouté
for(let j = 0; j < btn_sup.length; j++){
    btn_sup[j].addEventListener("click", (e)=>{
        e.preventDefault();
        //select id du produi correspond
        let id_pro_select = prodRecordLocal[j].id;
        console.log("id_pro_select");
        console.log(id_pro_select);

        //avec filter !== on supprime l'élément cliqué via son id ,
        prodRecordLocal = prodRecordLocal.filter(el => el.id !== id_pro_select);
        console.log(prodRecordLocal);

        window.location.reload();//pour rafraichir la page

        //ici on envoi le nouveau tableau dans le localStorage avec l'element supprimé
        localStorage.setItem("produitLocal", JSON.stringify(prodRecordLocal));
    })
}


////display total
let tabAllSouTo = [];
const display_to = document.getElementById('total');
console.log(display_to);
for(let a = 0; a < prodRecordLocal.length; a++){
    console.log(a);
    let all_sous_to = prodRecordLocal[a].sous_to;
    tabAllSouTo.push(all_sous_to),
    console.log(tabAllSouTo);
    console.log(all_sous_to);
}
const reducer =(acc, curr)=> acc + curr;
const prixTotalInit = tabAllSouTo.reduce(reducer, 0);

console.log(prixTotalInit);

display_to.innerHTML = prixTotalInit;

btn_add.addEventListener('click', addProduction);


let newInd;
function creatElement(){
    let prod = document.getElementById("put-text").value;
    let price = document.getElementById("put-price").value;
    let quant = document.getElementById("put-quant").value;

    let ul = document.createElement('ul');
    ul.classList.add('sous-parent-js')
    parentB.appendChild(ul)
    let ident = document.createElement("div");
    ul.appendChild(ident);
    ident.innerHTML = id_counter;
    let li1 = document.createElement("div");
    ul.appendChild(li1)
    li1.innerHTML = prod;
    let li2 = document.createElement("div");
    ul.appendChild(li2)
    li2.innerHTML = price;
    let li3 = document.createElement("div");
    ul.appendChild(li3)
    li3.innerHTML = quant;

    let re = document.createElement("div");
    re.classList.add('sous-total');
    ul.appendChild(re);

    //on creé un nouveau index dans l'objet
    newInd = list_prod.map(e => ({...e, st : re.innerHTML = e.prix * e.quant}));

    let btnSup = document.createElement('div');
    // btnSup.innerHTML = `<button class="btn-supp">Hit-Me</button>`;
    btnSup.innerHTML = `<button class="btn-supprimer">Hit-Me</button>`;
    ul.appendChild(btnSup);
    //console.log(newInd);

    //stockToDo();

}


//je dois envoyé un tableau dans le localStorage
// function azret(){
//     let touch_sup = document.querySelectorAll(".btn-supprimer");
// }

// azret();








// function stockToDo(){
        //     window.localStorage.listAdd = parentB.innerHTML;
        // }

// function getList(){
//     let listStorage = window.localStorage.listAdd;
//     parentB.innerHTML = listStorage;

//     //ici la condition dit que si ya pas de local storage alors " " vide.
//     if (!listStorage){
//         parentB.innerHTML = "";
//     }
// }
// getList()











// function total(){
//     const red = (acc, curr) =>  acc + curr;
// }

// function sous_to(a, b, c){
//     const resulTo = a * b;
//     c.innerHTML = resulTo;
// }