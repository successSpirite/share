const form = document.querySelector("form"),
fileInput = form.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".Uploaded-area");






form.addEventListener("click", ()=>{
  fileInput.click();

});

fileInput.onchange = ({target}) =>{
    let file = target.files[0]; // getting files [0] this means if user selected multiples files then get first one only

    if(file){ // if file is selected
         
      let fileName= file.name; // getting selected file Name
      if(fileName.length >= 12){ // if files fileName.length >= 12
        let splitName = fileName.split('.');
        fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
      }
       uploadFile(fileName); //  calling uploadFile  with passsing files nmae as an argument

    }
    
}


  function uploadFile(name){

   let xhr = new XMLHttpRequest(); // creating new Xml obj (AJAX)
    xhr.open("POST", "php/upload.php"); // sending post request to the sepcified URL/File
    xhr.upload.addEventListener("progress", ({loaded, total}) =>{
     
      let fileLoaded = Math.floor((loaded / total) * 100); //getting percentage of loaded file size
      let fileTotal = Math.floor(total / 1000); //getting file size in KB for bytes
     
      //file size is less than 1024 then add only KB else convert size into KB to MB     <i class="icon-container"></i>
      let fileSize;
      (fileTotal < 12024) ? fileSize = fileTotal + "KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + "MB"; 
      let progressHTML =  ` <li class="row">
                          <i class="fas fa-file-alt"></i>
                          
                            <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percentage">${fileLoaded}%</span>
                              </div>
       
                             <div class="progress-bar">
                            <div class="progress" style="width: ${fileLoaded}%"></div>
                                 </div>
                                 </div>
      
                                 </li>`;
       uploadedArea.classList.add(onprogress);
       //uploadedArea.innerHTML = " "; //close this if we want to show upload history
       progressArea.innerHTML =  progressHTML;

       if(loaded == total){
          
        progressArea.innerHTML = " ";
            uploadedHTML = `<li class="row">
                           <div class="content">
                            <i class="fas fa-file-alt"></i>
                            <div class="details">
                             <span class="name">${name}• Uploaded</span>
                              <span class="size">${fileSize}</span>
                                </div>
                                </div>
                               <i class="fas fa-check"></i>
                                </li> `;

                 uploadedArea.classList.remove(onprogress);               
                 //uploadedArea.innerHTML = uploadedHTML; // close this if we want to show upload history

                                uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); // Open this if we want to show history
       }
     
      

    
   });
    
   
let formData = new FormData(form); // formData is an object to easily send form data
xhr.send(formData); //sending form data to php
}
