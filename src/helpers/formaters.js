import moment from 'moment';
moment.locale('vi');
export {moment}

export const formatTime = (time) => {
    time = moment(time);
    return time && time.isValid() ? time.format('DD/MM/YYYY') : '--/--/--';
};

export const formatFullTime = time => {
    time = moment(time);
    return time && time.isValid() ? time.format('HH:mm DD/MM/YYYY') : '--/--/--';
};

export const formatShortTime = time => {
    time = moment(time);
    return time && time.isValid() ? time.format('HH:mm DD/MM') : '--/--';
};

export const convertTime = (time, currentFormatTime) => {
    if(time) {
        let format = currentFormatTime ? currentFormatTime : 'HH:mm DD/MM/YYYY';
        return moment(time, format).toDate();
    }
};

export const formatCurrency = (number, symbol = false) => symbol ? numeral(number).format('0,0 $') : numeral(number).format('0,0');

export const formatNumber = (number) => numeral(number).format('0,0.[000]');