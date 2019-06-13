import { regEmail, regPassWord } from './regEx';

export const checkEmail = (value) => {
    if (regEmail.test(value)) {
        return {
            valid: true,
            noValid: false,
            message: 'Email correct'
        };
    }
    return {
        valid: false,
        noValid: true,
        message: 'Email must looks like: "email@domain.com"'
    };
};

export const checkPasswordValid = (value) => {
    const regex2 = new RegExp(regPassWord);
    if (regex2.test(value)) {
        return {
            valid: true,
            noValid: false,
            message: 'Valid password'
        };
    }
    return {
        valid: false,
        noValid: true,
        message: 'Must have length more then 8, have !@#$%^&*, letter uppercase and lowercase, number'
    };
};

export const checkPasswordEqual = (value1, value2) => {
    if ((value1 === value2) && (value1 !== '') && (value2 !== '')) {
        return true;
    }
    return false;
};

export const checkPassword = (value1, value2) => {
    const passwordValid = checkPasswordValid(value1);
    const equalPass = checkPasswordEqual(value1, value2);
    if (passwordValid.valid) {
        passwordValid.message = !equalPass ? 'Password are not equal' : passwordValid.message;
        passwordValid.valid = equalPass;
        passwordValid.noValid = !equalPass;
    }
    return {
        passwordValid,
        equalPass
    };
};

export const checkName = (value) => {
    if (value.length > 0) {
        return {
            valid: true,
            noValid: false,
            message: ''
        };
    }
    return {
        valid: false,
        noValid: true,
        message: 'Name must be not empty'
    };
};

export default {
    checkEmail,
    checkPassword,
    checkPasswordValid,
    checkPasswordEqual,
    checkName
};
