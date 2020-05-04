import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from 'react-bootstrap/Card';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    head_line:{
        fontSize:"1.25rem",
        fontFamily:"Helvetica", 
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing:"0.0075em"
    }
}))

//Calculate the minimum, maximum and mean from the selected range of sensor data
export default function StatisticBlock(props){
    const classes = useStyles();
    let readingList = [...new Set(props.sensorData.map(record => record[0]))]  // from props sent from GetReults component sensorData has all 3 values out of which only reading are extracted
    let maxValue = Math.max(...readingList)
    let minValue = Math.min(...readingList)
    let meanValue = calculateMean(readingList)

    function calculateMean(readingList){
        let sum = 0;
        readingList.map(num => {
            sum += num
        })
        return((sum/readingList.length).toFixed(2))
    }
 

    return(
        <div>
            
            <h3 className={classes.head_line}>Basic Statistics Report</h3>
            <Grid container spacing={1} style={{ margin: "auto" }}>
                <Grid item xs={4}>
                    <Card style={{ width: '10rem' }}>
                        <Card.Body>
                            <Card.Title>Maximum Reading</Card.Title>
                            <Card.Text>
                            {maxValue}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card style={{ width: '10rem' }}>
                        <Card.Body>
                            <Card.Title>Minimum Reading</Card.Title>
                            <Card.Text>
                            {minValue}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card style={{ width: '10rem' }}>
                        <Card.Body>
                            <Card.Title>Mean Reading</Card.Title>
                            <Card.Text>
                            {meanValue}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
            
        </div>

    )
}