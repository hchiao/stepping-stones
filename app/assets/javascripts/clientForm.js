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
    var count = 1;
    for( q in rulesObj ){
        newQuestion(org, "r" + count , rulesObj[q].condition);
        count++;
    }

};

function newQuestion(appendTo, liName, question){
    var li = liTag(liName);
    questionContext(li, question, liName);
    appendTo.appendChild(li);
};


function questionContext(appendTo, question, pastName){
    appendTo.appendChild(labelTag(question));
    appendTo.appendChild(radioTag(pastName, pastName + "t1"));
    appendTo.appendChild(labelTag("true"));
    appendTo.appendChild(radioTag(pastName, pastName + "f1"));
    appendTo.appendChild(labelTag("false"));
    appendTo.appendChild(ulTag(pastName + "u"));
};

function radioTag(pastName, value){
    var radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', pastName);
    radioInput.setAttribute('value', value);

    var nestedQuestion = 'newQuestion(' + pastName + 'u, "' + value + '", "' + getNestedQuestion(value) + '")'
    // stop when reached leaf
    radioInput.setAttribute('onclick', nestedQuestion);
    //radioInput.onclick = function() {nestedQuestion};  // for IE
    return radioInput;
};

function getNestedQuestion(value){
   //make ajax call!!!!!
    return ""+value+"";
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
