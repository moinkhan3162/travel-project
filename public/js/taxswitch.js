

 
 let taxSwitch = document.getElementById("flexSwitchCheckDefault")
  taxSwitch.addEventListener("click", ()=>{
let infos=document.getElementsByClassName("tax-info")
   for(let info of infos){
      if(info.style.display !=  "inline"){
       info.style.display = "inline"
      }else{
        info.style.display = "none"
      }
     
  }

  })



let categories = document.getElementById("filters");

document.getElementById("leftBtn").addEventListener("click", () => {
 
    categories.scrollBy({
        left: -200,
        behavior: "smooth"
    });
});

document.getElementById("rightBtn").addEventListener("click", () => {
    categories.scrollBy({
        left: 200,
        behavior: "smooth"
    });
});

