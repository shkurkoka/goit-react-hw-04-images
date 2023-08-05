import React from "react";

const Button = ({ loadMore }) => {
    return (
        <button onClick={loadMore} className="Button" >Load more</button>
    )
}

export default Button;