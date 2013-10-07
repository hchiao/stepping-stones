function clientFormCreate(appendTo, question){
    createQuestion(appendTo, question);
};

function createQuestion(appendTo, question){
    appendTo.appendChild(createLabel(question));
    appendTo.appendChild(createRadio("true", "true"));
    appendTo.appendChild(createLabel("true"));
    appendTo.appendChild(createRadio("false", "false"));
    appendTo.appendChild(createLabel("false"));
};

function createRadio(name, value){
    var radioInput = document.createElement('input');
    radioInput.setAttribute('type', 'radio');
    radioInput.setAttribute('name', name);
    radioInput.setAttribute('value', value);
    return radioInput;
};

function createLabel(name){
    var label = document.createElement("label");
    label.innerHTML = name;
    return label;
};
