import { useParams } from "react-router-dom";
import React, { useState, useEffect }  from 'react';
import ImageGallery from 'react-image-gallery';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Listing_details.js'
// const mysql = require('mysql');
toast.configure()

// // specify database
// const db = mysql.createConnection({
//     host: "team1-db.cobd8enwsupz.us-east-1.rds.amazonaws.com",
//     user: "admin",
//     password: "test1337froggang"
// });

// // connect to database
// db.connect((error) => {
//     if (error) throw error;
// });

function Listing_details() {
    let {id}= useParams();
    const [listing, setlisting] = useState([]);
    let images = []

    
    
    // const notify_cart = item => () =>{
    //     // Calling toast method by passing string
    //     //variables to add to the table are 
    //     //item.listing_id
    //     //item.title
    //     //item.price (should be in points though)

    //     //make some conditional that checks if the driver already has that item on the cart (SELECT STATEMENT)
    //     //1 for uid and sid are placeholder
    //     db.query("SELECT * FROM CARTITEM WHERE UID = 1 AND SID = 1 AND ITEMID = ?;",
    //     [
    //         item.listing_id
    //     ],
    //     (error, result) => {
    //         if (error) throw error;
    //         if(result.length >= 1) {
    //             // if they do, increase the quantity by 1 of the current entry (UPDATE)
    //             //1 for uid and sid are placeholder
    //             //Retrieve old quantity (3rd index in table), increase it by one
    //             newquantity = result[0].Quantity + 1;
    //             db.query("UPDATE CARTITEM SET Quantity = ? WHERE ItemID = ? AND UID = 1 AND SID = 1",
    //             [
    //                 newquantity,
    //                 item.listing_id
    //             ],
    //             (error, result) => {
    //                 if (error) throw error;
    //             }
    //             )
    //         }
    //         else {
    //             //If not, create an entry with the item. (quantity 1) (INSERT INTO)
    //             //1 for uid and sid are placeholder
    //             db.query("INSERT INTO CARTITEM(ItemID, ItemName, Price, Quantity, UID, SID) VALUES(?,?,?,1,1,1);",
    //             [
    //                 item.listing_id,
    //                 item.title,
    //                 item.price,
    //             ],
    //             (error, result) => {
    //                 if (error) throw error;
    //             }
    //             )
    //         }
    //     }
    //     )  
    //     toast('Product has been added to the cart')
    // }

    const fetchData = () => 
    {
        const etsy_url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/${id}?includes=Images&limit=10&api_key=dmmhikoeydunsffqrxyeubdv`
        fetch(etsy_url)
        .then(response => {return response.json()})
        .then(data => { setlisting(data.results)})
    };
    


    useEffect(() => {
        fetchData()
    });

// {listing.slice(0,5).map((listing,index) => (
    

    // take out the images from the json
    listing.map((listing, index) =>
        images = listing.Images
    );

    //clean up images
    images.forEach(a => delete a.listing_image_id);
    images.forEach(a => delete a.blue);
    images.forEach(a => delete a.brightness);
    images.forEach(a => delete a.creation_tsz);
    images.forEach(a => delete a.full_height);
    images.forEach(a => delete a.full_width);
    images.forEach(a => delete a.hex_code);
    images.forEach(a => delete a.hue);
    images.forEach(a => delete a.is_black_and_white);
    images.forEach(a => delete a.listing_id);
    images.forEach(a => delete a.rank);
    images.forEach(a => delete a.red);
    images.forEach(a => delete a.saturation);
    images.forEach(a => delete a.url_170x135);
    images.forEach(a => delete a.green);

    
    var i;
    for(i = 0; i < images.length; i++){
        images[i].thumbnail = images[i]['url_75x75'];
        images[i].original = images[i]['url_570xN'];
        delete images[i].url_75x75;
        delete images[i].url_570xN;
    }

    
    return (
        
        <div style = {{marginTop: 50}}>
          <ImageGallery items={images}/>
          </div>
       
    )

  }





export default Listing_details;