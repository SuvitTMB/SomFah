
function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore().collection("CheckProfile");
  dbBootCamp = firebase.firestore().collection("BootCamp");
  dbBootRegister = firebase.firestore().collection("BootRegister");
  dbBootMember = firebase.firestore().collection("BootMember");
}


function GotoAboutUs() {
  location.href = "aboutus.html";
}


function GotoApp() {
  location.href = "oneretail.html";
}


function GotoRegister() {
  location.href = "allmember.html";
}

function GotoReward() {
  location.href = "rewards.html";
}


function Gotohome() {
  location.href = "somfah.html";
}


function GotoRoadshow() {
  clearTimeout(timerId);
  location.href = "bootcamp.html";
}

function imgErrorID(image,id) {
    image.onerror = "";
    image.src = "./flax/box.jpg";
    OpenProfile(id);
    return true;
}

function imgError(image) {
    image.onerror = "";
    image.src = "./flax/box.jpg";
    OpenProfile(id);
    return true;
}