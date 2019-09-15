var save = document.getElementById('save');
var reset = document.getElementById('reset');

var data = document.getElementById('data');
var date = document.getElementById('date');
var hour = document.getElementById('hour');
var nodes = document.getElementById('nodes');
var mone = 0;
var arr = [];
window.addEventListener('load', function () {
    arr = JSON.parse(window.localStorage.getItem("myBase"));
    let item;
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            item = arr[i];
            myBuild(item.data, item.date, item.hour);
        }
    }
    else {
        arr = [];
    }
});
reset.addEventListener('click', function () {
    data.value = "";
    date.value = "";
    hour.value = "";
});
save.addEventListener('click', function () {
    if (data.value == "" || date.value == "" || hour.value == "") {
        return alert("you did't fill in all the fields");
    }
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let gd = (date.value).split('/');
    for (let i = 0; i < 3; i++) {
        gd[i] = Number(gd[i]);
        if (!gd[i]) {
            return alert("you didn't write the right date");
        }
    }
    if (gd[0] < 0 || gd[1] < 0 || gd[2] < 0) {
        return alert("you didn't write the right date");
    }
    if (gd[0] > 31 || gd[1] > 12 || gd[2] < 2019) {
        return alert("you didn't write the right date");
    }
    myBuild(data.value, date.value, hour.value);
    let obj = new MyObj(data.value, date.value, hour.value, mone);
    mone++;
    arr.push(obj);
    window.localStorage.setItem("myBase", JSON.stringify(arr));
});
/////////////////constructor
function MyObj(data, date, hour, mone) {
    this.data = data;
    this.date = date;
    this.hour = hour;
    this.mone = mone;
}//////////////////functions
function myClose(p) {
    let inx = p.parentElement;
    arr = JSON.parse(window.localStorage.getItem("myBase"));
    let temp = arr.filter(function (ele) {
        return ele.mone != p.dataset.moneEl;
    });
    inx.removeChild(p);
    arr = temp;
    window.localStorage.setItem("myBase", JSON.stringify(arr));
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