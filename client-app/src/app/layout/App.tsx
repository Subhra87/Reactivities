import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/Activitiy';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const[activities,setActivities] =useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const[editMode,setEditMode]=useState(false);


  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/Activity/getactivities')
    .then(response=>{
      setActivities(response.data);
    })
  },[])
 function handelselectActivity(id:string)
 {
  setSelectedActivity(activities.find(x=>x.id===id));
 }
 function handelCanceleSelectActivity()
 {
  setSelectedActivity(undefined);
 }
  function handelFormOpen(id?:string)
  {
    id? handelselectActivity(id):handelCanceleSelectActivity();
    setEditMode(true);
  }
  function handelFormClose()
  {
    setEditMode(false);
  }
  function handelCreateOrEditActivity(activity:Activity)
  {
    activity.id ? 
    setActivities([...activities.filter(x=>x.id!==activity.id),activity])
    : setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function handelDeleteActivity(id:string)
  {
    setActivities([...activities.filter(x=>x.id!==id)])
  }
  return (
    <>
     <Navbar openForm={handelFormOpen}/>
     <Container style={{marginTop:'7em'}}>
     <ActivityDashboard 
     activities={activities}
     selectedActivity={selectedActivity}
     selectActivity={handelselectActivity}
     cancelSelectActivity={handelCanceleSelectActivity}
     editMode ={editMode}
     openForm={handelFormOpen}
     closeForm ={handelFormClose}
     createOrEdit={handelCreateOrEditActivity}
     deleteActivity={handelDeleteActivity}
     />
      </Container>
    </>
  );
}

export default App;
