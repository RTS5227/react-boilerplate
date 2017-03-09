import React, {Component} from 'react';
import Link from 'cores/Link';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="main-header">
                    <nav className="navbar navbar-static-top">
                        <Link to="/" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </Link>
                    </nav>
                </header>
            </div>
        )
    }
}
export default Header