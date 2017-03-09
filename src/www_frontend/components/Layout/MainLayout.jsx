import React, {Component} from 'react';
import Header from './widgets/Header'
import SideBar from './widgets/SideBar'
import Footer from './widgets/Footer'
import {moment} from 'helpers'


class MainLayout extends Component {
    render() {
        const {getConfig, children} = this.props;
        return (
            <div>
                <div className="application">
                    <Header {...this.props} />
                    <SideBar {...this.props} />
                    <div className="content-wrapper">
                        {this.props.children && React.cloneElement(children, {
                            getConfig
                        })}
                    </div>
                    <Footer {...this.props} />
                </div>
            </div>
        )
    }
}
export default MainLayout;