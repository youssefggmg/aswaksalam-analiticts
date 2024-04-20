// select elements from the DOM
let loge_out=document.querySelector("#loge-out")

// add event listener to the logout button
loge_out.addEventListener("click",(e)=>{
    window.location.href="loge in.html"
    // remove the token from the local storage
    localStorage.removeItem("user")
})