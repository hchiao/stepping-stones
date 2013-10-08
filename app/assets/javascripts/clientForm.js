var ID = "id";
var NAME = "name";
var UL = "ul";
var LI = "li";

// Need to get the id's right for all

function clientFormCreate(appendTo){ // signeture needs to change for recursion
    appendTo.appendChild(newQuestion("r1", "question1")); // dynamicly added according to rule object
};

function newQuestion(pastName, question){
    var li = liTag(pastName);
    questionSet(li, question, pastName);
    return li;
};

function questionSet(appendTo, question, pastName){
    appendTo.appendChild(labelTag(question));
    appendTo.appendChild(radioTag(pastName + "t1", "true", pastName + "u"));
    appendTo.appendChild(labelTag("true"));
    appendTo.appendChild(radioTag(pastName + "f1", "false", pastName + "u"));
    appendTo.appendChild(labelTag("false"));
    appendTo.appendChild(ulTag(pastName + "u"));
};

function radioTag(name, value, appendTo){
    var radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', name);
    radioInput.setAttribute('value', value);
    radioInput.setAttribute('onclick','clientFormCreate(' + appendTo + ')');
    //radioInput.onclick = function() {alert(value);};
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
