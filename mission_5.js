var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() +1;

// 初期表示
window.onload = function () {
    showProcess(date);
    cutEmpty();
};

// 前月に戻る
function prev(){
    month = month - 1;
    if (month < 1){
        month = 12;
        year = year - 1;
    }
    showProcess();
    cutEmpty();
}

// 来月に進む
function next(){
    month = month + 1;
    if (month > 12){
        month = 1;
        year = year + 1;
    }
    showProcess();
    cutEmpty();
}

function showProcess(){
    // h1に年を表示
    var object1 = document.getElementById('year');
    object1.innerText = year + '年';

    // h2に月を表示
    var object2 = document.getElementById('month');
    object2.innerText = month + '月';

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
    createHtml = '<table id="table" class="fadeIn">' + '<tr>';

    var weeks = ['日', '月', '火', '水', '木', '金', '土'];
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
                createHtml += '<td class="empty"></td>';  
               
            }else{
                // 今日を表示
                if (year == date.getFullYear() && month == date.getMonth() + 1 && dayCount == date.getDate()){
                    createHtml += '<td id="today" onclick="note()">' + dayCount + '</td>';
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

    document.querySelector('#calendar').innerHTML = createHtml;
}

function cutEmpty() {
    var table = document.getElementById('table');
    var cutCell = table.rows[6].cells[0];
    var cutRow = table.rows[6];
    if (cutCell.classList.contains('empty')){
        cutRow.classList.add('none');
    }
}

function note(){
    var aside = document.getElementById('aside');
    var mask = document.getElementById('mask');
    aside.classList.toggle('noteActive');
    mask.classList.toggle('noteActive');
}

function saveNote(){
    var saveBtn = document.getElementById('saveBtn');
    var t = document.getElementById('textarea').value;
    window.localStorage.setItem('key', t);
    alert('保存しました。');
}

function viewNote(){
    var text = window.localStorage.getItem('key');
    if (text == null) text = 'データがありません';
    if (text == '') text = '予定が入力されていません';
    document.getElementById('textarea').value = text;
}
