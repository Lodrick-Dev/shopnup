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

        structure_add = structure_add + `
        <div class="prod-add-js">
        <div class="id-none">${prodRecordLocal[i].id}</div>
        <div>${prodRecordLocal[i].product}</div>
        <div>${prodRecordLocal[i].prix}</div>
        <div>${prodRecordLocal[i].quant}</div>
        <div>${prodRecordLocal[i].sous_to}</div>
        <button class="btn-supp-new-js">Supp</button>
        </div>`;
    }
    if(i == prodRecordLocal.length){
        //inject dans html depuis localStorage
        parentB.innerHTML = structure_add;
    }
    
}

btn_add.addEventListener('click', addEventListener);

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


////////Pour affioché le total et calcul
let totalAll=[];
const total_html = document.getElementById('total');
console.log(total_html);

for(let k = 0; k < prodRecordLocal.length; k++){
    let all_sous_total = prodRecordLocal[k].sous_to;
    totalAll.push(all_sous_total);
    console.log(totalAll);
};
//     //on creé un nouveau index dans l'objet
    //les 3 point permet de créer un nouveau index st
    //newInd = list_prod.map(e => ({...e, st : re.innerHTML = e.prix * e.quant}));

    //méthode reduce (accumulateur)
const red = (acc, curr) =>  acc + curr;
const prixTotalInit = totalAll.reduce(red, 0);//mettre 0 ici sinon erreur si y pas de produit
console.log(prixTotalInit);

//injection du total dans le html
total_html.innerHTML = prixTotalInit;