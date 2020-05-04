import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from 'react-bootstrap/Card';
import Grid from "@material-ui/core/Grid";
import Chart from "react-google-charts";

const useStyles = makeStyles(theme => ({
    head_line:{
        fontSize:"1.25rem",
        fontFamily:"Helvetica", 
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing:"0.0075em"
    }
}))


export default function ChartView(props){
    const classes = useStyles();
    let data = [["Date", "Reading"]];

    if(props.sensorData.length !== 0){
        props.sensorData.map(element => {
            data.push([element[1].split("T")[0], element[0]])
        })
    }else{
        data.push([0,0])
    }
   
      const options = {
        title: "Reading for "+props.sensorType+" Sensor Type",
        curveType: "function",
        legend: { position: "bottom" }
      };

    return(
        <div>
            
                <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
                />
           
        </div>

    )
}