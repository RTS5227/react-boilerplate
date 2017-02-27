import React, {Component} from 'react'
import DocumentTitle from '../../../www_components/DocumentTitle'

class LoginLayout extends Component {
    render() {
        return (
            <DocumentTitle title="Đăng nhập">
                <div className="login_layout body-bg-full v2 pace-done">{this.props.children}</div>
            </DocumentTitle>
        )
    }
}
export default LoginLayout