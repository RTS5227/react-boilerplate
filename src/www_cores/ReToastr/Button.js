import React from 'react';

const Button = props => (
    <button className={props.className} type="button" onClick={() => props.onClick()} disabled={props.disabled}>
        {props.children}
    </button>
);

Button.displayName = 'ReduxConfirmButton';

export default Button;
