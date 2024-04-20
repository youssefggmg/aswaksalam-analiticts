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

// Ajoutez un écouteur d'événements à l'élément <select> avec la classe "selectDate"

document.querySelector('.selectDate').addEventListener('change', function() {

    year = parseInt(this.value,10); // Utilisez parseInt pour convertir la valeur en nombre entier
    listeMagasinFilter = filter_magasin_par_annee(JSON.parse(localStorage.getItem("magazins")), year);
     createHistogram(JSON.parse(localStorage.getItem("magazins")),  localStorage.getItem("key"), listeMagasinFilter);
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
  const labels = Classes.map((Class) => [`${Class.min},${Class.max}[]`]);
  const counts = Classes.map(Class => Class.count);
  afficher_graph(labels,counts);
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

function afficher_graph(labels,counts){
  
const ctx = document.getElementById('myChart');
let gra = Chart.getChart("myChart")
         console.log(gra)
          if(gra){
            gra.destroy()
          }
         
        new Chart(ctx, {
         type: 'bar',
         data: {
           labels: labels,
           datasets: [{
                label: false,
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
return listeAnnee;
}