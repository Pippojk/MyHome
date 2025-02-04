const sala = document.querySelector(".sala");
const cucina = document.querySelector(".cucina");
const studio = document.querySelector(".studio");
const bagno1 = document.querySelector(".bagno1");
const bagno2 = document.querySelector(".bagno2");

let salaB = false;
let cucinaB = false;
let studioB = false;
let bagno1B = false;
let bagno2B = false;

let salaN;
let cucinaN;
let studioN;
let bagno1N;
let bagno2N;

for(let i = 0; i<stanze_prenotate[1][0].length; i++){
    if(stanze_prenotate[1][0][i] == "sala"){
        salaB = true;
        sala.innerHTML = "<h3>sala: occupata da "+ stanze_prenotate[0][0][i] +"</h3>";
        salaN = stanze_prenotate[0][0][i];
    }else if(stanze_prenotate[1][0][i] == "cucina"){
        cucinaB = true;
        cucina.innerHTML = "<h3>cucina: occupata da "+ stanze_prenotate[0][0][i] +"</h3>";
        cucinaN = stanze_prenotate[0][0][i];
    }else if(stanze_prenotate[1][0][i] == "studio"){
        studioB = true;
        studio.innerHTML = "<h3>studio: occupata da "+ stanze_prenotate[0][0][i] +"</h3>";
        studioN = stanze_prenotate[0][0][i];
    }else if(stanze_prenotate[1][0][i] == "bagno1"){
        bagno1B = true;
        bagno1.innerHTML = "<h3>bagno1: occupata da "+ stanze_prenotate[0][0][i] +"</h3>";
        bagno1N = stanze_prenotate[0][0][i];
    }else if(stanze_prenotate[1][0][i] == "bagno2"){
        bagno2B = true;
        bagno2.innerHTML = "<h3>bagno2: occupata da "+ stanze_prenotate[0][0][i] +"</h3>";
        bagno2N = stanze_prenotate[0][0][i];
    }
}

function prenota(stanza){
    
    if (stanza === "sala") {
        if(!salaB){
            sala.innerHTML = `<h3>sala: occupata da ${nome}</h3>`;
            prenotar(stanza);
        }else if(salaB && nome == salaN){
            sala.innerHTML = `<h3>sala: ...`;
            eliminar(stanza);
        }
    } else if (stanza === "cucina") {
        if(!cucinaB){ 
            cucina.innerHTML = `<h3>cucina: occupata da ${nome}</h3>`;
            prenotar(stanza);
        }else if(cucinaB && nome == cucinaN){
            cucina.innerHTML = `<h3>cucina: ...`;
            eliminar(stanza);
        }
    } else if (stanza === "studio") {
        if(!studioB){
            studio.innerHTML = `<h3>studio: occupata da ${nome}</h3>`;
            prenotar(stanza);
        }else if(studioB && nome == studioN){
            studio.innerHTML = `<h3>studio: ...</h3>`;
            eliminar(stanza);
        }
    } else if (stanza === "bagno1") {
        if(!bagno1B){
            prenotar(stanza);
            bagno1.innerHTML = `<h3>bagno 1: occupata da ${nome}</h3>`;
        }else if(bagno1B && nome == bagno1N){
            bagno1.innerHTML = `<h3>bagno 1: ...</h3>`;
            eliminar(stanza);
        }
    } else if (stanza === "bagno2") {
        if(!bagno2B){
            bagno2.innerHTML = `<h3>bagno 2: occupata da ${nome}</h3>`;
            prenotar(stanza);
        }else if(bagno2B && nome == bagno2N){
            bagno2.innerHTML = `<h3>bagno 2: ...</h3>`;
            eliminar(stanza);
        }
    }
}

function prenotar(stanza) {
    fetch("home.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `stanza=${stanza}&name=${nome}`,
    })
    .catch(error => {
        console.error("Errore:", error);
    });
}

function eliminar(stanza){
    fetch("home.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `DelStan=${stanza}`,
    })
    .catch(error => {
        console.error("Errore:", error);
    });
}


function change(type){
    const pranzoT = document.querySelector(".pranzo h3");
    const pranzobtn = document.querySelector(".pranzo button");
    const pranzoI = document.querySelector(".pranzo input");

    const cenaT = document.querySelector(".cena h3");
    const cenaI = document.querySelector(".cena input");
    const cenabtn = document.querySelector(".cena button");

    const spesaT = document.querySelectorAll(".spesa h3");
    const lastSpesaT = spesaT[spesaT.length - 1];
    const spesaI = document.querySelector(".spesa input");
    const spesabtn = document.querySelector(".spesa button");
    if(type == "pranzo"){
        if(document.querySelector(".pranzo button").innerHTML == "change"){
            pranzoI.value = "";
            pranzoT.style.display = "none";
            pranzoI.style.display = "block";
            pranzobtn.innerHTML = "submit";
        }else{ 
            pranzoT.innerHTML = pranzoI.value;
            fetch("home.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `pranzo=${pranzoT.innerHTML}`,
            })


            pranzoT.style.display = "block";
            pranzoI.style.display = "none";
            pranzobtn.innerHTML = "change";
        }
    }else if(type == "cena"){
        if(document.querySelector(".cena button").innerHTML == "change"){
            cenaI.value = "";
            cenaT.style.display = "none";
            cenaI.style.display = "block";
            cenabtn.innerHTML = "submit";
        }else{
            cenaT.innerHTML = cenaI.value;
            fetch("home.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `cena=${cenaT.innerHTML}`,
            })


            cenaT.style.display = "block";
            cenaI.style.display = "none";
            cenabtn.innerHTML = "change";
        }
    }else{
        if(document.querySelector(".spesa button").innerHTML == "add"){
            spesaI.value = "";
            lastSpesaT.style.display = "none";
            spesaI.style.display = "block";
            spesabtn.innerHTML = "submit";
        }else{ 
            lastSpesaT.innerHTML = spesaI.value;
            console.log(lastSpesaT.innerHTML);
            fetch("home.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `spesa=${lastSpesaT.innerHTML}`,
            }).catch(error =>{
                console.log(error);
            })

            let nuovoDiv = document.createElement('h3');
            let secondoDiv = document.createElement('h3');
            
            nuovoDiv.style.display = "none";
            document.querySelector(".holder").appendChild(nuovoDiv);

            lastSpesaT.style.display = "block";
            spesaI.style.display = "none";
            spesabtn.innerHTML = "add";
        }
    }
}

function ell(){
    const elementi = document.querySelectorAll(".spesa h3");
    elementi.forEach(el => el.remove());

    fetch("home.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `chiamafunzione=${"cc"}`,
    }).catch(error =>{
        console.log(error);
    })
}
let lastFavoriT;

function favori(){
    const favoriT = document.querySelectorAll(".favori h2");
    lastFavoriT = favoriT[favoriT.length - 1];
    const favoriI = document.querySelector("#inpF");
    const favoribtn = document.querySelector(".favori button");

    if(favoribtn.innerHTML == "richiedi favori"){
        favoriI.value = "";
        lastFavoriT.style.display = "none";
        favoriI.style.display = "block";
        console.log("favoriI");
        favoribtn.innerHTML = "submit";

    }else{ 
        lastFavoriT.innerHTML = favoriI.value;
        lastFavoriT.onclick = ()=>{gestisciFav(lastFavoriT.innerHTML)};

        fetch("home.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `favori=${lastFavoriT.innerHTML}`,
        }).catch(error =>{
            console.log(error);
        })

        let h2 = document.createElement('h2');
        let secondoDiv = document.createElement('h2');
        secondoDiv.id = lastFavoriT.innerHTML;
        h2.style.display = "none";
        document.querySelector(".holderr").appendChild(h2);
        document.querySelector(".holderrr").appendChild(secondoDiv);


        lastFavoriT.style.display = "block";
        favoriI.style.display = "none";
        favoribtn.innerHTML = "richiedi favori";
    }
}

function gestisciFav(ciao){
    const name = document.getElementById(ciao);
    let elementi = document.querySelectorAll("h2");
    let risultato = Array.from(elementi).find(element => element.innerHTML === ciao);
    if(name.innerHTML == ''){
        name.innerHTML = nome;
        
        fetch("home.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `Nfavori=${ciao}`,
        }).catch(error =>{
            console.log(error);
        })
    }else if(name.innerHTML == nome){
        name.remove();
        risultato.remove();

        fetch("home.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `Dfavori=${ciao}`,
        }).catch(error =>{
            console.log(error);
        })
    }
}