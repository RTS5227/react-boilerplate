import React from 'react';
import {DocumentTitle, Link} from 'cores';

export default ({title, message}) => {
    return (
        <DocumentTitle title={title || "Lỗi"}>
            <div className="login_layout body-bg-full v2  pace-done">
                <div className="container page-container">
                    <div className="page-content form-error">
                        <h1 className="m-0 text-white fw-300"><i className="ti-face-sad fs-150"/>ops...</h1>
                        <h2 className="text-white mb-15">
                            {message}
                        </h2>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    )
}
