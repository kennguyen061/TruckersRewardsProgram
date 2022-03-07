import './App.css';
import 'bulma/css/bulma.min.css';
import React, { useState, useEffect }  from 'react';
import axios from "axios";

//in order for api to work, go to this link: https://cors-anywhere.herokuapp.com and click temporary access



function App() {
  
  //used to grab the active listings
  const [listing, setlisting] = useState([]);

  //used for the search parameters 
  const [q, setQ] = useState("");

  //search bar will only look at title and tags
  const [searchParam] = useState(["title", "tags"]);

  //used for the filtering using dropdown
  const [filterParam, setFilterParam] = useState("All");
  

  
  const fetchHighData = async () => 
  {
    const high_etsy_url = "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?sort_on=price&sort_order=down&includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv"
    const response = await axios.get(high_etsy_url);
    setlisting(response.data.results);
    
  };

  const fetchLowData = async () => 
  {
    const low_etsy_url = "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?sort_on=price&sort_order=up&includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv" 
    const response = await axios.get(low_etsy_url);
    setlisting(response.data.results);
    
  };

  const fetchData = () => 
  {
    const etsy_url = 'https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/active?includes=MainImage&limit=10&api_key=dmmhikoeydunsffqrxyeubdv';

    fetch(etsy_url)
      .then(response => {return response.json()})
      .then(data => { setlisting(data.results)})
  };
    

  useEffect(() => {
    fetchData()
  }, []);


  function search(listing) {
  
    return listing.filter((item) => {

      if (filterParam === "All") {
        return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            );
        });
      }
      
      else if (item.taxonomy_path.includes(filterParam)) {
          return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            )
        });
      }
  });
}
  

  return (
    <div className="Catalog">

      <div className="search-wrapper">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search for..."
            value={q}
            /*
            // set the value of our useState q
            //  anytime the user types in the search box
            */
            onChange={(e) => setQ(e.target.value)}
            />
            <span className="sr-only">Search here</span>
        </label>
      </div>  


        <div className="buttons has-addons is-centered" style={{marginTop: 30}} >
          <button className="button" onClick={fetchData}> Sort by: Recent </button>
          <button className="button" onClick={fetchHighData}>Sort by: Highest Price</button>
          <button className="button" onClick={fetchLowData}>Sort by: Lowest Price</button>

          <div className="select" style={{marginLeft: 50, marginBottom:8}}>
          <select onChange={(e) => {setFilterParam(e.target.value);}} className="custom-select" aria-label="Filter Countries By Region">
            <option value="All">Filter By Category</option>
            <option value="Art & Collectibles">Art & Collectibles</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Home & Living">Home & Living</option>
            <option value="Craft Supplies & Tools">Craft Supplies & Tools</option>
            <option value="Clothing">Clothing</option>
            <option value="Toys & Games">Toys & Games</option>
          </select>
          <span className="focus"></span>
          </div>
        </div>
 
      <div className = "columns" style={{marginTop:30, marginLeft:10, marginRight:10}}>

      {/* <div class="column is-narrow">
        <h3>Pick a Category:</h3>
        <div className='btn-group' onChange={(e) => {setFilterParam(e.target.value);}}>
          <button class="button is-responsive" style={{marginBottom: 10, marginTop:10}} value="Art & Collectibles"> Art & Collectibles</button>
          <button class="button is-responsive" style={{marginBottom: 10}}> Jewelry </button>
          <button class="button is-responsive" style={{marginBottom: 10}}>Home & Living </button>
          <button class="button is-responsive" style={{marginBottom: 10}}> Craft Supplies & Tools </button>
          <button class="button is-responsive" style={{marginBottom: 10}}>Clothing</button>
          <button class="button is-responsive" style={{marginBottom: 10}}>Toys & Games </button>
        </div>
      </div> */}
     
        <div className="column">   
        {/* {listing.map((listing,index) => ( */}
        {/* //{listing.map((listing,index) => ( */}
        
        {search(listing).map((listing) => (
       
          <div className="box">
            <center><img src={listing.MainImage.url_170x135} alt ='listing1'></img> </center>
            <center><h1 style={{fontSize: 15}}><strong>{listing.title} </strong></h1></center>

            {/* Convert to points */}
            <center><h2>Price: {listing.price}</h2></center>
            {/* <center><h2>Description: {listing.description}</h2></center> */}


            {/* Potentially Star Rating */}
            <center>Rating: </center>

            <button className='button is-info' > Add to Cart </button>
            <button className="button is-warning" style={{float: 'right'}}> Add to Wishlist</button>  
          </div>

        ))}
        </div> 
        </div>
    </div>
  );
  
}

export default App;

