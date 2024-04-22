let arrAllMagazins = JSON.parse(localStorage.getItem("magazins"))
let teb =document.querySelector("#teb")

if(arrAllMagazins && arrAllMagazins.length > 0){
  arrAllMagazins = arrAllMagazins.reverse()
}
let pageConvert = false
const row = document.querySelector(".row")

const allMagaz = (x) =>{
  return x.map(item => `
  <div class="col d-flex justify-content-center justify-content-md-start col-lg-3 " )   } >
  <div class="card mb-4 allCardV " style="width: 18rem;" onClick = go("${item.name}")>
      <img class="card-img-top imageVeritical" src="../img/Aswak-Assalam-Emploi-Recrutement-Dreamjob.ma_.jpg" alt="Card image cap">
      <div class="card-body bodyCard">
        <h5 class="card-title">${item.name}</h5>
        <div>
          <i class="fa-solid fa-location-dot"></i> <strong> ${item.ville}, </strong><span class="card-text">${item.quartier}</span>                
        </div>
    </div>
  </div>
  </div>
  `).join("")
}

const allMagHorizo = (x)=>{
  return x.map(item => `
  <div class="col-12 col-lg-4  d-flex justify-content-center justify-content-md-start allCard align-items-center "   } >
  <div class="card mb-4 d-flex flex-row cardHorizontal"  style="width: 100%;" onClick = go("${item.name}")>
      <img class="card-img-top imageHorizontal" src="../img/Aswak-Assalam-Emploi-Recrutement-Dreamjob.ma_.jpg" alt="Card image cap">
      <div class=" card-body d-flex justify-content-center flex-column align-items-center">
        <h5 class="card-title">${item.name}</h5>
        <div>
          <i class="fa-solid fa-location-dot"></i> <strong> ${item.ville}, </strong><span class="card-text">${item.quartier}</span>                
        </div>
    </div>
  </div>
  </div>
  `).join("")
}

let getCity;
      const getMagazinbyCity = document.querySelector("#getMagazinByCity")
    getMagazinbyCity.addEventListener("change" , getMagzByCity)
    
    function getMagzByCity (){
      
      getCity = this.value
      if(getCity == "casa"){
        localStorage.setItem("getCity" ,getCity)
      }else if(getCity == "safi"){
        localStorage.setItem("getCity" ,getCity)
      }else if(getCity == "tanger"){
        localStorage.setItem("getCity" ,getCity)
      }else{
        localStorage.setItem("getCity" ,getCity)
      }
      
      let getCityVert = localStorage.getItem("getCity")
    
      if(pageConvert == true){
        if(getCityVert == "casa"){
          let arrAllMagazinsCasa = arrAllMagazins.filter(item=> item.ville == "casa")
            row.innerHTML= allMagHorizo(arrAllMagazinsCasa)
            }else if(getCityVert == "safi"){
              
         let arrAllMagazinsSafi = arrAllMagazins.filter(item=> item.ville == "safi")
          row.innerHTML= allMagHorizo(arrAllMagazinsSafi)
           }else if(getCityVert == "tanger"){
            let arrAllMagazinsTanger = arrAllMagazins.filter(item=> item.ville == "tanger")
          row.innerHTML= allMagHorizo(arrAllMagazinsTanger)
          }else {
            row.innerHTML = allMagHorizo(arrAllMagazins)
           }
      }else{
        if(getCityVert == "casa"){
          let arrAllMagazinsCasa = arrAllMagazins.filter(item=> item.ville == "casa")
            row.innerHTML= allMagaz(arrAllMagazinsCasa)
            }else if(getCityVert == "safi"){
              
         let arrAllMagazinsSafi = arrAllMagazins.filter(item=> item.ville == "safi")
          row.innerHTML= allMagaz(arrAllMagazinsSafi)
           }else if(getCityVert == "tanger"){
            let arrAllMagazinsTanger = arrAllMagazins.filter(item=> item.ville == "tanger")
          row.innerHTML= allMagaz(arrAllMagazinsTanger)
          }else {
            row.innerHTML = allMagaz(arrAllMagazins)
           }
      }
    
    }




function convertPage (){
    pageConvert =!pageConvert
    if(pageConvert== true){
      tab.innerHTML=`<i class="fa-solid fa-table-list fa-2xl" ></i>`
      
      let getCityVert = localStorage.getItem("getCity")
    
    if(getCityVert == "casa"){
      let arrAllMagazinsCasa = arrAllMagazins.filter(item=> item.ville == "casa")
        row.innerHTML= allMagHorizo(arrAllMagazinsCasa)
        }else if(getCityVert == "safi"){
          
     let arrAllMagazinsSafi = arrAllMagazins.filter(item=> item.ville == "safi")
      row.innerHTML= allMagHorizo(arrAllMagazinsSafi)
       }else if(getCityVert == "tanger"){
        let arrAllMagazinsTanger = arrAllMagazins.filter(item=> item.ville == "tanger")
      row.innerHTML= allMagHorizo(arrAllMagazinsTanger)
      }else {
        row.innerHTML = allMagHorizo(arrAllMagazins)
       }
    
}else{
  tab.innerHTML=`<i class="fa-solid fa-table-cells-large fa-2xl"></i>`
  let getCityVert = localStorage.getItem("getCity")
    if(getCityVert == "casa"){
    let arrAllMagazinsCasa = arrAllMagazins.filter(item=> item.ville == "casa")
      row.innerHTML= allMagaz(arrAllMagazinsCasa)
      }else if(getCityVert == "safi"){
        
   let arrAllMagazinsSafi = arrAllMagazins.filter(item=> item.ville == "safi")
    row.innerHTML= allMagaz(arrAllMagazinsSafi)
     }else if(getCityVert == "tanger"){
      let arrAllMagazinsTanger = arrAllMagazins.filter(item=> item.ville == "tanger")
    row.innerHTML= allMagaz(arrAllMagazinsTanger)
    }else {
      row.innerHTML = allMagaz(arrAllMagazins)
      }
    }
}



if(arrAllMagazins && arrAllMagazins.length > 0){
  getMagzByCity()
 // row.innerHTML = allMagaz(arrAllMagazins)
}


const go = (x) =>{
    
   const getOneMagazin = arrAllMagazins.find(item => item.name == x)
   localStorage.setItem("getOneMagazin" , JSON.stringify(getOneMagazin))
   window.location.href='./dash.html'
}