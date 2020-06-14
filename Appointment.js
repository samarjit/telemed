import React,{useEffect, useState} from 'react';
// import {toastStore, hideToast, addToast} from './toastReducer';
import ev from './event';

const appointments = [{
    id: '123',
    dateTime: new Date().toISOString(),
    dateTimePrevious: null,
    duration: 1,
    acceptedBy: [],
    doctor: 'de',
    patient: 'sam',
    description: 'test',
    pendingAcceptanceBy: ['sam'],
    newTimeSuggestedBy: '',
    createdBy: 'meme',
    status: 'actve'
  }]

// appointments.length = 0;

function validateDateTime(editableAppointment) {
  try {
    if (!editableAppointment.date && !editableAppointment.time && editableAppointment.dateTime) {
      // date did not change
      return true;
    }
    if (editableAppointment.date && editableAppointment.time) {
      editableAppointment.dateTime = new Date(`${editableAppointment.date}T${editableAppointment.time}:00`).toISOString();
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function persistApi(editableAppointment) {
  //appointments = editableAppointment;
  // appointments = [];
  if (editableAppointment.date) {
    editableAppointment.dateTime = new Date(`${editableAppointment.date}T${editableAppointment.time}:00`).toISOString()
  }
  if (appointments.length === 0) {
    appointments = [editableAppointment];
  } else {
    Object.assign(appointments[0], editableAppointment);
  }
}

export default function () {
  const currentUser='sam';
  const [currentView, setCurrentView] = useState('');
  const [editableAppointment, setEditableAppointment] = useState({});
  // let currentView = {curr: (<>default</>)};
  useEffect(() => {
    console.log('setting current ac');
    if (appointments.length === 0) {
      setCurrentView('createAppointment')
    } else {
      setCurrentView('currentAppointment');
    }
    // FIXME: remove
     setCurrentView('makeAppointment');
  },[])


  function editAppointmentFn(appointmentId) {
    console.log('changing view')
    setCurrentView('makeAppointment');
    let ap = appointments[0];
    let dt = new Date(ap.dateTime);
    ap.date = `${dt.getFullYear()}-${('0' + (dt.getMonth() + 1)).slice(-2)}-${('0'+ dt.getDate()).slice(-2)}`;
    ap.time = `${('0'+dt.getHours()).slice(-2)}:${('0'+dt.getMinutes()).slice(-2)}`;
    setEditableAppointment(ap);
  }
  function approveFn (e) {
    //setEditableAppointment(input);
    const editingAppo = appointments[0]
    
    editingAppo.pendingAcceptanceBy = editingAppo.pendingAcceptanceBy.filter(aprvs => aprvs !== currentUser);
    
    if (!validateDateTime(editingAppo)) {
      /// TODO: error handler
      // addToast('Date validation failed')
      ev.trigger('ADD_TOAST', 'Date validation failed')
      return;
    } 
    persistApi(editingAppo);
    setEditableAppointment(editingAppo);
    setCurrentView('currentAppointment')
  }
  function updateAppointmentFn (e) {
    //setEditableAppointment(input);
    // Does it need acceptance ??? 
    let users = [editableAppointment.doctor, editableAppointment.patient];
    editableAppointment.pendingAcceptanceBy = users.filter(i=>i !== currentUser);
    console.log('updateAppointmentFn', editableAppointment)
    if (!validateDateTime(editableAppointment)) {
      /// TODO: error handler
      ev.trigger('ADD_TOAST','Date validation failed')
      console.log('sent to toast')
      return;
    }
    persistApi(editableAppointment);
    setCurrentView('currentAppointment')
  }

  function createAppointmentFn() {
    setCurrentView('makeAppointment');
  }
  const handleInputChange = (e) => {
    setEditableAppointment({
    ...editableAppointment,
    [e.currentTarget.name]: e.currentTarget.value
    });
  
    editableAppointment.dateTime = new Date(editableAppointment.date+'T'+editableAppointment.time)
    
  }
  const createAppointment = (
    <>
     You do not have any appointments at the moment.
     Do you want to create one <button type="button" onClick={(e) => createAppointmentFn()} className="btn btn-primary">create</button>
    </>
  )
  const currentAppointment = (
    <>
    {appointments.map(appointment => {
     return <div>
     <h3>Your Appointment</h3>
      Date: {new Date(appointment.dateTime).toLocaleDateString() } <br/>
      Time: {new Date(appointment.dateTime).toLocaleTimeString() }<br/>
      Duration: {appointment.duration} hr <br/>
      Doctor: {appointment.doctor} <br/>
      <button type="button" onClick={(e) => editAppointmentFn(appointment.id)} className="btn btn-secondary">Edit
      </button>
      {appointment.pendingAcceptanceBy && appointment.pendingAcceptanceBy.length === 0 && <span>Everyone Accepted</span>}
      {appointment.pendingAcceptanceBy && appointment.pendingAcceptanceBy.length > 0 && !appointment.pendingAcceptanceBy.includes(currentUser) && (
        <span>Pending acceptance By: {appointment.pendingAcceptanceBy.filter( i => i !== currentUser).join(',')}</span>
      )}
      {' '}{appointment.pendingAcceptanceBy && appointment.pendingAcceptanceBy.includes(currentUser) && (
      <button type="button" onClick={(e) => approveFn(e)} className="btn btn-primary">Approve</button>
      )}
      </div>
    })}
    </>
  );

  const makeAppointment =  (<>
    <form>
    {/*Input Data: {JSON.stringify(appointments[0])} <br/>
    Persist Data: {JSON.stringify(editableAppointment)} <br/>*/}
    Doctor <br/>
    <input name="doctor" placeholder="Doctor" value={editableAppointment['doctor']}  onChange={handleInputChange} className="form-control"/>
    <br/>
    Date & Time <br/>
    <input type="date" placeholder="date" name="date" value={editableAppointment['date']} onChange={handleInputChange} className="form-control"/>
    <input type="time" placeholder="time" name="time" value={editableAppointment['time']} onChange={handleInputChange} className="form-control"/>
    <br/>
    Duration <small>(hr.)</small> <br/> 
    <input type="number" name="duration" placeholder="duration" value={editableAppointment['duration']} onChange={handleInputChange}className="form-control"/>
    <br/>
    Description <br/>
    <textarea name="description" placeholder="Description" value={editableAppointment['description']} onChange={handleInputChange} className="form-control"></textarea>
    <br/>
    <br/>
    <button type="button" onClick={(e) => updateAppointmentFn(e) } className="btn btn-primary">Send</button>
    </form>
  </>);
  // console.log('setting near return')
 // currentView.curr = currentAppointment;
  return currentView === 'makeAppointment'? makeAppointment:
    currentView === 'currentAppointment'? currentAppointment:
    createAppointment;
}