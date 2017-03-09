import React, {Component} from 'react';
import Link from 'cores/Link';
class SideBar extends Component {
    render() {
        return (
            <aside className="main-sidebar">

                <section className="sidebar">

                    <ul className="sidebar-menu">
                        <li>
                            <Link to="/">
                                <i className="ti-home mr-5"></i><span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders">
                                <i className="ti-package mr-5"></i><span>Danh sách vận đơn</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/transactions">
                                <i className="ti-money mr-5"></i><span>Tài chính</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <i className="ti-info-alt mr-5"></i><span>Trang cá nhân</span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </aside>
        )
    }
}
export default SideBar