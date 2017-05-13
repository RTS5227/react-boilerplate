/**
 * Created by Tester-Ali on 21-11-2016.
 */
// Set cookie
export function setCookie(name, value, expires, path, domain, secure) {
    const cookie = name + "=" + escape(value) +
        ((expires == null) ? "" : "; expires=" + expires.toGMTString()) +
        ((path == null) ? "" : "; path=" + path) +
        ((domain == null) ? "" : "; domain=" + domain) +
        ((secure == null) ? "" : "; secure");
    document.cookie = cookie;
}

// Read cookie
export function getCookie(name) {
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) {
        let begin = dc.indexOf(cname);
        if (begin != -1) {
            begin += cname.length;
            let end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        }
    }
    return null;
}

//delete cookie
export function eraseCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path == null) ? "" : "; path=" + path) +
            ((domain == null) ? "" : "; domain=" + domain) +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}