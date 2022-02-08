import React,{ useState,useEffect } from "react";
import ReactDOM from "react-dom";
export function App() {
  const [error, setError] = useState(null);
  const [searchValue, setsearchValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    console.log("coming here",new Date());
    loadCards();
  },[])


  const loadCards = () =>{
    let url = "https://api.scryfall.com/cards/search";
    var queryString = 'c=red';
    if(searchValue != ''){
      queryString = searchValue;
    }

    let bodyObj = url+`order=cmc&q=${queryString}`;
    fetch("https://api.scryfall.com/cards/search?"+bodyObj,{cache: "force-cache"})
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
           console.log(new Date());
          setIsLoaded(true);

          (result.data)?setItems(result.data):setItems([]);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const searchCard = () =>{
    console.log('hello',searchValue,new Date());
    loadCards();
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <input type="text" placeholder="search" id="searchText" defaultValue={searchValue} onChange={(val)=>setsearchValue(val.target.value)}
        style={{"display":"inline","margin":"15px 15px 15px 15px","marginLeft":"60px"}}></input>
       
      {/*  <label style={{"display":"inline","margin":"15px 1px 15px 15px","marginLeft":"60px"}}>Show As </label>

      <select style={{"display":"inline","margin":"15px 15px 15px 15px"}}>
        <option value="cards">Card</option>
        <option value="prints">Prints</option>
        <option value="art">Art</option>
      </select>*/}
      <button onClick={()=>searchCard()}>Search</button>
      <ul>
        {(items.length>0)&&items.map((item) => (
          <li key={item.id} style={{"display":"inline","margin":"15px 15px 15px 15px"}}>
          <a href={item.scryfall_uri} target="_blank"  rel="noreferrer">
            <img src={(item.image_uris)?item.image_uris.small:'/'} alt={item.artist} />
          </a>
          </li>
        ))}
      </ul>
      </div>
    );
  }
}https://c1.scryfall.com/file/scryfall-cards/normal/front/5/a/5aa90ab6-2686-4462-8725-5d4370c05437.jpg?1630393486


ReactDOM.render( 
  <App />, 
  document.getElementById("root") 
); 