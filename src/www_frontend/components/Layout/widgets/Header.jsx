import React, {Component} from 'react';
import Link from '../../../../www_components/Link';
import * as RBT from 'react-bootstrap';
import * as customer from '../../customer'
import '../css/general/_fixed.scss'
import logo_mini from './../images/logo-mini.png'
import logo_text from './../images/logo-text.png'



class Header extends Component {


    render() {
        return (
            <div>



                <header className="main-header">
                    <Link to="/" className="logo">
                    <span className="logo-mini">
                        <img src={logo_mini} alt="image"/>
                    </span>
                        <span className="logo-lg">
                        <img src={logo_text} alt="image"/>
                    </span>
                    </Link>

                    <nav className="navbar navbar-static-top">
                        <Link to="/" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </Link>
                        {/*<RBT.Form className="search-form pull-left hidden-xs">
                            <RBT.FormGroup className="has-feedback mb-0">
                                <RBT.FormControl type="text" placeholder="Tìm kiếm..."
                                                 className="form-control rounded navbar-search-input"/>
                                <span className="ti-search form-control-feedback"/>
                            </RBT.FormGroup>
                        </RBT.Form>*/}


                        <customer.components.Profile {...this.props} />
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header