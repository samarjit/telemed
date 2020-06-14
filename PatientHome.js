import React, {useState} from 'react';
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

export default function PatientHome() {
  const [data, setData] = useState(dataRemote);
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
          <div className=" p-1 tile lighten-2" ><h6>Update Profile</h6>
          Add past conditions 
          <div className="input-field col">
          <label htmlFor="conditionDate" className="active">Date</label>
          <input type="date" id="conditionDate"/>
          </div>
          <textarea className="" />
          <button type="button">Add</button>
          </div>
        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" ><h6>Search doctors </h6>
          Search by speciality keyword or doctor name
          <div className="d-flex ">
            <input type="search" placeholder="speciality keyword or doctor name" aria-label="search speciality keyword or doctor name"/>
            <i className="material-icons pt-3">search</i>
          </div>
          </div>
        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" ><h6>Consultation History</h6>
           Chat 
      Suggestions
          </div>
        </div>
        <div className="p-1">
          <div className=" p-1 tile lighten-2" ><h6>Consultation Hours Log</h6>
           
          </div>
        </div>
    
     <br/>
    </div>
    </div>
  )
}