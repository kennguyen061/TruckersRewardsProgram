import './App.css';
import 'bulma/css/bulma.min.css';
import React, { useState, useEffect }  from 'react';
import axios from "axios";



function App() {
  
  const [listing, setListing] = useState([]);


  const fetchHighData = async () => 
  {
    const high_etsy_url = "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?sort_on=price&sort_order=down&includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv"
    const response = await axios.get(high_etsy_url);
    setListing(response.data.results);
    
  };

  const fetchLowData = async () => 
  {
    const low_etsy_url = "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?sort_on=price&sort_order=up&includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv" 
    const response = await axios.get(low_etsy_url);
    setListing(response.data.results);
    
  };


  const fetchData = () => 
  {
    const etsy_url = 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv';

    fetch(etsy_url)
      .then(response => {return response.json()})
      .then(data => { setListing(data.results)})
  }
    

  useEffect(() => {
    fetchData()
  }, [])

  

 
  return (
    <div className="Catalog">
      
      {/* <div className="select" style={{position: 'absolute', right: 50, marginTop: 30}}>
        <select value={value}  onChange={handleSelect}>
          <option value="recent">Sort by: Most Recent </option>
          <option value="high">Sort by: Highest Price </option>
          <option value="low">Sort by: Lowest Price </option>
        </select>
        <p>{`You selected ${value}`}</p>

      </div><br></br><br></br> */}

      
      <div class="buttons has-addons is-centered" style={{marginTop: 30}}>
        <button className="button" onClick={fetchData}> Sort by: Recent </button>
        <button className="button" onClick={fetchHighData}>Sort by: Highest Price</button>
        <button className="button" onClick={fetchLowData}>Sort by: Lowest Price</button>
      </div>

    



   
     


  
      <div className = "columns" style={{marginTop:30, marginLeft:10, marginRight:10}}>
     
        {/* column 1 */}
        <div className="column">   
        {listing.slice(0,5).map((listing,index) => (
          //return (
          <div className="box">
            <center><img src={listing.MainImage.url_170x135} alt ='listing1'></img> </center>
            <center><h1 style={{fontSize: 15}}><strong>{listing.title} </strong></h1></center>

            {/* Convert to points */}
            <center><h2>Price: {listing.price}</h2></center>

            {/* Potentially Star Rating */}
            <center>Rating: </center>

            
            <button className='button is-info' > Add to Cart </button>
            <button className="button is-warning" style={{float: 'right'}}> Add to Wishlist</button>  
          </div>

          //);
        ))}
        </div>
      
        {/* column 2 */}
        <div className="column">   
        {listing.slice(5,10).map((listing,index) => (
          //return (
          <div className="box">
            <center><img src={listing.MainImage.url_170x135} alt ='listing1'></img> </center>
            <center><h1 style={{fontSize: 15}}><strong>{listing.title} </strong></h1></center>

            {/* Convert to points */}
            <center><h2>Price: {listing.price}</h2></center>

            {/* Potentially Star Rating */}
            <center>Rating: </center>

            <button className='button is-info'> Add to Cart </button>
            <button className="button is-warning" style={{float: 'right'}}> Add to Wishlist</button>  
          </div>

          //);
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;

