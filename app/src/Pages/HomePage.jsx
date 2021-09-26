import React from 'react';
import {Link} from "react-router-dom"

function HomePage({Events}) {
    return (
        <div className="mt-8">
      <h1 className="main-heading relative text-center mt-6 mb-6 text-xl">Find events of your choice -</h1>
        {
          !Events.length ? <h1 className="text-center">Loading...</h1> : (
            Events.map(e => {
              return (
                <Link to={`/content?id=${e.id}`} key={e.id} className="card mb-3 flex items-center p-3 w-_80  min-w-20 max-w-5xl mx-auto rounded-lg ">
                  <img className="w-16 h-16 mr-3 rounded-full object-cover" src={e.performers[0].image} alt="profile" />
                  <div>
                    <h1 className="card-title mb-2">{e.title.length < 22 ? e.title: e.title.substring(0, 22)+"..." }</h1>
                    <p className="card-artist mb-1"><span>Artist: </span>{e.performers.length === 1 ?<span>{e.performers[0].name}</span>: <span>{e.performers[0].name} and more</span>}</p>
                    <p className="card-venue"><span>Vanue: </span><span>{e.venue.name.length < 10 ? e.venue.name: e.venue.name.substring(0,10)+"..."}</span>,<span>{e.venue.city}</span>,<span>{e.venue.country}</span></p>
                  </div>
                </Link>
              )
            })
          )
        }
      </div>
    );
}

export default HomePage;