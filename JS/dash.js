
    // Prendre le magazin que j'ai fait le click
        const magasin = JSON.parse(localStorage.getItem("getOneMagazin"));
        console.log(magasin);
    // Prendre la liste des magazins 
        const listeMagasin = JSON.parse(localStorage.getItem("magazins"));
        console.log(listeMagasin);
        const yearCreation = year_Creation_Magasin(magasin);
        const currentYear=dateToday();
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = '';
        let index = rechercher(listeMagasin,magasin);
        afficher_modal_ajouter();
        execution_func_ajouter(listeMagasin, index,yearCreation,currentYear);
        button_X();
        document.getElementById("myName").textContent=listeMagasin[index].ville+" "+listeMagasin[index].quartier;
        if(listeMagasin[index].listeData){
            const size = listeMagasin[index].listeData.length-1;
            trie_afficherSurDashboard(listeMagasin, index, size, tbody);
            delete_item(listeMagasin,size,index);
            modification_data(listeMagasin,size,index,yearCreation,currentYear);
        }
       

// Declaration des fonctions necessaires pour l'execution du code 

// Function pour determiner l'année actuelle
function dateToday(){
    const currentdate=new Date();
    return currentdate.getFullYear();
  }
    // Function button X pour revenir en arriere
    function button_X(){
        const btnX=document.querySelectorAll(".btn-exitM");
        btnX[0].addEventListener("click",function(){
            window.location.href='./magazins.html';
        });
        btnX[1].addEventListener("click",function(){
            document.querySelector(".modal-overlay").style.display = "none";
            document.querySelector(".displayModifier").style.display = "none";   
            
          });
        btnX[2].addEventListener("click",function(){
            const annee = document.getElementById("ajouter_Annee");
            const ca = document.getElementById("ajouter_CA");
            const effectifs = document.getElementById("ajouter_Effectifs");
            const surface = document.getElementById("ajouter_Surface");
            annee.value = '';
                    ca.value = '';
                    effectifs.value = '';
                    surface.value = '';
            document.querySelector(".modal-overlay").style.display = "none";
            document.querySelector(".displayAjouter").style.display = "none";        
         });
    }

    // Function pour afficher modal ajouter
    function afficher_modal_ajouter() {
        document.getElementById("ajouterLigne").addEventListener("click", function() {
            document.querySelector(".modal-overlay").style.display = "block";
        document.querySelector(".displayAjouter").style.display = "block"; 
        });
    }

    // Function pour tirer les donnees de saisie et d'appliquer la function ajouter 
    function execution_func_ajouter(listeMagasin, index,yearCreation,currentYear) {
        const annee = document.getElementById("ajouter_Annee");
            const ca = document.getElementById("ajouter_CA");
            const effectifs = document.getElementById("ajouter_Effectifs");
            const surface = document.getElementById("ajouter_Surface");
           const magasinName=document.getElementById("ajouter_Magasin");
           magasinName.value=listeMagasin[index].ville+" - "+listeMagasin[index].quartier;
        document.getElementById("form-ajouter").addEventListener("submit", function(e) {
            e.preventDefault();
            if (annee.value == '' || ca.value == '' || effectifs.value == '' || surface.value == '' || magasin.value == '') {
                alert("Remplissez tous les champs s'il vous plaît.");
            } else {
                if(validation_ajouter(annee.value, ca.value, effectifs.value, surface.value)){
                    if(validation_donnees_ajouter(annee.value, ca.value, effectifs.value, surface.value,yearCreation,currentYear)==false) return ;
                   if(listeMagasin[index].listeData){
                    if(valider_existence_date_ajouter(listeMagasin,index,annee.value)==true) return ;
                   }
                    ajouter_data(listeMagasin, index, annee.value, ca.value, effectifs.value, surface.value);
                    annee.value = '';
                    ca.value = '';
                    effectifs.value = '';
                    surface.value = '';
                    document.querySelector(".modal-overlay").style.display = "none";
                    document.querySelector(".displayAjouter").style.display = "none";
                    location.reload();
                }
                else{
                    alert("La saisie doit etre des nombres pas des characteres");
                    return ;
                }
           
            }
        });
    }
    

// Pour ajouter les donnees de la data
    function ajouter_data(listeMagasin,index,anneeValue,caValue,effectifsValue,surfaceValue){
        const modifierBtn= '<img src="../img/modifierVal.png" alt="modifier" class="modifier">';
        const supprimerBtn = '<img src="../img/deleteVal.png" alt="delete" class="delete">';
    
        const data ={
           annee:anneeValue,
           CA:caValue,
           effectifs:effectifsValue,
           surface:surfaceValue, 
           modifier: modifierBtn ,
           supprimer:supprimerBtn ,
        }
         // Vérifier si il y a de data
         if (!listeMagasin[index].listeData) {
          listeMagasin[index].listeData = []; // Créer la liste des datas s'il n'existe pas encore
        }
        // Ajouter data à la liste des datas de la magasin
        listeMagasin[index].listeData.push(data);
        localStorage.setItem('magazins',JSON.stringify(listeMagasin));
        alert("Data ajouté avec succès !");
      }


    // Function pour trouver l'année de creation du magasin
    function year_Creation_Magasin(magasin) {
        const dateCreation = new Date(magasin.date);
        return dateCreation.getFullYear();
    }

    // Function pour determiner l'index du magasin dans la liste des magasins
    function rechercher(listeMagasin,magasin) {
        let index=-1;
        for(let i=0;i<listeMagasin.length;i++){
            if (listeMagasin[i].name==magasin.name) {
                index = i;
                break;    } }  return index; }

    // Function pour afficher les lignes avec le trie
    function trie_afficherSurDashboard(listeMagasin, index, size, tbody) {
        for (let i = size; i >= 0; i--) {
            const row = document.createElement("tr");
            const data = listeMagasin[index].listeData[i];
            row.innerHTML = `
                <td>${data.annee}</td>
                <td>${data.CA}</td>
                <td>${data.effectifs}</td>
                <td>${data.surface}</td>
                <td>${data.modifier}</td>
                <td>${data.supprimer}</td>
            `;
            tbody.appendChild(row);
        }
    };

    // Function pour faire la suppression de la ligne
    function delete_item(listeMagasin, size, index) {

        const rows = document.querySelectorAll("#tableau tbody tr");
        rows.forEach(function(row, j) {
            const del = row.querySelector("td:nth-child(6)").querySelector("img");
            del.addEventListener("click", function() {
                const indice = size - j;

                const confirmation = confirm("Voulez-vous vraiment supprimer cette data ?");

                if (confirmation) {
                    const newlisteData = listeMagasin[index].listeData.filter(function(data, ind) { return ind != indice; });
                    listeMagasin[index].listeData = newlisteData;
                    localStorage.setItem("magazins", JSON.stringify(listeMagasin));
                }
                location.reload();

            });
        });
    }


    function modification_data(listeMagasin,size,index,yearCreation,currentYear){
        let indice;
        const rows=document.querySelectorAll("#tableau tbody tr");
        rows.forEach(function(row,j){
            const modif=row.querySelector("td:nth-child(5)").querySelector("img");
            modif.addEventListener("click",function(){
             indice= size-j;
            //Changer diplay de none vers block
            document.querySelector(".modal-overlay").style.display = "block";
            document.querySelector(".displayModifier").style.display = "block";
            //Affichage des donnees sur le modal de modification
           
            document.getElementById('Magasin').value = listeMagasin[index].ville+" - "+listeMagasin[index].quartier;
            document.getElementById('Annee').value =listeMagasin[index].listeData[indice].annee;
            document.getElementById('CA').value = listeMagasin[index].listeData[indice].CA;
            document.getElementById('Surface').value = listeMagasin[index].listeData[indice].surface;
            document.getElementById('Effectifs').value = listeMagasin[index].listeData[indice].effectifs;
       
             });
        });
        document.getElementById("form-modifier").addEventListener("submit", function(event) {   
            event.preventDefault();          
        modification(listeMagasin, index, indice,yearCreation,currentYear);
            });
    };

    function modification(listeMagasin,index,indice,yearCreation,currentYear){
        let Annee= document.getElementById('Annee');
        let CA=document.getElementById("CA");
        let Surface=document.getElementById("Surface");
        let Effectifs=document.getElementById("Effectifs");
        if(Annee.value!='' && CA.value!='' && Surface.value!='' && Effectifs.value!=''){

        if(validation_modifier(Annee.value, CA.value, Effectifs.value, Surface.value)){
            if(validation_donnees_modifier(Annee.value, CA.value, Effectifs.value, Surface.value,yearCreation,currentYear)==false) return  ;
            if(valider_existence_date_modifier(listeMagasin,index,Annee.value,indice)==true) return  ;

        listeMagasin[index].listeData[indice].annee=Annee.value;
        listeMagasin[index].listeData[indice].CA=CA.value;
        listeMagasin[index].listeData[indice].effectifs=Effectifs.value;      
        listeMagasin[index].listeData[indice].surface=Surface.value;      
     alert("Modification a été effectuer avec succées.");
    localStorage.setItem('magazins',JSON.stringify(listeMagasin));
    document.querySelector(".modal-overlay").style.display = "none";
    document.querySelector(".displayModifier").style.display = "none";
    location.reload();
               } 
        else{
        alert("La saisie doit etre des nombres pas des characteres");
        return ;
     }
       }
       else{
        alert("Vous devez remplir tous les champs");
    return ;
       }
    }

    // Les fonctions pour faire la validation de les données saisies par l'utilisateur
    function validation_donnees_ajouter(anneeValue,caValue,effectifsValue,surfaceValue,yearCreation,currentYear){
        if(anneeValue<yearCreation || anneeValue>currentYear){
            document.getElementById("ajouter_Annee").value = ''; 
alert("Impossible que l'année saisie etre inferieure à la date de creation ou bien superieure à la date actuelle");
return false;
            }
    else if(caValue<=0 && effectifsValue<=0 && surfaceValue<=0 ){
        document.getElementById("ajouter_CA").value = '';  document.getElementById("ajouter_Effectifs").value = ''; document.getElementById("ajouter_Surface").value = ''; 
        alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    else if(caValue<=0 && effectifsValue<=0){
        document.getElementById("ajouter_CA").value = '';  document.getElementById("ajouter_Effectifs").value = ''; 
        alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    else if(caValue<=0 && surfaceValue<=0){
        document.getElementById("ajouter_CA").value = '';  document.getElementById("ajouter_Surface").value = ''; 
        alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    else if(effectifsValue<=0 && surfaceValue<=0){
        document.getElementById("ajouter_Effectifs").value = '';  document.getElementById("ajouter_Surface").value = ''; 
        alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    else if(caValue<=0 ){
        document.getElementById("ajouter_CA").value = '';   alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    else if( effectifsValue<=0){
         document.getElementById("ajouter_Effectifs").value = ''; 
        alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    else if(surfaceValue<=0 ){
      document.getElementById("ajouter_Surface").value = '';   alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    return true;
    }

    function validation_donnees_modifier(anneeValue,caValue,effectifsValue,surfaceValue,yearCreation,currentYear){
        if(anneeValue<yearCreation || anneeValue>currentYear){
alert("Impossible que l'année saisie etre inferieure à la date de creation ou bien superieure à la date actuelle");
return false;
            }
    else if(caValue<=0 || effectifsValue<=0 || surfaceValue<=0 ){
        
        alert("La saisie dans les champs doit etre un nombre positive");
        return false;
    }
    return true;
    }
    
    function validation_modifier (anneeValue,caValue,effectifsValue,surfaceValue){
        var regex = /^[0-9]+$/; let check=true;
if(!regex.test(anneeValue) || !regex.test(caValue) || !regex.test(effectifsValue) || !regex.test(surfaceValue)) {
  return false;}
        return true;
}
  
    function validation_ajouter (anneeValue,caValue,effectifsValue,surfaceValue){
        var regex = /^[0-9]+$/; let check=true;
if(!regex.test(anneeValue)) {
    document.getElementById("ajouter_Annee").value = '';  check=false; }
if(!regex.test(caValue)) {
    document.getElementById("ajouter_CA").value = '';  check=false; }
if(!regex.test(effectifsValue)) { 
    document.getElementById("ajouter_Effectifs").value = '';  check=false; } 
    if(!regex.test(surfaceValue)) { 
        document.getElementById("ajouter_Surface").value = '';  check=false; } 
    return check;
}

function valider_existence_date_ajouter(listeMagasin,index,anneeValue){
for(let i=0;i<listeMagasin[index].listeData.length;i++){
if(listeMagasin[index].listeData[i].annee==anneeValue){
    alert("La date doit etre unique pas de repetition de la date.");
    return true;
}
}
return false;
}

function valider_existence_date_modifier(listeMagasin,index,anneeValue,indice){

    for(let i=0;i<listeMagasin[index].listeData.length ;i++){
        if(i==indice) continue;
    if(listeMagasin[index].listeData[i].annee==anneeValue){
        alert("La date doit etre unique pas de repetition de la date.");
        return true;
    }
    }
    return false;
    }