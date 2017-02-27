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
        const b = number % 10;
        return (~~(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                    (b === 3) ? 'rd' : 'th';
    },
    currency: {
        symbol: 'VNĐ'
    }
});
//TODO use helpers when release

// switch between languages
numeral.language('vi');
import React, {PropTypes} from 'react'

const isNegative = value => /^-\d*/g.test(value);
const convert = (value, isNe) => {
    const t = value ? (value === 0 || value === '0' ? '0' : numeral(value).format('0,0')) : '';
    return isNe ? '-' + t : t;
};
const reConvert = (value, isNe) => {
    const t = value ? (value === 0 || value === '0' ? 0 : numeral(value).value()) : null;
    return isNe && t !== null ? -t : t;
}

export default class CurrencyInput extends React.Component {
    constructor(props){
        super(props);
        const {display} = this.onInputChange(props.value);
        this.state = {display}
    }
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyUp: PropTypes.func,
        negative: PropTypes.bool,
        disabled: PropTypes.bool
    };
    static defaultProps = {
        className: 'form-control',
        placeholder: '',
        negative: false,
        disabled: false,
        onChange(){},
        onBlur(){},
        onKeyUp(){}
    };

    componentDidUpdate(prev){
        const {onChange, value} = this.props;
        if(value != prev.value){
            this.setState({display: convert(value)});
            onChange(reConvert(value));
        }
    }

    onInputChange = (e) => {
        const {negative} = this.props;
        const raw = typeof e == 'string' ? e.replace(/[^0-9]+/g, '') : '';
        const isNe = negative && isNegative (e);
        return {
            display: convert(raw, isNe),
            number: reConvert(raw, isNe)
        };
    };

    render() {
        const {className, onChange, onBlur, onKeyUp, value, disabled, placeholder, negative} = this.props;
        const {display} = this.state;
        return (
            <input
                value={display}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                className={className}
                onChange={e => {
                    const {display, number} = this.onInputChange(e.target.value);
                    this.setState({display});
                    onChange(number);
                }}
                onBlur={e => {
                    const {display, number} = this.onInputChange(e.target.value);
                    this.setState({display});
                    onBlur(number);
                }}
                onKeyUp={onKeyUp}
            />
        )
    }
}