import { isEmail, isMobile } from "./validate"

// create hide mobile and email functionality
export const hideMobileOrEmail = (data) => {
    if(isEmail(data)){
        let com = data.split('@')[1];
        let mail = data.split('@')[0];
        
        let first = mail.substr(0, 1);
        let last = mail.substr(-1, 1);

        let count_star = '';
        for(let i=0; i<data.length-2; i++){
            count_star += '*';
        }
        
        return `${first} ${ count_star } ${last}@${com}`;
    }
    if(isMobile(data)){
        let first = data.substr(0, 3);
        let last = data.substr(-2);

        let count_star = '';
        for(let i=0; i<data.length-5; i++){
            count_star += '*';
        }
        
        return `${first} ${ count_star } ${last}`;
    }
}