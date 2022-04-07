import { useParams } from "react-router-dom";
import React, { useState, useEffect }  from 'react';
import ImageGallery from 'react-image-gallery';


function Listing_details() {
    let {id}= useParams();
    const [listing, setlisting] = useState([]);
    const [rating, setRating] = useState(0)
    let images = []

    //catch Rating value
    function handleRating(rate) {
        setRating(rate);
        // other logic
    }
    

    const fetchData = () => 
    {
        const etsy_url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/${id}?includes=Images&limit=10&api_key=dmmhikoeydunsffqrxyeubdv`
       // const etsy_url = `https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/993581906?includes=Images&limit=10&api_key=dmmhikoeydunsffqrxyeubdv`
        fetch(etsy_url)
        .then(response => {return response.json()})
        .then(data => { setlisting(data.results)})
    };
    


    useEffect(() => {
        fetchData()
    }, []);

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
        
        <div className="product page">
            <div className = "columns" style={{marginTop:30, marginLeft:10, marginRight:10}}>
                <div className="column is-three-fifths">   
                    <div>
                        <center><ImageGallery items={images}/></center> 
                    </div>
                </div>

                <div className="column">
                    <div>
                        { listing.map((listing) => (
                            <>
                                <h1 style={{ fontSize: 25, fontWeight: "bold" }}>
                                    {listing.title}
                                </h1>
                            
                                
                                <br></br>
                          

                                <h1 style={{fontSize: 25, fontWeight: "bold" }}>Price: {listing.price}</h1> <br></br>
                                <button class="button is-large is-fullwidth is-rounded" styel>Add to Cart</button> <br></br>
                                <button class="button is-large is-fullwidth is-rounded">Add to Wishlist</button><br></br>


                                <h1 style={{fontSize: 25, fontWeight: "bold" }}>Description</h1>

                                <p>
                                    {listing.description}
                                </p>
                            </>                                   
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )

  }





export default Listing_details;