import React from 'react';
import DevMarketPlace from './DevMarketPlace';
import RecMarketPlace from './RecMarketPlace';


function MarketPlace() {
    return (
        <div>
            {props.user.user.developer ?
            <DevMarketPlace/> :
            <RecMarketPlace/>
            }
        </div>
    )
}

export default MarketPlace