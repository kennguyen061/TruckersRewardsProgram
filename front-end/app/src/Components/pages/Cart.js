import React, { useState, useEffect }  from 'react';
import DriverNav from "../UI/DriverNav";
import "./Cart.css"
import 'react-toastify/dist/ReactToastify.css';



//Retreive cart from the logged in driver
// //Gets the current quantity
// const getquantity = (UID, SID, ItemID) => {
//   db.query(
//     "SELECT Quantity FROM CARTITEM WHERE UID = ? AND SID = ? AND ItemID = ?",
//     [UID, SID, ItemID],
//     (error, result) => {
//       if (error) throw error;
//       return result[0].Quantity;
//     }
//   );
// };

// function addquantity(UID, SID, ItemID) {
//   //calculate new quantity
//   currentquantity = getquantity(UID, SID, ItemID);
//   newQuantity = currentquantity + 1;
//   db.query(
//     "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
//     [newQuantity, UID, SID, ItemID],
//     (error, result) => {
//       if (error) throw error;
//     }
//   );
// }

// function lowerquantity(UID, SID, ItemID) {
//   //calculate new quantity
//   currentquantity = getquantity(UID, SID, ItemID);
//   newQuantity = currentquantity - 1;
//   db.query(
//     "UPDATE CARTITEM SET Quantity = ? WHERE UID = ? AND SID = ? AND ItemID = ?",
//     [newQuantity, UID, SID, ItemID],
//     (error, result) => {
//       if (error) throw error;
//     }
//   );
// }

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