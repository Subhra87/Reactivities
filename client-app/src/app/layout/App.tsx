import React, {useEffect, useState } from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/Activitiy';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const[activities,setActivities] =useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const[editMode,setEditMode]=useState(false);
  const[loading,setloading]=useState(true);
  const[submitting,setSubmitting]=useState(false);


  useEffect(()=>{
    agent.Activities.list()
    .then(response=>{
      let activities:Activity[]=[];
      response.forEach(activity=>{
        activity.date=activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setloading(false);
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
    setSubmitting(true);
    if(activity.id)
    {
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id!==activity.id),activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else{
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }
  function handelDeleteActivity(id:string)
  {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id!==id)])
      setSubmitting(false);
    })
    
  }
  if(loading) return <LoadingComponent content='Loading app...'/>
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
     submitting={submitting}
     />
      </Container>
    </>
  );
}

export default App;
