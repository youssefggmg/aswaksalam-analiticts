// select the elements
let emailInput = document.querySelector("#gmail");
let passwordInpute = document.querySelector("#password");
let submetButoon = document.querySelector("#button")
let error = document.querySelector("#error");
// making the admine email amd password
let adminemail="theadmin@gmial.com";
let thepassworde="theonlyadmin";

// check if the user is conected
if (sessionStorage.getItem("conected")!==null) {
    window.location.href="magazins.html";
}

// click on sign in event
submetButoon.addEventListener("click",(e)=>{
    e.preventDefault();
    error.innerHTML='';

    let email=emailInput.value.trim();
    let password=passwordInpute.value.trim();
    if (password!==thepassworde||email!==adminemail) {
        error.innerHTML="you have entered somthing wrong";
        return;
    }
    else{
        window.location.href="magazins.html";
        sessionStorage.setItem("conected",true);
    }
})