var GroupCamp = 8;
var timerId = "";
var stxtEmpID = "";
var stxtEmpName = "";
var stxtEmpPhone = "";
var stxtEmpGroup = "";
var db = "";
var dbBootCamp = "";
var dbBootMember = "";
var CheckFoundData = 0;
var Eid = "";
var EidBootCamp = ""; 
var EidBootRegister = ""; 
var EidBootMember = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var sDateRegister = "";
var i = 0;
const x = document.querySelectorAll(`div.com[min="${i}"]`);
var sCheckOpen = "";
var sCampRound = "";
var sDateTime = ""; 
var sLINERegister = "";
var sATK = "";
var xRound = "";
var parts = [];
var parts1 = [];
parts = xRound.split("-"); //สร้างString arry ชื่อparts
var FinalRound = parts[0]; // 004  //String part1 เก็บค่าparts[0]
var FinalRoundSplit = parts[1]; // 004  //String part1 เก็บค่าparts[0]
var xEmpSize = "";
var eSpace = "";
var xEmpGroup = "";
var sCheckBottom = 0;
var xReDirectData = 0;
var sTeam = "";
var sTrainingDays = "";
var xText = "คุณได้ทำการลงทะเบียน<br>ส้มฟ้าพาลุย LIVE แล้ว";

$(document).ready(function () {
/*
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile1").html(str);  
  $("#MyProfile").html(str);  
  Connect_DB();
  CheckEmpID();
  CheckBootCampOpen();
*/
  main()
});



async function main() {
  await liff.init({ liffId: "1657509542-rvxRyQ5X" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  //str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  $("#MyProfile1").html(str);  
  Connect_DB();
  CheckEmpID();
  CheckBootCampOpen();
}


var xCheckUser = 0;
function CheckEmpID() {
  db.where('lineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckUser = doc.data().empID;
      sessionStorage.setItem("EmpID", doc.data().empID);
    });
  });
}


function CheckBootCampOpen() {
  var str = "";
  dbBootCamp.where('CampStatus','==',GroupCamp)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootCamp = doc.id;
      xRound = doc.data().EmpType;
      sEmpType = doc.data().EmpType;
      sCheckOpen = doc.data().CampName;
      sCampRound = doc.data().CampRound;
      simg_reg = doc.data().img_reg;
      sTrainingDays = doc.data().TrainingDays;
      sessionStorage.setItem("CampRound", doc.data().CampRound);
      sessionStorage.setItem("CampTeam", doc.data().EmpGroup);
      sessionStorage.setItem("CampName", doc.data().CampName);
      $("#OpenNameCamp").html(sCheckOpen+"<br>"+sTrainingDays);    
      $("#DisplayRound").html(sCheckOpen+"<br>"+sTrainingDays);    
    });
    if(xRound!="") { 
      CheckData();
      CheckRegister();
    } else {
      RegisterClose();
    }
  });
}


var xCheckRegister = 0; 
function CheckRegister() {
  var str = "";
  dbBootRegister.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('CampRound','==',xRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckRegister = 1;
      EidBootRegister = doc.id;
      sDateTime = doc.data().DateTime;
      sessionStorage.setItem("EmpID", doc.data().EmpID);
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("CheckPass", doc.data().DateTime);
      sessionStorage.setItem("EmpGroup", doc.data().EmpRH);
      sessionStorage.setItem("EmpMember", doc.data().EmpMember);
      sessionStorage.setItem("PreRegister", doc.data().PreRegister);
      sessionStorage.setItem("DateTime", doc.data().DateTime);
      document.getElementById('OpenBootCamp').style.display='none';
      document.getElementById('myRegister').style.display='none';
      document.getElementById('myTimer').style.display='block';
      document.getElementById('OpenBar').style.display='block';
    });
    if(EidBootRegister=="") {
      CheckMember();
      document.getElementById('loading').style.display='none';
      document.getElementById('gotoLink').style.display='block';
      document.getElementById('OpenRegister').style.display='block';
    } else {
      if(sessionStorage.getItem("LineID")!=null) {
        if(sessionStorage.getItem("DateTime")=="") {
          SaveUpdate();
        }
      }
      CheckMember();
    }
  });
}

function CheckMember() {
  NewDate();
  dbBootMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .where('EmpType','==',sCampRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootMember = doc.id;
      xEmpType = doc.data().EmpType;
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("EmpTable", doc.data().EmpTable);
      sessionStorage.setItem("TimeRegister", doc.data().TimeRegister);
      sessionStorage.setItem("EmpMember", 1);
      sessionStorage.setItem("EmpSize", doc.data().EmpSize);
      sTeam = doc.data().EmpGroup;
    });
  });
  if(xReDirectData==1) {
    document.getElementById('loading').style.display='block';
    timerId = setInterval(GotoRoadshow, 4000); 
  }
}


function SaveUpdate() {
  NewDate();
  var eEmpGroup = "other";
  var TimeStampDate = Math.round(Date.now() / 1000);
  sDateTime = dateString;
  sessionStorage.setItem("CheckPass", sDateTime);
  dbBootRegister.doc(EidBootRegister).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    StatusRegister : 1,
    TimeStamp : TimeStampDate,
    TimegetBox : eSpace,
    DateTime : dateString
  });
  //console.lg("save="+sessionStorage.getItem("LinePicture"));
}


function WaitingPage() {
  //console.log("Line 268 = "+xReDirectData);
  document.getElementById('OpenRegister').style.display='none';
  document.getElementById('loading').style.display='none';
  document.getElementById('myDisplayLine').style.display='none';
  document.getElementById('myRegister').style.display='none';
  if(xCheckRegister==1) {
    document.getElementById('OpenRegister').style.display='none';
    document.getElementById('BootCampLoading').style.display='none';
  }
  var str = "";
  var xEmpType = "";
  if(sDateTime=="") {
    NewDate();
    sDateTime = dateString;
  }
  dbBootMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .where('EmpType','==',sCampRound)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidBootMember = doc.id;
      xEmpType = doc.data().EmpType;
      sessionStorage.setItem("EmpName", doc.data().EmpName);
      sessionStorage.setItem("EmpMember", 1);
      xEmpGroup = doc.data().EmpGroup;
      xEmpSize = doc.data().EmpSize;
    });
    str +='<div style="color:#fff;font-weight: 600; margin-bottom:10px;">คุณ'+sessionStorage.getItem("EmpName")+'</div>';
    if(xEmpGroup!="" && xEmpSize!="") { 
      str +='<div class="profile-txt1" style="color:#ccc; font-size:12px; margin-top:12px;">ทีมของคุณ</div>';
      //str += '<div style="font-size:15px; font-weight:600; color:#fff; background:#0056ff; margin:2px 20% 6px 20%; padding-top:8px; padding-bottom:10px; border-radius:8px;">'+xEmpGroup+' --> '+xEmpSize+'</div>';
      str +='<center><div style="width:220px; margin:auto;">';
      str += '<div style="margin-top:5px;"><img src="./flax/'+xEmpGroup+'.jpg" style="width:130px; border-radius: 10px;"></div>';
      //str += '<div style="float: left; font-size:15px; font-weight:600; width:100px; color:#fff; background:#0056ff; margin:2px 6px; 6px auto; padding-top:8px; padding-bottom:10px; border-radius:8px;">'+xEmpGroup+'</div>';
      str += '<div style="font-size:14px; font-weight:600; color:#fff; margin:5px auto; 6px auto; padding-top:8px; padding-bottom:10px; color:#ffff00;">'+xEmpSize+'</div>';
      str += '</div></center><div class="clr"></div>';
    } else if(xEmpGroup=="" && xEmpSize!="") { 
      str +='<div class="profile-txt1" style="color:#ccc; font-size:12px; margin-top:12px;">ทีมของคุณ</div>';
      str += '<div style="margin-top:5px;"><img src="./flax/'+xEmpGroup+'.jpg" style="width:130px; border-radius: 10px;"></div>';
      str += '<div style="font-size:15px; font-weight:600; color:#fff; background:#05b322; margin:5px 30% 6px 30%; padding-top:8px; padding-bottom:10px; border-radius:8px;">'+xEmpSize+'</div>';
    } else {
      str += '<div style="font-size:15px; font-weight:600; color:#fff; background:#002d63; margin:12px 20% 6px 20%; padding-top:8px; padding-bottom:10px; border-radius:8px;">'+ xText +'</div>';
    }
    if(sDateTime!="") {
      str +='<div class="btn-a1" onclick="GotoRegister()" style="margin-top:20px;">คลิกดูผู้ลงทะเบียน</div><div class="clr" style="height:5px;"></div>';
      str +='<div style="color:#f1f1f1;font-size:11px;font-weight: 400; margin-top:5px;">ลงทะเบียนเมื่อ : '+ sDateTime +'</div>';
    }
    //str +='<div class="btn-t1" onclick="GotoApp()" style="margin-top:25px; margin-right: 3px;">ONE Retail Society</div>';
    //str +='<div class="btn-t1" onclick="GotoDetail()" style="margin-top:25px;">กำหนดการกิจกรรม</div><div class="clr" style="height:5px;"></div>';
    //str += '<div class="clr"></div>';
    //str +='<div class="btn-t1" onclick="ShowRegister()" style="margin-top:10px;width:230px;font-size:11px;">ดูข้อมูลผู้ลงทะเบียน</div>';
    document.getElementById('loading').style.display='none';
    $("#MyWating").html(str);    
  });
}


function CheckData() {
  document.getElementById('BootCampLoading').style.display='none';
  db.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      sDateRegister = doc.data().DateRegister;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      sessionStorage.setItem("EmpPhone", doc.data().empPhone);
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById("txtEmpName").value = doc.data().empName;
      document.getElementById("txtEmpGroup").value = doc.data().empRH;
      WaitingPage();
    });
    if(document.getElementById("txtEmpID").value!="") {
      $("#test *").attr("disabled", "disabled").off('click');
      $('#txtEmpGroup').prop('disabled', false);
      $('#a1').prop('disabled', false);
      $('#a2').prop('disabled', false);
      $('#a3').prop('disabled', false);
    }
  });
}


function KeyRegister() {
    document.getElementById('OpenRegister').style.display='none';
    document.getElementById('DisplayLogo').style.display='none';
    document.getElementById('loading').style.display='none';
    document.getElementById('myRegister').style.display='block';
    OpenForm();
}


function OpenForm() {
  if(CheckFoundData==1) {
    document.getElementById('OpenBootCamp').style.display='none';
    document.getElementById('myRegister').style.display='none';
    document.getElementById('myTimer').style.display='block';
    document.getElementById('myDisplayLine').style.display='none';
  } else {
    document.getElementById('OpenBootCamp').style.display='none';
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
    document.getElementById('myDisplayLine').style.display='none';
  }
}


function ClickSaveProfile() {
  sCheckBottom = 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpGroup = document.getElementById("txtEmpGroup").value;
  stxtATK = "Negative";
  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpGroup !== null && stxtEmpGroup !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtATK !== null && stxtATK !== '') { sCheckBottom = sCheckBottom+1; }
  if(sCheckBottom==4) {
    sATK = "Negative";
    sessionStorage.setItem("EmpID", document.getElementById("txtEmpID").value);
    sessionStorage.setItem("EmpGroup", document.getElementById("txtEmpGroup").value);
    document.getElementById('loading').style.display='block';
    CheckMember();
    SaveData();
  } else {
    alert("คุณยังกรอกข้อมูลไม่ครบถ้วน");
  }
}


function SaveData() {
  document.getElementById('loading').style.display='block';
  var eEmpGroup = "other";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  sDateTime = dateString;
  sessionStorage.setItem("CheckPass", sDateTime);
  if(document.getElementById("txtEmpGroup").value!="OTHER") {
    eEmpGroup = "BBD";
  } 
  if(Eid=="") {
    db.add({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empBr : eEmpGroup,
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      memo : eSpace,
      empAddress : eSpace,
      DateRegister : dateString
    });
    xReDirectData = 1;
  } else {
    db.doc(Eid).update({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empBr : eEmpGroup,
      DateRegister : dateString
    });
  }
  if(EidBootRegister=="") {
    if(sessionStorage.getItem("EmpMember")==null) {
      sessionStorage.setItem("EmpMember", 0);
    }
    dbBootRegister.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : document.getElementById("txtEmpID").value,
      EmpName : document.getElementById("txtEmpName").value,
      EmpRH : document.getElementById("txtEmpGroup").value,
      ATK : "Negative",
      EmpMember : parseInt(sessionStorage.getItem("EmpMember")),
      PreRegister : 0,
      EmpTable : parseInt(sessionStorage.getItem("EmpTable")),
      EmpSize : sessionStorage.getItem("EmpSize"),
      PreDateTime : eSpace,
      StatusRegister : 1,
      TimegetBox : eSpace,
      CampRound : sCampRound,
      EmpType : sEmpType,
      TimeStamp : TimeStampDate,
      DateTime : dateString
    });
  }
 
  if(EidBootMember!="") {
    dbBootMember.doc(EidBootMember).update({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      StatusRegister : 1,
      TimeIN : dateString,
      TimeStampRec : TimeStampDate
    });
  }
  CheckRegister();
  document.getElementById('loading').style.display='none';
  document.getElementById('myRegister').style.display='none';
  document.getElementById('DisplayLogo').style.display='block';
  document.getElementById('OpenBar').style.display='block';
}

function RegisterClose() {
  document.getElementById('loading').style.display='none';
  document.getElementById('BootCampLoading').style.display='none';
  document.getElementById('BootCampClose').style.display='block';
}


function OpenRegister(x) {
  var str = "";
  dbBootRegister.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div style="margin-top:0px;"><img src=\''+ doc.data().LinePicture +'\' class="img-member-true" style="width:120px;height:120px;border-radius:50%;box-shadow: 0px 0px 6px 5px rgba(178,178,178,0.17);">';
      str += '<div class="txt-member1" style="padding-top: 6px;color:#f68b1f">'+doc.data().LineName+'</div>';
      str += '<div style="margin-top:20px;font-size:13px;font-weight: 600;color:#0056ff;">คุณ'+doc.data().EmpName+'</div>';
      str += '<div style="color:#002d63;">ลงทะเบียนกิจกรรม<br>'+sessionStorage.getItem("CampName")+'</div>';
      str += '<div style="color:#999;font-size:11px;">ลงทะเบียนเมื่อ '+doc.data().DateTime+'</div>';
    });
    $("#DisplayUser").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function ShowRegister() {
  var str = "";
  var sCountID = 0;
  str +='<div style="font-size: 14px; color:#fff;">ttb Registration System<br><b>'+sessionStorage.getItem("CampName")+'</b></div>';
  str +='<div id="DisplayCountRegister" style="margin: 10px auto; font-size: 13px; color: #ffff00;"></div>';
  dbBootRegister.where('CampRound','==',xRound)
  .where('StatusRegister','==',1)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      console.log(doc.data().EmpName);
      sCountID = sCountID+1;
      str += '<div class="box-member" style="width:61px;height:80px;overflow:hidden;float: left;" onclick="OpenRegister(\''+ doc.id +'\')">';
      str += '<div><img src="'+ doc.data().LinePicture +'" class="img-register"></div>';
      str += '<div class="clr txt-member" style="font-size:11px;line-height:1.2; color:#fff; padding-top:4px;">'+ doc.data().LineName +'</div></div>';
      console.log(str);
    });
    str += '<div class="clr"></div>';
    str +='<div class="btn-t1" onclick="GotoApp()" style="margin-top:25px; margin-right: 3px;">ONE Retail Society</div>';
    str += '<div class="clr"></div>';
    str +='<div class="btn-t1" onclick="GotoRegister()" style="margin-top:10px;width:230px;font-size:11px;">ดูข้อมูลผู้ลงทะเบียน</div>';
    $("#MyWating").html(str);    
    $("#DisplayCountRegister").html("<div>จำนวนลงทะเบียน : "+sCountID+" คน</div>");
  });
}
