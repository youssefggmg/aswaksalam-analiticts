// select element 
const nameMagazin = document.querySelector(".name")
const ville = document.querySelector("#Ville")
let quartier = document.querySelector("#Quartier")
const date = document.querySelector(".date")
const valid = document.querySelector(".addButton")
 nameMagazin.addEventListener("change" , changeNameMagazin)
 ville.addEventListener("change" , changeVilleMagazin)
 quartier.addEventListener("change" , changeQuartieMagazin)
 date.addEventListener("change" , changeDateMagazin)

//  values
 let nameOneMagazin="";
 let villeMagazin = ville.value;

 let dateCreation="";
 let magazinArray = [];
 let quartierMagazin=quartier.value;
//  changing the Quartier with the change of the ville
// this function was added by youssef
ville.addEventListener("change",()=>{
  if(villeMagazin=="safi"){
    
    quartier.innerHTML=`
    <option value="Azib Drai" >Azib Drai</option>
    <option value="Miftah Khier">Miftah Khier</option>
    <option value="Ijnnane">Ijnnane</option>`;
    quartierMagazin = quartier.value
  }
  else if(villeMagazin=="tanger"){
    quartier.innerHTML=`
    <option value="Mujahidine" >Mujahidine</option>
    <option value="Bni Makada">Bni Makada</option>
    <option value="Tanja Balia">Tanja Balia</option>`;
    quartierMagazin = quartier.value
    
  }else if(villeMagazin=="casa"){
    quartier.innerHTML=`
    <option value="sidimarouf" >sidimarouf</option>
    <option value="ainshoq">ainshoq</option>
    <option value="lwalfa">lwalfa</option>`;
    
    
  }
  
})

// take the values the values from the inputs
function changeNameMagazin (e){
  nameOneMagazin = e.target.value
}
function changeVilleMagazin(e){
   villeMagazin = e.target.value
}



  
function changeQuartieMagazin(e){
 quartierMagazin = e.target.value
 console.log(quartierMagazin)
}
let toDaya = new Date()

    let day = `${toDaya.getDate() < 10 ? "0":""}${toDaya.getDate()}`
    let month = `${toDaya.getMonth()+1 < 10 ? "0":""}${toDaya.getMonth()+1}`
    let years = toDaya.getFullYear()
     toDaya = `${years}-${month}-${day}`
    
     date.setAttribute("max" , toDaya)
 function changeDateMagazin(e){
   dateCreation = e.target.value
  }

valid.addEventListener("click" , valideMagazin)
function valideMagazin(){
  if(nameOneMagazin == ""){
    alert("name is required")
    return ;
    }
  if(dateCreation == ""){
    alert("date creation is required")
    return ;
    }
   
  // console.log(quartierMagazin)
    let magazinObject = {
      name :nameOneMagazin,
      ville : villeMagazin,
      quartier : quartierMagazin,
      date : dateCreation
    }
  const getMagazins = JSON.parse(localStorage.getItem("magazins"))
        let magazinErr;
      if(getMagazins){
      magazinErr =  getMagazins.find(item => item.name == nameOneMagazin)
      }
      if(magazinErr){
        alert("name already exist")
        return;
      }
    
      if(getMagazins){

        magazinArray = [...getMagazins , magazinObject]
    }else{
        magazinArray.push(magazinObject)
    }
    // console.log(magazinArray)
    localStorage.setItem("magazins", JSON.stringify(magazinArray))
    window.location.href = "magazins.html"
}