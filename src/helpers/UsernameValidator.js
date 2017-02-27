const Banned = require('resources/Banned.json');
export class UsernameValidator {
    static validate(username) {
        username = username.toLowerCase();
        if (Banned.bannedUsername.indexOf(username) > -1) {
            return {
                isValid: false,
                error: "Tên đăng nhập này không được phép sử dụng"
            };
        }
        for (let keyword of Banned.bannedKeyword) {
            let regex = new RegExp(keyword);
            if (username.search(regex) >= 0) {
                return {
                    isValid: false,
                    error: "Tên đăng nhập này không được phép sử dụng do chứa các ký tự có thể gây phản cảm"
                };
            }
        }
        return {
            isValid: true
        };
    }
}