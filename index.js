let cards = 14;
let illustrations = 10;

const perspectiveOrigin = {
  x: parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--scenePerspectiveOriginX"
    )
  ),
  y: parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--scenePerspectiveOriginY"
    )
  ),
  maxGap: 10
};

function inView(id){ //The function to check if ID is in view, returns TRUE/FALSE
  var object = document.getElementById(id);
  var y = object.getBoundingClientRect().y;
  // console.log(id, object.getBoundingClientRect().y, window.innerHeight)
  if( y < 0 ){
      return true;
  }else{
      return false;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("mousemove", moveLetters);
  window.addEventListener("scroll", function() {
    if(inView("card-viewport")){
      document.documentElement.style.setProperty("--viewportDisplay", "block");
      moveCamera();
      changeBg();
    }  
    else{
      document.documentElement.style.setProperty("--viewportDisplay", "none");
    } 
  }
  );
  window.addEventListener("mousemove", moveCameraAngle);
  setSceneHeight();
});

function moveCamera() {
  document.documentElement.style.setProperty("--cameraZ", window.pageYOffset - (window.innerHeight * 2)); //Minus the height of content above!
}

function setSceneHeight() {
  const numberOfItems = cards + illustrations;
  const itemZ = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--itemZ")
  );
  const scenePerspective = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--scenePerspective"
    )
  );
  const cameraSpeed = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--cameraSpeed")
  );

  const height =
    window.innerHeight +
    scenePerspective * cameraSpeed +
    itemZ * cameraSpeed * numberOfItems;

  document.documentElement.style.setProperty("--viewportHeight", height);
}

function moveCameraAngle(event) { //Changes perspective: moves elements according to mouse coordinates
  const xGap = //Difference between center and mouseX in %
    (((event.clientX - window.innerWidth / 2) * 100) /
      (window.innerWidth / 2)) *
    -1;
  const yGap = //Difference between center and mouseY in %
    (((event.clientY - window.innerHeight / 2) * 100) /
      (window.innerHeight / 2)) *
    -1;
  const newPerspectiveOriginX =
    perspectiveOrigin.x + (xGap * perspectiveOrigin.maxGap) / 100;
  const newPerspectiveOriginY =
    perspectiveOrigin.y + (yGap * perspectiveOrigin.maxGap) / 100;

  document.documentElement.style.setProperty(
    "--scenePerspectiveOriginX",
    newPerspectiveOriginX
  );
  document.documentElement.style.setProperty(
    "--scenePerspectiveOriginY",
    newPerspectiveOriginY
  );
}

//Open and close iframe 1
// function iframeOpen() {
  var card = document.getElementsByClassName("card");
  var iframe = document.getElementById("iframe");
  var button = document.getElementById("buttonClose");
  var mainBody = document.getElementById("main-body");
  for (var i = 0 ; i < cards; i++) { //When card is clicked, show the iframe
    card[i].addEventListener("click", function(e){
      console.log(this)
      iframe.classList.toggle('hide');
      button.classList.toggle('hide');
      mainBody.classList.toggle('no-scroll');
    })
  }
// }
function buttonClose(){
  var d = window.parent.document;
  var iframe = d.getElementById('iframe');
  console.log("close")
  iframe.classList.toggle('hide');
  button.classList.toggle('hide');
  d.body.classList.toggle('no-scroll');
}
//Open and close iframe 2
// var footerLink = document.getElementsByClassName("footer-link");
// var iframe2 = document.getElementById("iframe2");
// var button = document.getElementById("buttonClose");
// var mainBody = document.getElementById("main-body");
// // if(inView("card-viewport")){
//   console.log("3d")
//   for (var i = 0 ; i < 20; i++) { //When card is clicked, show the iframe
//     footerLink[i].addEventListener("click", function(){
//       console.log("klik")
//       iframe2.classList.toggle('hide');
//       button.classList.toggle('hide');
//       mainBody.classList.toggle('no-scroll');
//     })
//   }
// }
// function buttonClose(){
//   var d = window.parent.document;
//   var iframe = d.getElementById('iframe');
//   iframe.classList.toggle('hide');
//   button.classList.toggle('hide');
//   d.body.classList.toggle('no-scroll');
// }

//Hero image: letters move with mouse    
function moveLetters(event) { //Changes perspective: moves elements according to mouse coordinates
  const xGap = //Difference between center and mouseX in %
    (((event.clientX - window.innerWidth / 2) * 100) /
      (window.innerWidth / 2)) * -1;
  const yGap = //Difference between center and mouseY in %
    (((event.clientY - window.innerHeight / 2) * 100) /
      (window.innerHeight / 2)) * -1;
  const newvalueX = (100 + xGap) /6
  const newvalueY = (100 + yGap) /10
  const newvalueX2 = (100 + xGap) /10
  const newvalueY2 = (100 + yGap) /20
  const newsize = 100 - yGap

  var clip1 = document.getElementById("clip-nahda")
  clip1.style.backgroundPosition=(newvalueX + "px " + newvalueY + "px")
  var clip2 = document.getElementById("clip-metsa")
  clip2.style.backgroundPosition=(newvalueX2 + "px " + newvalueY2 + "px")
  var clip3 = document.getElementById("clip-puilta")
  clip3.style.backgroundPosition=(newvalueX + "px " + newvalueY + "px")
}

//Changing bg colour
function changeBg() {
  var height = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--viewportHeight")
  );
  var bgScale = chroma.scale(['#ece0c6', '#c5ddf1'])
    .domain([height/4, height]);
  var mainBody = document.getElementById("main-body")
  mainBody.style.backgroundColor = bgScale(window.pageYOffset);
  
  // const currentScroll = window.pageYOffset;
  // if (currentScroll <= height+(height/8)) {
  //   opacity = 1;
  // } else {
  //   opacity = 0;
  // }
  // document.getElementById("bg-img").style.opacity = opacity;
}