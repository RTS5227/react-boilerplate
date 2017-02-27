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

export default class NumericInput extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyUp: PropTypes.func,
        disabled: PropTypes.bool,
        precision: PropTypes.number
    };
    static defaultProps = {
        className: 'form-control',
        precision: 2,
        disabled: false,
        onChange(){
        },
        onBlur(){
        },
        onKeyUp(){
        }
    };

    componentDidMount() {
        const {onChange, value} = this.props;
        if (value != null || typeof value !== 'undefined') {
            onChange(numeral(value).value());
        }
    }

    componentDidUpdate(prev) {
        const {onChange, value} = this.props;
        if (value != prev.value) {
            onChange(numeral(value).value());
        }
    }

    render() {
        const {className, onChange, onBlur, onKeyUp, value, disabled, precision} = this.props;
        return (
            <input
                defaultValue={value}
                type="text"
                disabled={disabled}
                className={className}
                onChange={e => {
                    onChange(numeral(e.target.value).format(`0,0.[${'0'.repeat(precision)}]`))
                }}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
            />
        )
    }
}