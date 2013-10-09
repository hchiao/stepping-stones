var ID = "id";
var NAME = "name";
var UL = "ul";
var LI = "li";

// Need to get the id's right for all

function newQuestion(appendTo, liName, question){ // signeture needs to change for recursion
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
    radioInput.setAttribute('onclick','newQuestion(' + pastName + 'u, "' + value + '", "nestedQ2" )');
    //radioInput.onclick = function() {alert(value);};  // for IE
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
