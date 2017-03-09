import React from 'react';
import DocumentTitle from 'cores/DocumentTitle';
import Link from 'cores/Link'

export default () => {
    const img_light = require('./logo-iconic-light.png');
    return (
        <DocumentTitle title="500 Internal Server Error">
            <div className="login_layout body-bg-full v2  pace-done">
                <div className="container page-container">
                    <div className="page-content form-error">
                        <div className="logo"><img src={img_light} alt="" width="100"/></div>
                        <h1 className="m-0 text-white fw-300">5<i className="ti-face-sad fs-100 mr-5"/><i className="ti-face-sad fs-100"/></h1>
                        <p className="text-white mb-15">
                            Server đang gặp sự cố, vui lòng liên hệ với kỹ thuật nếu vấn đề còn tồn tại.
                        </p>
                        <Link to="/" className="btn-lg btn btn-primary btn-rounded btn-block">Quay lại trang chủ</Link>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}
