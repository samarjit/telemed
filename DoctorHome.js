import React, { useState, useEffect } from "react";
import './DoctorHome.scss';
import dayjs from 'dayjs';
import {formatDuration, getHashCode, intToHSL} from './util';

const shortDateFormat = {month:'short', day:'numeric', hour:'numeric'};


const dataRemote = {
  messages: [
    {
      msg: 'I am feeling better',
      name: 'A',
      dateTime: new Intl.DateTimeFormat('en-US', shortDateFormat).format(new Date('2020-04-01T11:22:00'))
    },
    {
      msg: 'Yesterday night I had 1.2 fever, I have more messages I have more messages I have more messages I have more messages',
      name: 'Abcdcc',
      dateTime: new Intl.DateTimeFormat('en-US', shortDateFormat).format(new Date('2020-04-01T11:22:00'))
    },
    {
      msg: 'Yesterday night I had 1.2 fever, I have more messages I have more messages I have more messages I have more messages',
      name: 'Abcdcc',
      dateTime: new Intl.DateTimeFormat('en-US', shortDateFormat).format(new Date('2020-04-01T11:22:00'))
    }
  ],
  schedule: [{
      dateTime: new Date().toISOString(),
      duration: 120,
      patient: 'sam',
    },{
      dateTime: dayjs().startOf('day').add(6,'hour').toISOString(),
      duration: 110,
      patient: 'su kiang chiat',
    }
  ],
  recentPatients: [{
    name: 'Sam Sam',
    image: '',
  },
  {
    name: 'Someone P'
  },{
    name: 'Johnny Depp'
  }]
};

export default function DoctorHome() {
  const [data, setData] = useState(dataRemote);
  useEffect(() => {
    
     
  }, []);
  return (
    <div className="container-fliud">
      <div className="row row-cols-1">
        <div className="p-1">
          <div className=" p-1 tile lighten-2" ><h6>Inbox</h6>
            {data.messages.map((it, key) =>  
              <div className="inboxInline d-flex" key={key}>
                <div className="my-2 pr-2">{it.name}</div>
                <div className="my-2 pl-1">{it.msg}</div>
                <small className="my-2 pl-2 pr-1 ">{it.dateTime}</small>

              </div> 
            )}
          </div>
        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" > <h6>Upcoming Appointments </h6>
          {data.schedule.map((it, key) =>  
              <div className="inboxInline d-flex" key={key}>
                <div className="my-2 pr-2">{it.patient}</div>
                <div className="my-2 pl-1">{dayjs(Date.parse(it.dateTime)).format('MMM, ddd hh:mm a')}</div>
                <small className="my-2 pl-2 pr-1">{formatDuration(it.duration)}</small>

              </div> 
            )}
          </div>
        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" ><h6>Create Quick Reminder</h6>
            <div className="row">
            <input className="col s4 mx-2" placeholder="Person" aria-label="person"/>
            <input type="date" className="col s4 mx-2" placeholder="date" aria-label="date"/>
            <input type="time" className="col s4 mx-2" placeholder="time" aria-label="time" />
            </div>

            <textarea className="col6" placeholder="Description"/>
            <button type="button" className="btn">create</button>
          </div>
          

        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" >
            <div className="d-flex justify-content-between">
            <h6>Recent Patient</h6>
            <form class="col s4">
            <div class="mt-1  d-flex">
              <input type="text" class="input-field" id="searchInp" placeholder="Search" aria-label="Search"/>
              <i class="material-icons mt-2 ">search</i>
            </div>
            </form>
            </div>

            <div className="userTileGroup d-flex">
              {data.recentPatients.map((pt, i) => 
              <div className="userTile border p-1">
                {pt.image && <div className="imageCircle"></div>}
                {!pt.image && <div className="imageLetter  text-white" style={{backgroundColor: intToHSL(getHashCode(pt.name))}}>{pt.name.charAt(0)}
                </div>}
                {pt.name}
              </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" ><h6>Add/Edit speciality </h6>
          </div>
        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" ><h6>Consultation Hours Summary </h6>
          <div className="userTileGroup d-flex justify-content-around">
            <div className="userTile border p-2">
              <div>Year <small>(hr)</small></div>
              <div className="display-4">250</div>
            </div>
            <div className="userTile  border p-2">
              <div>Month <small>(hr)</small></div>
              <div className="display-4">50</div>
            </div>
            <div className="userTile  border p-2">
              <div>Week <small>(hr)</small></div>
              <div className="display-4">5</div>
            </div>
          </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}
