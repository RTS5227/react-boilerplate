import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {HelpBlock} from 'react-bootstrap';
import {Control} from 'react-redux-form'
import ReactPasswordStrength from '../PasswordStrength'
import Localize from '../../resources/Localize'
import zxcvbn from 'zxcvbn'

export default class PasswordStrength extends Component {
    static propTypes = {
        model: PropTypes.string,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    render() {
        let {model, onChange} = this.props;
        let {password, isValid, warning} = this.state;
        return (
            <div>
                <ReactPasswordStrength
                    minLength={6}
                    minScore={2}
                    scoreWords={['Quá lởm', 'Đơn giản quá', 'Tạm được', 'Tốt', 'Rất tốt']}
                    changeCallback={(e) => {
                        let value = e.password;
                        if (e.isValid && (value.search(/[A-Z]/g) < 0 || value.search(/\d/g) < 0)) {
                            this.setState({
                                isValid: false,
                                password: value,
                                warning: 'Tối thiểu 6 ký tự, bao gồm chữ hoa và số'
                            })
                        } else {
                            this.setState({
                                isValid: e.isValid,
                                password: value,
                                warning: zxcvbn(value).feedback.warning
                            });
                        }
                        onChange(value, isValid);
                    }}
                    inputProps={{className: "form-control", autoComplete: "off", type: 'password'}}
                />
                {model &&
                <Control.text model={model} controlProps={{value: password, className: 'hide'}}/>
                }
                {isValid ? '' :
                    <HelpBlock className="alert alert-warning">
                        {warning
                            ? Localize.t(warning)
                            : 'Tối thiểu 6 ký tự, bao gồm chữ hoa và số'}
                    </HelpBlock>
                }
            </div>
        )
    }
}