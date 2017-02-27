import React, {Component} from 'react'

class ForbiddenLayout extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
export default ForbiddenLayout