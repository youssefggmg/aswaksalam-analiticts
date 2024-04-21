// Hamza : Fontion main 
if(localStorage.getItem("magazins")){
  localStorage.setItem("key","CA");
  const listeMagasin=JSON.parse(localStorage.getItem("magazins"));
  // Creation de filter des dates
  let listeAnnee=creation_liste(listeMagasin);
mettreAJourSelectDate(listeAnnee);
let year=(Number)(document.querySelector('.selectDate').value);
let listeMagasinFilter=filter_magasin_par_annee(listeMagasin,year);
createHistogram(listeMagasin, "CA", listeMagasinFilter);
let mode=calculer_mode_moyenne_mediane(listeMagasinFilter,"CA","mode");
let moyenne=calculer_mode_moyenne_mediane(listeMagasinFilter,"CA","moyenne");
let mediane=calculer_mode_moyenne_mediane(listeMagasinFilter,"CA","mediane");
let ecartType=ecart_type(listeMagasinFilter,"CA", moyenne);
let coeff= CV(ecartType,moyenne);
const modeHtml=document.querySelectorAll(".mode");
modeHtml.forEach((mo)=>mo.textContent=mode);
const moyenneHtml=document.querySelector(".moyenne");
moyenneHtml.textContent=moyenne;
const medianeHtml=document.querySelectorAll(".mediane");
medianeHtml.forEach((me)=>me.textContent=mediane);
const ecartHtml=document.querySelectorAll(".ecart");
ecartHtml.forEach((e)=>e.textContent=ecartType);
const CVHtml=document.querySelector(".CV");
CVHtml.textContent=coeff;

// Ajoutez un écouteur d'événements à l'élément <select> avec la classe "selectDate"

document.querySelector('.selectDate').addEventListener('change', function() {

    year = parseInt(this.value,10); // Utilisez parseInt pour convertir la valeur en nombre entier
    listeMagasinFilter = filter_magasin_par_annee(JSON.parse(localStorage.getItem("magazins")), year);
     createHistogram(JSON.parse(localStorage.getItem("magazins")),  localStorage.getItem("key"), listeMagasinFilter);
      mode=calculer_mode_moyenne_mediane(listeMagasinFilter,localStorage.getItem("key"),"mode");
      moyenne=calculer_mode_moyenne_mediane(listeMagasinFilter,localStorage.getItem("key"),"moyenne");
      mediane=calculer_mode_moyenne_mediane(listeMagasinFilter,localStorage.getItem("key"),"mediane");
      ecartType=ecart_type(listeMagasinFilter,localStorage.getItem("key"), moyenne);
      coeff= CV(ecartType,moyenne);
      modeHtml.forEach((mo)=>mo.textContent=mode);
      moyenneHtml.textContent=moyenne;
      medianeHtml.forEach((me)=>me.textContent=mediane);
      ecartHtml.forEach((e)=>e.textContent=ecartType);
      CVHtml.textContent=coeff;

    });

//select the elements 
let title = document.querySelectorAll(".title");
title.forEach((e) => {
    e.addEventListener("click", () => {
        // Remove "active" class from all elements with class "title"
        title.forEach((element) => {
            element.classList.remove("active");
        });
        // Add "active" class to the clicked element
        e.classList.add("active");
 let choix=e.innerHTML;
         if(choix == "CA" || choix == "Effectifs" || choix == "Surface"){
          localStorage.setItem("key",choix);
          createHistogram(listeMagasin,choix,listeMagasinFilter);
          mode=calculer_mode_moyenne_mediane(listeMagasinFilter,choix,"mode");
          modeHtml.forEach((mo)=>mo.textContent=mode);
          moyenne=calculer_mode_moyenne_mediane(listeMagasinFilter,choix,"moyenne");
          moyenneHtml.textContent=moyenne;
          mediane=calculer_mode_moyenne_mediane(listeMagasinFilter,choix,"mediane");
          medianeHtml.forEach((me)=>me.textContent=mediane);
          ecartType=ecart_type(listeMagasinFilter,choix, moyenne);
          coeff= CV(ecartType,moyenne);
          ecartHtml.forEach((e)=>e.textContent=ecartType);
          CVHtml.textContent=coeff;

        }
    });
});
}

// Hamza : Les fonctions necessaires pour creer des histogrammes

function filter_magasin_par_annee(listeMagasin,year){
// Creation de liste magasins filtrer par l'année
  let listeMagasinFilter=[];
  for(let j=0;j<listeMagasin.length;j++){
    if(listeMagasin[j].listeData){
      for(let i=0;i<listeMagasin[j].listeData.length;i++){
        if((Number)(listeMagasin[j].listeData[i].annee)==year){
          // Creation de la magasin contient liste data de meme annee (year)
      let newMagasin = listeMagasin[j];
      newMagasin.listeData=listeMagasin[j].listeData[i];
      //Stocker la magasin dans la nouvelle liste des magasins filtrer
          listeMagasinFilter.push(newMagasin);
          break;
        }
      }
    }
  }
  // ListeMagasinFilter contient les magasins avec les donnees selon la date filtrer
  return listeMagasinFilter;
}

// Function de remplissage des donnees de l'histogramme
function createHistogram(listeMagasin,choix,listeMagasinFilter){
  if(choix=="CA"){
        // Trier les données par chiffre d'affaires (CA)
  listeMagasinFilter.sort((mag1,mag2)=>mag1.listeData.CA-mag2.listeData.CA);
  } else if(choix=="Effectifs"){
    // Trier les données par effectifs
    listeMagasinFilter.sort((mag1,mag2)=>mag1.listeData.effectifs-mag2.listeData.effectifs);
  }
      // Trier les données par surface
  else if(choix=="Surface"){
    listeMagasinFilter.sort((mag1,mag2)=>mag1.listeData.surface-mag2.listeData.surface);
  }

   // Calculer les classes  dynamiques
   const Classes=calculer_classes(listeMagasinFilter,choix);
    // Compter le nombre de magasins dans chaque classe 
    calculer_nbr_magasins(listeMagasinFilter,choix,Classes);
  const labels = Classes.map((Class) => `[ ${Class.min},${Class.max}[`);
  const counts = Classes.map(Class => Class.count);
  afficher_graph(labels,counts,choix);
}

   // Calculer les classes d'une maniere dynamiques
function calculer_classes(listeMagasinFilter,choix){
// Nombre de classes souhaité
const numClasses = 7;  let Values;
if(choix=="CA"){
  // Stocker juste les valeurs de CA des magasins
 Values = listeMagasinFilter.map(mag => mag.listeData.CA);
} else if(choix=="Effectifs"){
    // Stocker juste les valeurs d'effectifs des magasins
 Values = listeMagasinFilter.map(mag => mag.listeData.effectifs);
}
 else if(choix=="Surface"){
  // Stocker juste les valeurs de la surface des magasins
 Values = listeMagasinFilter.map(mag => mag.listeData.surface);
}
// Les fonctions Math.min et Math.max prend des argurments et pas liste donc on doit utiliser le spread operator 
// ... devant caValues, vous dites à JavaScript de traiter chaque élément de caValues comme un argument distinct
const Min = Math.min(...Values);
const Max = Math.max(...Values);
// Largeur de chaque histogramme
const classWidth = (Max - Min) / numClasses;

  const Classes = [];
  for (let i = 0; i < numClasses; i++) {
      const classMin = (Min + i * classWidth).toFixed(0);
      const classMax = (Min + (i + 1) * classWidth).toFixed(0);
      Classes.push({ min: classMin, max: classMax, count: 0 });
  }
  return Classes;
}

function afficher_graph(labels,counts,choix){
  
const ctx = document.getElementById('myChart');
let gra = Chart.getChart("myChart")
          if(gra){
            gra.destroy()
          }
        new Chart(ctx, {
         type: 'bar',
         data: {
           labels: labels,
           datasets: [{
                label: choix,
                data:counts,
                borderWidth: 1,
                minBarLength: 1,
                backgroundColor: 'blue',
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                }
            }
        }
});
}

function calculer_nbr_magasins(listeMagasinFilter,choix,Classes){
  let val;
  listeMagasinFilter.forEach(mag => {

    if(choix=="CA"){
      val= mag.listeData.CA;
    }else if(choix=="Effectifs"){
      val= mag.listeData.effectifs;
    }
    else if(choix=="Surface"){
      val= mag.listeData.surface;
    }

  for(let i=0;i<Classes.length;i++){
    if(val==Classes[Classes.length-1].max){
      Classes[Classes.length-1].count++;
      break;
    }
    if (val >= Classes[i].min && val < Classes[i].max) {
      Classes[i].count++;
      break;
  }  }
       
  });
}

// Fontion pour creation de la liste des dates 

function mettreAJourSelectDate(listeAnnee) {
  // Sélectionner l'élément <select> avec la classe "selectDate"
  const selectDateElement = document.querySelector('.selectDate');
  
  // Vider le contenu actuel de l'élément <select>
  selectDateElement.innerHTML = '';
  // Ajouter chaque année unique à l'élément <select> comme une option
  listeAnnee.forEach((annee) => {
      const option = document.createElement('option');
      option.value = annee; // Valeur de l'option
      option.textContent = annee; // Texte affiché pour l'option
      selectDateElement.appendChild(option); // Ajouter l'option à l'élément <select>
  });
}

function creation_liste(listeMagasin){

  let listeAnnee = new Set(); // Utilisez un ensemble (Set) pour stocker les années
  listeMagasin.forEach(function(magasin){
  if(magasin.listeData){
magasin.listeData.forEach(function(data){
  listeAnnee.add(data.annee); // Ajoutez chaque année à l'ensemble
})  }
});
listeAnnee = Array.from(listeAnnee);
listeAnnee.sort((a,b)=>b-a);
return listeAnnee;
}

function calculer_mode_moyenne_mediane(listeMagasinFilter,choix,methode) {
let valeurs=[]; let sum=0;
listeMagasinFilter.forEach((magasin)=>{
if(choix=="CA"){valeurs.push(magasin.listeData.CA); }
else if(choix=="Effectifs"){ valeurs.push(magasin.listeData.effectifs); }
else if(choix=="Surface"){ valeurs.push(magasin.listeData.surface); }
});
// Je fais le trie pour trouver la mediane apres
valeurs.sort((a,b)=>a-b);
const size=valeurs.length;
console.log(size);
// frequences est un objet qui contient des proprietes qui sont tous les valeurs CA ou Surface ou effectifs chaque propriete sera defini par le nbr de repetition de cette valeur
let frequences={};
valeurs.forEach((valeur)=>{
  // Cette partie pour calculer apres la moyenne 
  sum=(Number)(valeur)+sum;
  console.log("sum",sum);
// J'ai utiliser notation crochet frequences[valeur] car la propriete [valeur] de l'objet frequence est dynamique c'est variable (N'est pas une propriete connue au depart)
if(frequences[valeur]){
    frequences[valeur]=frequences[valeur]+1;
  }
  else{
    frequences[valeur]=1;
  }
});
// (Set) pour supprimer les valeurs en double et (...)spread operator pour decompose les elements de l'ensemble en argurment et [...]  les arguments distincts sont ensuite convertis en une nouvelle liste
let valeursUniques = [...new Set(valeurs)];   let maxFrequence=0;    
valeursUniques.forEach((valeurUnique)=>{
  if(frequences[valeurUnique]>maxFrequence){
    maxFrequence=frequences[valeurUnique];
  }
});
let modes=[];
valeursUniques.forEach((valeurUnique)=>{
  if(frequences[valeurUnique]==maxFrequence){
modes.push(valeurUnique);
  }
});
if(methode=="moyenne"){
  return (sum/size).toFixed(0);
}
else if(methode=="mode") {
  return modes;
}
else if(methode="mediane"){
  if (size % 2 === 1) {
    // Si le nombre total de valeurs est impair, la médiane est la valeur au milieu de la liste triée
    return valeurs[Math.floor(size / 2)];
} else {
    // Si le nombre total de valeurs est pair, la médiane est la moyenne des deux valeurs au milieu de la liste triée
    const milieuGauche =(Number)(valeurs[(size / 2) - 1]);
    const milieuDroit = (Number)(valeurs[size / 2]);
    return (milieuGauche + milieuDroit) / 2;
}
}
}

function ecart_type(listeMagasinFilter, choix, moyenne) {
  const size = listeMagasinFilter.length;
  let sommeCarresEcarts = 0;
  
  // Calculez les carrés des écarts par rapport à la moyenne
  listeMagasinFilter.forEach((magasin) => {
      let valeur;
      if (choix === "CA") {
          valeur = magasin.listeData.CA;
      } else if (choix === "Surface") {
          valeur = magasin.listeData.surface;
      } else if (choix === "Effectifs") {
          valeur = magasin.listeData.effectifs;
      }

      // Calculez l'écart et son carré
      const ecart = valeur - moyenne;
      sommeCarresEcarts += ecart * ecart;
  });
  
  // Calculez la variance
  const variance = sommeCarresEcarts / size;
  
  // Retournez l'écart-type, qui est la racine carrée de la variance
  return (Math.sqrt(variance)).toFixed(0);
}

function CV(ecartType,moyenne){
return (ecartType/moyenne).toFixed(2);
}
