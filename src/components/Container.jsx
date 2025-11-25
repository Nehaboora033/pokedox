import React, { Children } from 'react'

const Container = ({ children, className }) => {
    return (
        <div className={`max-w-[1340px] mx-auto px-3 ${className}`}>
            {
                children
            }
        </div>
    )
}

export default Container