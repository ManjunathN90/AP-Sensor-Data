import React, { Component } from "react";
import Button from '@material-ui/core/Button/Button'
import DenseAppBar from "../headers/headeres"
import Snackbars from "../common/message";

import { axiosInstance } from "../../helpers/axios"

export default function LangingPage(props) {

    function handlePostData() {
        props.history.push("/createdata")
    }

    function handleGetResults(){
        props.history.push("/getresults")
    }

    async function fetchData() {
        var result = await axiosInstance.get("/dataops/testapi/");
        console.log(result.data)
    }

    return (
        <div>
            <DenseAppBar />
            <div className="container">
                <h2>AP Project Objective</h2>
                <p>
                    An API for an IoT sensor which will enable the sensor to report its reading and for any API client
                    (frontend, reporting system) to query the sensor’s historic data for time series of values, or simple statistics
                    like Max/Min/Average values<br/>
                    It has 2 functionalities:
                    <ul>
                        <li>To post sensort data</li>
                        <li>To retireive stored data</li>
                    </ul>
                </p>
                <Button disabled={false} variant="contained" color="primary" onClick={handlePostData}>Post Sensor Data</Button>
                <Button disabled={false} variant="contained" color="primary" onClick={handleGetResults}>Get Results</Button>

            </div>
        </div>
    )
}