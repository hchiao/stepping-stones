var INPUT = "input";
var SELECT = "select";
var OPTION = "option";
var LI = "li";
var UL = "ul";
var TYPE = "type";
var VALUE = "value";
var CLASS = "class";
var ID = "id";
var NAME = "name";
var TEXT = "text";
var BR = "br";
var CONDITION = "c";
var CONDITION_VALUE = "When this happens.....";
var SELECT_TRUE = "t";
var SELECT_FALSE = "f";

var ruleCount = 1;
function initRule(appendTo) {
    var ruleStart = "r" + ruleCount;
    addRule(appendTo, 1, ruleStart);
    ruleCount++;
};

function addRule(appendTo, count, pastName) {
    appendTo.appendChild(createRuleLi(count, pastName));
};

function createRuleLi(count, pastName) {
    var li = document.createElement(LI);
    li.setAttribute(ID, pastName);
    li.setAttribute(NAME, pastName);

    li.setAttribute(CLASS, currentLevel(pastName));
    var elements = []

    //elements.push(createLabel("Condition: "));
    elements.push(createText(pastName + CONDITION + count, CONDITION_VALUE));
    elements.push(document.createElement(BR));
    elements.push(createLabel("If true:"));
    elements.push(createSelect(pastName + SELECT_TRUE + count, count));
    elements.push(document.createElement(BR));
    elements.push(createUl(pastName + SELECT_TRUE + count + UL));
    elements.push(createLabel("If false:"));
    elements.push(createSelect(pastName + SELECT_FALSE + count, count));
    elements.push(createUl(pastName + SELECT_FALSE + count + UL));

    elements.forEach(function (element) {
        li.appendChild(element);
    });
    return li;
}

function createLabel(name){
    var label = document.createElement("label");
    label.innerHTML = name;
    return label;
};

function createUl(pastName) {
    var ul = document.createElement(UL);
    ul.setAttribute(ID, pastName);
    ul.setAttribute(NAME, pastName);
    return ul;
};

function currentLevel(pastName) {
    var regular_expression = /(\d+)(?!.*\d)/;
    var level = regular_expression.exec(pastName);
    return "l" + level[1];
}

function createText(name, value) {
    var element = document.createElement(INPUT);
    element.setAttribute(TYPE, TEXT);
    element.setAttribute(VALUE, value);
    element.setAttribute(ID, name);
    element.setAttribute(NAME, name);
    return element;
};

var PICK_NAME = "Pick";
var PICK_VALUE = "N/A";
var RULE_NAME = "Rule";
var RULE_VALUE = "rule";
var ANS_NAME = "Ans";
var ANS_VALUE = "ans";
var SELECT_WIDTH = "80px"

var COUNT = "count";

function createOption(name, value) {
    var option;
    option = document.createElement(OPTION);
    option.innerHTML = name;
    option.setAttribute(VALUE, value);
    return option;
};

function createSelect(name, count) {
    var select = document.createElement(SELECT);
    select.setAttribute(ID, name);
    select.setAttribute(NAME, name);
    select.setAttribute(COUNT, count);
    select.style.width = SELECT_WIDTH;
    select.appendChild(createOption(PICK_NAME, PICK_VALUE));
    select.appendChild(createOption(RULE_NAME, RULE_VALUE));
    select.appendChild(createOption(ANS_NAME, ANS_VALUE));

    select.onchange = function () {
        var count = (parseInt(this.getAttribute(COUNT)) + 1).toString();
        var id = this.getAttribute(ID);
        var name = this.getAttribute(NAME);

        if (this.value == RULE_VALUE) newRule(id, count);
        else if (this.value == ANS_VALUE) newAns(id);
        else console.log("In else");
    };
    return select;
};

function newRule(parent, count) {
    var selectElement = document.getElementById(parent);
    var appendTo = document.getElementById(parent+UL);
    selectElement.disabled = true;
    addRule(appendTo, count, parent);
};

function newAns(parent) {
    var selectElement = document.getElementById(parent);
    var appendTo = document.getElementById(parent + UL);
    selectElement.disabled = true;
    addAns(appendTo, parent);
};

var ANSWER = "Then this happends.....";
var A = "a"
function addAns(appendTo, pastName) {
    appendTo.appendChild(createAnsLi(pastName));
};

function createAnsLi(pastName) {
    var li = document.createElement(LI);
    li.setAttribute(ID, pastName + A);
    li.setAttribute(NAME, pastName + A);
    li.setAttribute(CLASS, currentLevel(pastName));
    li.appendChild(createText(pastName + A, ANSWER));
    return li;
};
