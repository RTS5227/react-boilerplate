import React, {Component} from 'react';
import Header from './widgets/Header'
import SideBar from './widgets/SideBar'
import Footer from './widgets/Footer'

class MainLayout extends Component {
    render() {
        const {children} = this.props;
        return (
            <div>
                <div className="application">
                    <Header {...this.props} />
                    <SideBar {...this.props} />
                    <div className="content-wrapper">
                        {this.props.children}
                    </div>
                    <Footer {...this.props} />
                </div>
            </div>
        )
    }
}
export default MainLayout;