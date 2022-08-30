"use strict"

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() +1;

// 初期表示
window.onload = function () {
    showProcess(date);
};

// 前月に戻る
function prev(){
    month = month - 1;
    if (month < 1){
        month = 12;
        year = year - 1;
    }
    showProcess();
}

// 来月に進む
function next(){
    month = month + 1;
    if (month > 12){
        month = 1;
        year = year + 1;
    }
    showProcess();
}

function showProcess(){
    // h1に年を表示
    var object1 = document.getElementById("year");
    object1.innerText = year + "年";

    // h2に月を表示
    var object2 = document.getElementById("month");
    object2.innerText = month + "月";

    // 月初を取得
    var firstDate = new Date(year, month - 1, 1);
    var firstDay = firstDate.getDay();

    // 月末を取得
    var lastDate = new Date(year, month, 0);
    var lastDayCount = lastDate.getDate();

    // 変数を指定
    let dayCount = 1;
    let createHtml = '';

    // #calendarのdivタグにカレンダーを出力
    createHtml = '<table>' + '<tr>';

    var weeks = ["日", "月", "火", "水", "木", "金", "土"];
    for (var i = 0; i < weeks.length; i++){
        createHtml += '<td>' + weeks[i] + '</td>';   
    }
    createHtml += '</tr>';

    for (var n = 0; n < 6; n++){
        createHtml += '<tr>';
        for (var d = 0; d < 7; d++){

            // dayCountが月初の数字を下回った場合は<td>を空にして出力
            if (n == 0 && d < firstDay){
                createHtml += '<td></td>';

            // dayCountが月末の数字を超えた場合は<td>を空にして出力
            }else if (dayCount > lastDayCount){
                createHtml += '<td></td>';  
               
            }else{
                // 今日を表示
                if (year == date.getFullYear() && month == date.getMonth() + 1 && dayCount == date.getDate()){
                    createHtml += '<td class="date" onclick="addNote()">' + dayCount + '</td>';
                    dayCount++ ;

                // それ以外はdayCountを<td>の中に入れて出力。最後にdayCountに1を足す。
                }else{
                createHtml += '<td>' + dayCount + '</td>';
                dayCount++ ; 
                }               
            }                      
        }    
        createHtml += '</tr>';
    }
    createHtml += '</table>';

    document.querySelector("#calendar").innerHTML = createHtml;
}

function addNote(){
    let createHtml = '';
    createHtml += '<textarea id="textarea" placeholder="ここに予定を書き込む"></textarea>';
    createHtml += '<div class="noteBtn">' + '<button id="delateBtn" onclick="delateNote()">×</button>';
    createHtml += '<button id="saveBtn" onclick="saveNote()">保存</button>';
    createHtml += '<button id="viewBtn" onclick="viewNote()">読込</button>' + '</div>';
    document. querySelector("#note").innerHTML = createHtml;
}

function delateNote(){
    var textarea = document.getElementById("textarea");
    textarea.classList.toggle("delate");
    var delateBtn = document.getElementById("delateBtn");
    delateBtn.classList.toggle("delate");
    var saveBtn = document.getElementById("saveBtn");
    saveBtn.classList.toggle("delate");
    var viewBtn = document.getElementById("viewBtn");
    viewBtn.classList.toggle("delate");
}

function saveNote(){
    var saveBtn = document.getElementById("saveBtn");
    var t = document.getElementById("textarea").value;
    window.localStorage.setItem("key", t);
    alert("保存しました。");
}

function viewNote(){
    var text = window.localStorage.getItem("key");
    if (text == null) text = "データがありません";
  if (text == "") text = "予定が入力されていません";
  document.getElementById("textarea").value = text;
}


