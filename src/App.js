import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Tune = () => {
  const [tunes, setTunes] = useState(null);
  const [searchTerm, setSearchTerm] = useState('')


  const fetchTunes = async (e) => {
    e.preventDefault()
    const res = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}`)
    setTunes(res.data.results);

  }

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value)
  };

  const getSingleTrackDetail = async (trackId) => {
    const res = await axios.get(`https://itunes.apple.com/search?term=${trackId}`)
    setTunes(res.data.results);
    setSearchTerm('')
  }

  console.log(tunes)
  return (
    <>
      <div className="SearchBox">
        <form className='text-center mt-3' onSubmit={(e) => fetchTunes(e)}>
          <input className="w-50 p-3 rounded shadow-lg" placeholder='Search iTunes' onChange={(e) => onSearchChange(e)} value={searchTerm} />
        </form>
      </div>

      {!tunes &&
        <h2 className=' mt-3 text-center'>Search iTunes</h2>
      }

      <div className="container mt-5">
        <div className="row d-flex justify-content-around w-100 mx-auto">
          {tunes && tunes.map(tune =>
            <div className="col col-lg-3 m-1 mx-2 pointer" onClick={() => getSingleTrackDetail(tune.trackId)}>
              <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={tune.artworkUrl100} alt="Card pic cap" />
                <div className="card-body">
                  <h5 className="card-title">{tune.trackName}</h5>
                  <p className="card-text"><b>Artist Name :- </b>{tune.artistName}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>

  )
}

export default Tune;
