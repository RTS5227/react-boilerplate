import React, {Component} from 'react'
import DocumentTitle from 'cores/DocumentTitle'

class RegisterLayout extends Component {
    render() {
        return (
            <DocumentTitle title="Đăng kí">
                <div className="login_layout body-bg-full v2 pace-done">{this.props.children}</div>
            </DocumentTitle>
        )
    }
}
export default RegisterLayout