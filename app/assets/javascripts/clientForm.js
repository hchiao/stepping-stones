var ID = "id";
var NAME = "name";
var UL = "ul";
var LI = "li";


function getRules(){
    var request = new XMLHttpRequest;
    request.onreadystatechange = function() {
        if(request.readyState == 4){
            var rulesObj =  JSON.parse(request.responseText);
            buildForm(rulesObj);
        }
    };

    request.open("GET", "?format=json", true);
    request.send(null);
};

function buildForm(rulesObj){
    var ruleCount = 1;
    for( q in rulesObj ){
        newQuestion(org, "r" + ruleCount, rulesObj);
        ruleCount++;
    }

};

function newQuestion(appendTo, liName, rulesObj){
    var li = liTag(liName);
    questionContext(li, liName, rulesObj);
    appendTo.appendChild(li);
};


function questionContext(appendTo, pastName, rulesObj){
    //alert(pastName);
    var level = getLevel(pastName);
    var true_value = pastName + "t" + (parseInt(level) + 1);
    var false_value = pastName + "f" + (parseInt(level) + 1);
    //alert(value);

    appendTo.appendChild(labelTag(findCondition(pastName+"c", rulesObj)));
    appendTo.appendChild(radioTag(pastName, true_value, rulesObj));
    appendTo.appendChild(labelTag("true"));
    appendTo.appendChild(radioTag(pastName, false_value, rulesObj));
    appendTo.appendChild(labelTag("false"));
    appendTo.appendChild(ulTag(pastName + "u"));
};


function findCondition(path, rulesObj){
    //alert("path: "+path+"\nrulesObj: "+rulesObj);

    var array = path.match(/([rtfc][1-9]*)/g);
    var ruleNum = array.shift();
    var num = ruleNum.match(/[1-9]+/);
    var index = parseInt(num)-1;
    var ruleObj = rulesObj[index];

    var noNumberArray = stripNumbers(array);

    var string = searchCondition(ruleObj, noNumberArray);
    //alert("returns: "+string);

    return string;
};


function searchCondition(rule, array){
    //alert("ruleObj IN: " + target);
    var action = array.shift();
    //alert("action: "+action+"\narray: "+array);

    if(action == "t"){
        //alert("rule.true_path: "+rule.true_path);
        return searchCondition(rule.true_path, array);
    }
    else if(action == "f"){
        //alert("rule.false_path: "+rule.false_path);
        return searchCondition(rule.false_path, array);

    }
    else if(action == "c"){
        //alert("rule.condition: "+rule.condition);
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
       noNumberArray.push(array[i].match(/[tfc]/));
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
