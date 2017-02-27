import React, {Component} from 'react'
import LoadingBar from 'react-redux-loading-bar'
import {ReToastr, DevTools} from 'cores'
import 'cores/Toastr2/css/react-redux-toastr.min.css'

const options = {
    okText: 'ĐỒNG Ý',
    cancelText: 'KHÔNG'
};
const timeOut = 30 * 24 * 60 * 60 * 60 * 1000;
class RootLayout extends Component {
    render() {
        return (
            <div>
                <LoadingBar style={{zIndex: 999999, height: 5, backgroundColor: '#41205d'}}/>
                <ReToastr
                    confirmOptions={options}
                    timeOut={timeOut}
                    newestOnTop={false}
                    position="top-right"/>
                {process.env.NODE_ENV !== 'production' && <DevTools/>}
                {this.props.children}
            </div>

        )
    }
}
export default (RootLayout)