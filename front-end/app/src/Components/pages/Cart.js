import React, { useState, useEffect }  from 'react';
import DriverNav from "../UI/DriverNav";
import "./Cart.css"
import 'react-toastify/dist/ReactToastify.css';



//Retreive cart from the logged in driver


export default function Cart() {

    return (
        <div>
            <DriverNav />

            <div className='cart'>
                {/* iterate through cart items for driver  */}
                <div>

                    <div>
                        <button className="button_1"  style = {{float:"right"}}> + </button>
                        {/* add total quantity in cart */}
                    
                        <button className="button_1"  style = {{float:"right"}}> - </button>
                        
                    </div>
                    {/* when user clicks this button, it will remove the item the cart */}
                    <button className="button_1"  style = {{float:"right"}}> Save Catalog </button>



                </div>

                <button className="button_1"  style = {{float:"right"}}> Checkout </button>
            </div>
        </div>

    );

}