

$(document).ready(function () {
  //console.log(sessionStorage.getItem("CampRound"));
  Connect_DB();
  GetAllRewards();
});



function GetAllRewards() {
  console.log("ShowRegister===="+sessionStorage.getItem("CampRound"));
  var str = "";
  var sCountID = 0;
  str += '<table style="width:96%; margin:auto;"><thead><tr><th>ชื่อ-นามสกุล</th><th>สาขา</th></tr></thead><tbody>';
  dbBootRegister.where('CampRound','==',sessionStorage.getItem("CampRound"))
  .where('StatusRegister','==',1)
  //.where('TimegetBox','!=', null)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      if(doc.data().TimegetBox!="") {
        //console.log(doc.data().EmpName);
        //str += '<div>'+ doc.data().LineName +'" class="img-register"></div>';
        sCountID = sCountID+1;
        //str += '<div>'& doc.data().EmpName &'</div>';

        //str += '<tr><td data-column="ชื่อ-นามสกุล">'+ doc.data().EmpName +'</td>';
        str += '<td data-column="ลำดับ '+sCountID+'">';
        str += '<div style="width:25%; float: left;"><img src="'+ doc.data().LinePicture +'" class="img-register"></div><div style="width:70%;"><b>'+ doc.data().EmpName +'</b><br>'+ doc.data().LineName +'</div>';
        str += '</td></tr>';
      }

//        str += '<div style="width:20%; float: left;"><img src="'+ doc.data().LinePicture +'" class="img-register"></div><div style="width:80%; float: left;">'+ doc.data().LineName +'<br><b>'+ doc.data().EmpName +'</b></div>';
      //str += '<div class="box-member" style="width:61px;height:80px;overflow:hidden;float: left;" onclick="OpenRegister(\''+ doc.id +'\')">';
      //str += '<div><img src="'+ doc.data().LinePicture +'" class="img-register"></div>';
      //str += '<div class="clr txt-member" style="font-size:11px;line-height:1.2; color:#fff; padding-top:4px;">'+ doc.data().LineName +'</div></div>';
    });
    str += '</tbody></table>';
    $("#AllRewardsF").html(str);    
  });
}

/*
function OpenRegister(x) {
  var str = "";
  dbBootRegister.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div style="margin-top:20px;"><img src=\''+ doc.data().LinePicture +'\' class="img-member-true" style="width:120px;height:120px;border-radius:50%;box-shadow: 0px 0px 6px 5px rgba(178,178,178,0.17);">';
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
}
*/