import React from 'react'

export default ({ name, onClick }) => {
    return (
        <button onClick={onClick}>{name}</button>
    )
}