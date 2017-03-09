import React, {Component} from 'react'

const options = {
    okText: 'ĐỒNG Ý',
    cancelText: 'KHÔNG'
};
const timeOut = 30 * 24 * 60 * 60 * 60 * 1000;
class RootLayout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>

        )
    }
}
export default (RootLayout)