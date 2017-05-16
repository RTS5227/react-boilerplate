import React from 'react';
import Link from 'shared/Link';
import Helmet from 'shared/Helmet'

export default () => {
    const img_light = require('../logo-iconic-light.png');
    return (
        <div className="login_layout body-bg-full v2  pace-done">
            <Helmet><title>Page Not Found</title></Helmet>
            <div className="container page-container">
                <div className="page-content form-error">
                    <div className="logo"><img src={img_light} alt="" width="100"/></div>
                    <h1 className="m-0 text-white fw-300">4<i className="ti-face-sad fs-100"></i>4</h1>
                    <h4 className="fs-16 text-white fw-500">Rất tiếc, trang này không tồn tại!</h4>
                    <p className="text-white mb-15">Liên kết này có thể bị hỏng hoặc trang này có thể đã được gỡ bỏ.</p>
                    <Link to="/" className="btn-lg btn btn-primary btn-rounded btn-block">Quay lại trang chủ</Link>
                </div>
            </div>
        </div>
    )
}
