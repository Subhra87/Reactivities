import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activitiy";
interface Props
    {
        closeForm:()=>void;
        activity :Activity |undefined;
        createOrEdit:(activity:Activity)=>void;
        submitting:boolean;

    }
export default function ActivityForm({closeForm,activity:selectActivity,createOrEdit,submitting}:Props)
{
    const intialstate=selectActivity ?? {
        id:'',
        title:'',
        catagory:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }
    const [activity,setActivity] =useState(intialstate);
    function handelSubmitForm()
    {
        createOrEdit(activity);
    }
    function handelInputChange(event:ChangeEvent<HTMLInputElement>)
    {
        const{name ,value}=event.target;
        setActivity({...activity,[name]:value});
    }
    return(
        <Segment clearing>
            <Form onSubmit={handelSubmitForm} autoComplete='off' onChange={handelInputChange}>
                <Form.Input placeholder='Title' value={activity.title} name='title'/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description'/>
                <Form.Input placeholder='Category' value={activity.catagory} name='catagory'/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date'/>
                <Form.Input placeholder='City' value={activity.city} name='city'/>
                <Form.Input placeholder='Venu' value={activity.venue} name='venue'/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button floated='right' onClick={closeForm} type='button' content='Cancel'/>
            </Form>
            
        </Segment>
    )
}