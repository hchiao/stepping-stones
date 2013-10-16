var ID = "id";
var NAME = "name";
var UL = "ul";
var LI = "li";

function getRules(){
    var request = new XMLHttpRequest;
    request.open("GET", "?format=json", true);
    request.onreadystatechange = function() {
        if(request.readyState == request.DONE){
            buildForm(JSON.parse(request.responseText));
        }
    };
    request.send(null);
};

function buildForm(rulesObj){
    for( q in rulesObj ){
        newQuestion(org, "r" + (parseInt(q)+1), rulesObj);
    }
};

function newQuestion(appendTo, pastName, rulesObj){
    var li = liTag(pastName);
    var condition = findValue(pastName+"c", rulesObj);
    if (condition == undefined) {
        var answer = findValue(pastName + "a", rulesObj);
        //alert(answer);
        appendTo.appendChild(hiddenAnswer(pastName,answer));
    }
    else{
        nestedQuestion(li,condition,pastName,rulesObj);
        appendTo.appendChild(li);
    }
};

function hiddenAnswer(path, answer){
    var ruleNumber = path.match(/(?![r])[1-9]+/);
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "rule"+ruleNumber);
    input.setAttribute("value", answer);
    return input;
};

function nestedQuestion(appendTo,condition, pastName,rulesObj){
    var level = getLevel(pastName);
    var true_value = pastName + "t" + (parseInt(level) + 1);
    var false_value = pastName + "f" + (parseInt(level) + 1);
    appendTo.appendChild(labelTag(condition));
    appendTo.appendChild(radioTag(pastName, true_value, rulesObj));
    appendTo.appendChild(labelTag("true"));
    appendTo.appendChild(radioTag(pastName, false_value, rulesObj));
    appendTo.appendChild(labelTag("false"));
    appendTo.appendChild(ulTag(pastName + "u"));
};


function findValue(path, rulesObj){
    var array = path.match(/([rtfca][1-9]*)/g);
    var ruleNum = array.shift();
    var num = ruleNum.match(/[1-9]+/);
    var index = parseInt(num)-1;
    var ruleObj = rulesObj[index];
    var noNumberArray = stripNumbers(array);
    var string = searchValue(ruleObj, noNumberArray);
    return string;
};


function searchValue(rule, array){
    var action = array.shift();
    if(array.length == 1 && array[0] == "a"){
        return (action == "t") ? rule.true_path : rule.false_path;
    }
    if(action == "t"){
        return searchValue(rule.true_path, array);
    }
    else if(action == "f"){
        return searchValue(rule.false_path, array);
    }
    else if(action == "c"){
        return rule.condition;
    }
    else{
        throw {
            name: 'NoCondition',
            message: "Can't find condition with this path"
        }
    }
};


function stripNumbers(array){
    var noNumberArray = [];
    for(i in array){
       noNumberArray.push(array[i].match(/[tfca]/));
    }
    return noNumberArray;
};

function getLevel(path){
    var r = /^[r][1-9]+$/;
    var start = r.test(path);
    if(start){
        return 0;
    }
    else{
        var regex = /[1-9]+$/;
        var level = regex.exec(path);
        return level[0];
    }
};


function radioTag(pastName, value, rulesObj){
    var radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', pastName);
    radioInput.setAttribute('value', value);

    radioInput.onclick = (function() {
                              return function(){
                                  var ul = document.getElementById(pastName+"u");
                                  newQuestion(ul, value, rulesObj);
                              }
                         })();
    return radioInput;
};

function labelTag(name){
    var label = document.createElement("label");
    label.innerHTML = name;
    return label;
};

function ulTag(pastName){
    var ul = document.createElement(UL);
    ul.setAttribute(ID, pastName);
    ul.setAttribute(NAME, pastName);
    return ul;
};

function liTag(pastName){
    var li = document.createElement(LI);
    li.setAttribute(ID, pastName);
    li.setAttribute(NAME, pastName);
    return li;
};
