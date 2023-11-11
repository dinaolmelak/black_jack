
const MDCTextField = mdc.textField.MDCTextField;

const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
    return new MDCTextField(el);
});
const MDCCheckbox = mdc.checkbox.MDCCheckbox;
const checkboxes = [].map.call(document.querySelectorAll('.mdc-checkbox'), function(el) {
    return new MDCCheckbox(el);
}
);
const legal_checkbox = document.getElementById('legal_checkbox');
const terms_checkbox = document.getElementById('terms_checkbox');

const legal_checkbox_label = document.getElementById('legal_label');
legal_checkbox_label.addEventListener('click', function() {
    if (legal_checkbox.checked == true) {
        legal_checkbox.checked = false;
    }else{
        legal_checkbox.checked = true;
    }
}
);
const terms_checkbox_label = document.getElementById('term_label');
terms_checkbox_label.addEventListener('click', function() {
    if (terms_checkbox.checked == true) {
        terms_checkbox.checked = false;
    }else{
        terms_checkbox.checked = true;
    }
}
);

const full_name = document.getElementById('full_name_input');
const age = document.getElementById('age_input');
const birth_date = document.getElementById('birth_date_input');
const username = document.getElementById('username_input');
const password = document.getElementById('password_input');
const confirm_password = document.getElementById('confirm_password_input');


function check_eligibility() {
    let passwords_match = password.value === confirm_password.value;
    let right_age = age.value >= 13;
    let fields_filled = full_name.value != '' && age.value != '' && birth_date.value != '' && username.value != '' && password.value != '' && confirm_password.value != '';
    if (passwords_match == true && right_age == true && fields_filled == true) {
        return true;
        // console.log('The user is eligible');
    }else{
        // console.log('The user is ineligible');
        return false;
    }
}

const submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', function() {
    // let input_value = `Full Name: ${full_name.value}`;
    console.log(`Full Name: ${full_name.value}`);
    // let input_value = `Age: ${age.value}`;
    console.log(`Age: ${age.value}`);
    // let input_value = `Birth Date: ${birth_date.value}`;
    console.log(`Birth Date: ${birth_date.value}`);
    // let input_value = `Username: ${username.value}`;
    console.log(`Username: ${username.value}`);
    // let input_value = `Password: ${password.value}`;
    console.log(`Enter Password: ${password.value}`);
    // let input_value = `Confirm Password: ${confirm_password.value}`;
    console.log(`Confirm Password: ${confirm_password.value}`);
    
    if (legal_checkbox.checked == true) {
        console.log('The user has checked the legal checkbox');
    }else{
        console.log('The user has not checked the legal checkbox');
    }
    // let checkbox_value = terms_checkbox.checked;
    if (terms_checkbox.checked == true) {
        console.log('The user has checked the terms checkbox');
    }else{
        console.log('The user has not checked the terms checkbox');
    }

    let eligibility = check_eligibility();
    if (eligibility == true) {
        console.log('The user is eligible');
    } else {
        console.log('The user is ineligible');
    }
    




}
);
