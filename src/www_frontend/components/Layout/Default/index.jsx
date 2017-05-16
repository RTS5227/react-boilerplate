import React, {Component} from 'react';
import Header from './Header'
import SideBar from './SideBar'
import Footer from './Footer'
import favicon from './images/favicon.png'
import Helmet from 'react-helmet'

class MainLayout extends Component {
    render() {
        const {children} = this.props;
        return (
            <div>
                <Helmet>
                    <link rel="shortcut icon" href={favicon} />
                </Helmet>
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