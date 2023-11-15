
const MDCTextField = mdc.textField.MDCTextField;

const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
    return new MDCTextField(el);
});
const MDCCheckbox = mdc.checkbox.MDCCheckbox;
const checkboxes = [].map.call(document.querySelectorAll('.mdc-checkbox'), function(el) {
    return new MDCCheckbox(el);
}
);
const eligibility_form = document.forms[0];
const legal_checkbox = eligibility_form[6];
const terms_checkbox = eligibility_form[7];
// Logic for checkmarking the legal  checkboxes when the user clicks on the label
const legal_checkbox_label = document.getElementById('legal_label');
legal_checkbox_label.addEventListener('click', function() {
    if (legal_checkbox.checked ) {
        legal_checkbox.checked = false;
    }else{
        legal_checkbox.checked = true;
    }
}
);
// Logic for checkmarking the terms checkboxes when the user clicks on the label
const terms_checkbox_label = document.getElementById('term_label');
terms_checkbox_label.addEventListener('click', function() {
    if (terms_checkbox.checked ) {
        terms_checkbox.checked = false;
    }else{
        terms_checkbox.checked = true;
    }
}
);

function check_eligibility() {
    let passwords_match = eligibility_form[4].value === eligibility_form[5].value;
    let right_age = eligibility_form[1].value >= 13;
    let fields_filled = eligibility_form[0].value != '' && eligibility_form[1].value != '' && eligibility_form[2].value != '' && eligibility_form[3].value != '' && eligibility_form[4].value != '' && eligibility_form[5].value != '';
    return (passwords_match && right_age  && fields_filled );
}

const submit_button = document.forms[0][8];
submit_button.addEventListener('click', function() {
    event.preventDefault();

    console.log(`Full Name: ${eligibility_form[0].value}`);

    console.log(`Age: ${eligibility_form[1].value}`);

    console.log(`Birth Date: ${eligibility_form[2].value}`);

    console.log(`Username: ${eligibility_form[3].value}`);

    console.log(`Enter Password: ${eligibility_form[4].value}`);

    console.log(`Confirm Password: ${eligibility_form[5].value}`);
    
    if (legal_checkbox.checked) {
        console.log('The user has checked the legal checkbox');
    }else{
        console.log('The user has not checked the legal checkbox');
    }

    if (terms_checkbox.checked ) {
        console.log('The user has checked the terms checkbox');
    }else{
        console.log('The user has not checked the terms checkbox');
    }

    let eligibility = check_eligibility();
    if (eligibility ) {
        console.log('The user is eligible');
    } else {
        console.log('The user is ineligible');
    }
    

}
);
