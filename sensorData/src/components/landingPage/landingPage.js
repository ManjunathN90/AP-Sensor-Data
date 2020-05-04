import React, { Component } from "react";
import Button from '@material-ui/core/Button/Button'
import DenseAppBar from "../headers/headeres"

export default function LangingPage(props) {

    //Navigate to create sensor data functionality page
    function handlePostData() {
        props.history.push("/createdata")
    }

    //Navigate to fetch results using filters
    function handleGetResults(){
        props.history.push("/getresults")
    }


    return (
        <div>
            <DenseAppBar />
            <div className="container">
                <h2>AP Project </h2>
                <p>
                    A web application to record incoming sensor data and to screen and analyse stored data 
                    with basic statistics, table and chart view for a particular sensor type<br/>
                    It has 2 functionalities:
                    <ul>
                        <li>To record sensor data</li>
                        <li>To retrieve stored data</li>
                    </ul>
                </p>

                <h3>Application Guide</h3>
                <p>Use navigation bar to traverse between pages or below 2 button for functionality. 
                Details about using the functionality are described in repective pages</p>
                <Button disabled={false} variant="contained" color="primary" onClick={handlePostData}>Record Sensor Data</Button><br/><br/>
                <Button disabled={false} variant="contained" color="primary" onClick={handleGetResults}>Retrieve Data</Button>

            </div>
        </div>
    )
}