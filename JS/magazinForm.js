// select element 
const nameMagazin = document.querySelector(".name")
const ville = document.querySelector("#Ville")
const quartier = document.querySelector("#Quartier")
const date = document.querySelector(".date")
const valid = document.querySelector(".btn")
 nameMagazin.addEventListener("change" , changeNameMagazin)
 ville.addEventListener("change" , changeVilleMagazin)
 quartier.addEventListener("change" , changeQuartieMagazin)
 date.addEventListener("change" , changeDateMagazin)

//  values
 let nameOneMagazin="";
 let villeMagazin = ville.value;
 let quartierMagazin =quartier.value;
 let dateCreation="";
 let magazinArray = [];

//  changing the Quartier with the change of the ville
// this function was added by youssef
ville.addEventListener("change",()=>{
  if(villeMagazin=="safi"){
    quartier.innerHTML=`
    <option value="Azib Drai" >Azib Drai</option>
    <option value="Miftah Khier">Miftah Khier</option>
    <option value="Ijnnane">Ijnnane</option>`;
    villeMagazin="Azib Drai";
  }
  else if(villeMagazin=="tanger"){
    quartier.innerHTML=`
    <option value="Mujahidine" >Mujahidine</option>
    <option value="Bni Makada">Bni Makada</option>
    <option value="Tanja Balia">Tanja Balia</option>`;
    villeMagazin="Mujahidine";
  }else if(villeMagazin=="casa"){
    quartier.innerHTML=`
    <option value="sidimarouf" >sidimarouf</option>
    <option value="ainshoq">ainshoq</option>
    <option value="lwalfa">lwalfa</option>`;
    villeMagazin = "sidimarouf";
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
}
 function changeDateMagazin(e){
   dateCreation = e.target.value
 }


valid.addEventListener("click" , valideMagazin)
function valideMagazin(){
  console.log(valideMagazin)
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
    console.log(magazinArray)
    localStorage.setItem("magazins", JSON.stringify(magazinArray))
    window.location.href = "magazins.html"
}