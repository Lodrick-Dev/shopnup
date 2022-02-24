//le btn menu
const btn_main = document.getElementById('btn-menu');
const box_main = document.querySelector(".box-nav")
console.log(btn_main);
// btn_main.addEventListener("click", ()=>{
//     alert("touche downs")
// })
let touchstartX = 0;
let touchendX = 0;

// const slider = document.getElementById('slider')

function handleGesture() {
  if (touchendX < touchstartX){
      btn_main.classList.add('btn-main-left');
      box_main.classList.add("box-nav-actif")
      //   alert('swiped left!');
    }
    if (touchendX > touchstartX){
        btn_main.classList.remove('btn-main-left');
        box_main.classList.remove("box-nav-actif")
    //   alert('swiped right!')
  }
}

btn_main.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
  console.log(touchstartX);
})

btn_main.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    handleGesture()
})


/////le form
let btn_add = document.getElementById('btn-add');
const parentB = document.querySelector('.result');
let sous_to;
let id_counter= 0;

let tabAllSouTo = [];
const display_to = document.getElementById('total');

function addProduction(e) {
    e.preventDefault();
    if(document.getElementById("put-text").value === ""){
        return alert("Veuillez ajouter un produit")
    }
    else if(document.getElementById("put-price").value == 0 || document.getElementById("put-price").value ===""){
        return alert("Veuillez ajouter un prix")
    }
    else if(document.getElementById("put-quant").value <= 0){
        return alert("La quantité doit être égal ou supérieur a 1")
    }
    else{
        id_counter = Math.random();
        //pour un format monnaie
        let prixXqnt = document.getElementById("put-price").value * document.getElementById("put-quant").value
        let produit = {
            id : id_counter,
            product : document.getElementById("put-text").value,
            prix : parseFloat(document.getElementById("put-price").value),
            quant : parseFloat(document.getElementById("put-quant").value),
            sous_to : parseFloat(prixXqnt),
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
    // diplay_prod_add();
    console.log("je suis la 2");
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
    parentB.innerHTML = no_prod;}
    else{
        //permet d'afficher ce qu'il y a dans le local storage
        for(i = 0; i < prodRecordLocal.length; i++){
        //sous_to =  prodRecordLocal[i].prix * prodRecordLocal[i].quant; //pour calculer prix * quant
        structure_add = structure_add + `
        <div class="prod-add-js">
        <div class="id-none">${prodRecordLocal[i].id}</div>
        <div>${prodRecordLocal[i].product}</div>
        <div>${prodRecordLocal[i].prix.toLocaleString('fr', {minimumFractionDigits: 2, maximumFractionDigits: 2})} € </div>
        <div>${prodRecordLocal[i].quant} X</div>
        <div>${prodRecordLocal[i].sous_to.toLocaleString('fr', {minimumFractionDigits: 2, maximumFractionDigits: 2})} € </div>
        <button class="btn-supp-new-js"><i class="fas fa-trash"></i></button>
        </div>`;
        }
        if(i == prodRecordLocal.length){
        //inject dans html depuis localStorage
        parentB.innerHTML = structure_add;
        }
         display_total();
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


////displayle total
// let tabAllSouTo = [];
// const display_to = document.getElementById('total');
function display_total(){
    for(let a = 0; a < prodRecordLocal.length; a++){
        console.log(a);
        let all_sous_to = prodRecordLocal[a].sous_to;
        tabAllSouTo.push(all_sous_to);
        console.log(tabAllSouTo);
        console.log(all_sous_to);
    }

    const reducer =(acc, curr)=> acc + curr;
    const prixTotalInit = tabAllSouTo.reduce(reducer, 0);

    console.log(prixTotalInit);

    display_to.innerHTML = prixTotalInit.toLocaleString('fr', {minimumFractionDigits: 2, maximumFractionDigits: 2}) +"€";
}
function Otherdisplay_total(){
    if(localStorage){
        for(let a = 0; a < prodRecordLocal.length; a++){
            console.log(a);
            let all_sous_to = prodRecordLocal[a].sous_to;
            tabAllSouTo.push(all_sous_to);
            console.log(tabAllSouTo);
            console.log(all_sous_to);
        }
    
        const reducer =(acc, curr)=> acc + curr;
        const prixTotalInit = tabAllSouTo.reduce(reducer, 0);
    
        console.log(prixTotalInit);
    
        display_to.innerHTML = prixTotalInit.toLocaleString('fr', {minimumFractionDigits: 2, maximumFractionDigits: 2}) +"€";
    }
}
// Otherdisplay_total();



function calNadd(){
    addProduction(e);
}
btn_add.addEventListener('click', addProduction);

//tri
let tabTrie = [];
const filtre_prix = document.getElementById('trie-cours');
function funcFiltrePrix(e){
            switch(e.target.value){
                case "croissant" :
                        let croissanTrie = prodRecordLocal.sort((a,b) => a.prix - b.prix);
                        localStorage.setItem("produitLocal", JSON.stringify(croissanTrie));
                        window.location.reload()
                        console.log(croissanTrie);
                        console.log("croissant");
                break;
                case "decroissant" :
                    let decroisTrie = prodRecordLocal.sort((a,b) => b.prix - a.prix);
                        localStorage.setItem("produitLocal", JSON.stringify(decroisTrie));
                        window.location.reload();
                        console.log(decroisTrie);
                    console.log("ahah");
                    break;
                    default :
                    console.log("pas de trie");
                    break;
            };
}
filtre_prix.addEventListener('input', funcFiltrePrix);