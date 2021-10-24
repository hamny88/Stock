import React from "react";
import "./quote.css";

const quote = ({CP}:any) => {
    return (<div>
        <span className="your-stock-price">Your Stock Price</span>
        
        <span className="CP">${CP}</span>
    </div>);
}

export default quote;