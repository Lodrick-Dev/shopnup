let touch_sup = document.querySelectorAll(".btn-supprimer");
console.log(touch_sup);

function getList(){
    let listStorage = window.localStorage.listAdd;
    parentB.innerHTML = listStorage;

    //ici la condition dit que si ya pas de local storage alors " " vide.
    if (!listStorage){
        parentB.innerHTML = "";
    }
}
getList()

for(let i = 0; i < touch_sup.length; i++){
    touch_sup[i].addEventListener("click", (e)=>{
        e.preventDefault();
        // let id = newInd[i].id;
        console.log(newInd);
    })
}