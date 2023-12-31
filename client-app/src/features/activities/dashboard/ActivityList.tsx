import React, { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/Activitiy";
import { Button, Item, Label, Segment } from "semantic-ui-react";
interface Props
{
    activities:Activity[];
    selectActivity :(id:string)=> void;
    deleteActivity:(id:string)=>void;
    submitting:boolean
}
export default function ActivityList({activities,selectActivity,deleteActivity,submitting}:Props)
{
    const[target,setTarget]=useState('');
    function handelActivityDelete(e :SyntheticEvent<HTMLButtonElement>,id:string)
    {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return(
        <Segment>
            <Item.Group devided>
            {activities.map(activity=>(
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                        <Button floated='right' content='View' color='blue' onClick={()=>selectActivity(activity.id)} />
                        <Button name={activity.id}
                        loading={submitting && target==activity.id} 
                        floated='right' 
                        content='Delete' 
                        color='red' 
                        onClick={(e)=>handelActivityDelete(e,activity.id)} 
                        />
                        <Label basic content={activity.catagory} /> 
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
            </Item.Group>
        </Segment>
    )
}