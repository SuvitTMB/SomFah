var xClickMenu = "";
var aClickMenu = "";


$(document).ready(function () {
  aClickMenu = getParameterByName('gid');
  if(aClickMenu==null) { aClickMenu = "England"; } else { aClickMenu = aClickMenu; }
  Connect_DB();
  SelectMeunu();
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function SelectMeunu() {
  if(aClickMenu!="") {
    console.log("1="+aClickMenu);
    xClickMenu = aClickMenu;
    document.getElementById("ClickMenu").value = aClickMenu;
  } else {
    xClickMenu = document.getElementById("ClickMenu").value;
  }
  $("#DisplayFlax").html('<div style="margin-top:5px;"><img src="./flax/'+xClickMenu+'.jpg" style="width:150px; border-radius: 10px; border: 1px #ccc solid"></div>');  
  aClickMenu = "";
  loadData();
}


function loadData() {
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:10px auto 20px auto;"><tbody>';
  dbBootMember.where('CampRound','==', sessionStorage.getItem("CampRound"))
  .where('EmpGroup','==', xClickMenu)
  .orderBy('EmpPosition','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().LinePicture!="") {
        str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile" style="background:#d2e6f5;">';
        str += '<td class="td-center td-padding" style="width:12%;text-align:center; background:#d2e6f5;"><img src="'+doc.data().LinePicture+'" class="profile-team" onerror="javascript:imgErrorID(this,\''+ doc.id +'\')">';
        str += '</td>';
      } else {
        str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile" style="filter: grayscale(100%);">';
        if(doc.data().EmpSex=="M") {
          str += '<td class="td-center td-padding" style="width:12%;text-align:center;"><img src="./flax/m.png" class="profile-team">';
          str += '</td>';
        } else {
          str += '<td class="td-center td-padding" style="width:12%;text-align:center;"><img src="./flax/f.png" class="profile-team">';
          str += '</td>';
        }
      }
      str += '<td class="td-padding" style="width:88%;"><font color="#0056ff"><b>'+doc.data().EmpName+'</b></font>';
      str += '<font color="#f68b1f"> ('+doc.data().ShortName+')</font><br>'+doc.data().EmpBranch+'<br>'+doc.data().EmpPosition+'<br>'+doc.data().EmpZone+'<br><b>'+doc.data().EmpRH+'</b></td>';
      //str += '<font color="#f68b1f"> ('+doc.data().ShortName+')</font><br>'+doc.data().EmpRH+'<br><b>'+doc.data().EmpBU+'</b></td>';
      //str += '<td class="td-right" style="width:24%;text-align: center;"><div class="btn-t1" style="margin-top:0px;">View</div></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    str += '<div class="text-3">คลิกที่ชื่อเพื่อดูรายละเอียดเพิ่มเติม</div>';
    $("#DisplayRSOCTeam").html(str);  
    $("#DisplayRSOCSum").html("จำนวนสมาชิก "+ i +" คน");  
    //alert(i);
  });

}


function OpenProfile(uid) {
  var str = "";
  dbBootMember.where(firebase.firestore.FieldPath.documentId(), "==", uid)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      if(doc.data().LinePicture!="") { 
        str += '<center><div><img src="'+doc.data().LinePicture+'" class="add-profile" style="margin:10px auto 20px auto;"></div>';
        //str += '<div class="NameLine">'+doc.data().LineName+'</div></center>';
      } else {
        if(doc.data().EmpSex=="M") {
          str += '<div style="text-align:center;"><img src="./flax/m.png" class="add-profile"></div>';
        } else {
          str += '<div style="text-align:center;"><img src="./flax/f.png" class="add-profile"></div>';
        }
      }
      if(doc.data().LoadImg!="") {
        str += '<center><div class="btn-t33" style="margin-top:6px;background:#69b8f1;border: solid #fff 1px">'+doc.data().ShortName+'</div></center>';
      }
      str += '<center><div class="text-1" style="font-size:14px; font-weight: 600;">'+doc.data().EmpName+'</div>';
      str += '<div class="text-2">'+doc.data().EmpBranch+'<br>'+doc.data().EmpPosition+'<br>'+doc.data().EmpZone+'<br>'+doc.data().EmpRH+'</div></center>';
      //str += '<div class="text-2">'+doc.data().EmpZone+'<br>'+doc.data().EmpPosition+'<br>'+doc.data().EmpRH+'</div>';
      if(doc.data().LoadImg!="") {
        str += '<div style="margin-top:13px;text-align:center; color:#0056ff;">'+doc.data().EmpSize+'<br><br><img src="./flax/'+doc.data().EmpGroup+'.jpg" style="width:180px; border-radius: 10px;"></div>';
      }
    });
    $("#DisplayProfile").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}
