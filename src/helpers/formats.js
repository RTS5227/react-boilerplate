import moment from 'moment';
moment.locale('vi');
export {moment}
const numeral = require('numeral');
numeral.language('vi', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        var b = number % 10;
        return (~~ (number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                    (b === 3) ? 'rd' : 'th';
    },
    currency: {
        symbol: 'VNĐ'
    }
});

// switch between languages
numeral.language('vi');

export {numeral};

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