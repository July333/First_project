var save = document.getElementById('save');
var reset = document.getElementById('reset');

var data = document.getElementById('data');
var date = document.getElementById('date');
var hour = document.getElementById('hour');
var nodes = document.getElementById('nodes');
var mone = 0;
var arr = [];
window.addEventListener('load', function () {
    arr = window.localStorage.getItem('moneArr');
    let item;
    if (arr) {
        arr = arr.split(',');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != '-1') {
                item = JSON.parse(window.localStorage.getItem(arr[i]));
                myBuild(item.data, item.date, item.hour);
            }
        }
        mone = arr.length;
    }
    else{
        arr=[];
        window.localStorage.setItem('moneArr', arr);
    }
});
reset.addEventListener('click', function () {
    data.value = "";
    date.value = "";
    hour.value = "";
});
save.addEventListener('click', function () {
    if(data.value=="" || date.value=="" || hour.value==""){
        return alert("you did't fill in all the fields");
    }
    myBuild(data.value, date.value, hour.value);
    arr[mone] = mone;
    window.localStorage.setItem('moneArr', arr);
    console.log(nodes.childNodes[1]);
    let obj = new MyObj(data.value, date.value, hour.value);
    window.localStorage.setItem(mone, JSON.stringify(obj));
    mone++;
});
/////////////////constructor
function MyObj(data, date, hour) {
    this.data = data;
    this.date = date;
    this.hour = hour;
}//////////////////functions
function myClose(p) {
    let inx = p.parentElement;
    arr[p.dataset.moneEl] = '-1';
    window.localStorage.setItem('moneArr', arr);
    window.localStorage.removeItem(p.dataset.moneEl);
    inx.removeChild(p);
}
function myBuild(myData, myDate, myHour) {
    var myNode = document.createElement('div');
    myNode.className = 'note fade-in';
    myNode.dataset.moneEl = mone;
    nodes.appendChild(myNode);
    var closeBtn = document.createElement('button');
    closeBtn.className = 'close';
    closeBtn.addEventListener('click', function () { ////////////////listener
        console.log("I'm in");
        let a = this.parentElement;
        console.log(a);
        myClose(a);
    });
    closeBtn.setAttribute('aria-label', 'Close');
    myNode.appendChild(closeBtn);
    var sec = document.createElement('section');
    sec.className = 'scroll';
    sec.innerHTML = myData;
    myNode.appendChild(sec);
    var foot = document.createElement('footer');
    foot.className = 'page-footer text-left';
    foot.innerHTML = myDate + "</br>" + myHour;
    myNode.appendChild(foot);
}