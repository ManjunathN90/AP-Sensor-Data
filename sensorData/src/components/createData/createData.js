import React, {useEffect} from "react";
import Button from '@material-ui/core/Button/Button';
import DenseAppBar from "../headers/headeres";
import Snackbars from "../common/message";
import { axiosInstance } from "../../helpers/axios"

export default function CreateData(props) {

    const [snackbar, setSnackbar] = React.useState(false);
    const [snackbarType, setSnackbarType] = React.useState("success");
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [recordCount, setRecordCount] = React.useState(0)
    let sensorTypeVariant = ["Temperature", "Wind", "Humidity"];
    let timestampValue = 1200000000;
    let count = 0;


    //call API to create sensor data with JSON request
    async function callPostAPI(data){
        const result = await axiosInstance.post(
            "/dataops/createdata/",
            JSON.stringify(data)
        ).then(function(result){
            console.log(result.data.message)
        })
        
    }

    //Prepare JSON payload to be sent as post request
    function preparePostData(){
        timestampValue += Math.floor(Math.random() * (10000000 - 1000000) + 1000000)  //Creating a randomised ordered date timestamp

        let data = {}
        data['reading'] = (Math.random() * (100 - 10) + 10).toFixed(2)                //Creating randomised reading value between (10 - 100)
        data['timestamp'] = timestampValue
        data['sensorType'] = sensorTypeVariant[Math.floor(Math.random() * (3-0)+ 0)]  //Choosing a randomised sensor type from the sensor type list
        callPostAPI(data);
    }

    //Function to call create API for sensor data creation
    function reportSensorData(){
        
        if(count < 30){
           
            preparePostData();                                                                  //Step 1 of calling post API to create sensor data is to prepare JSON payload
            setTimeout(reportSensorData, 0.5 * 1000);
            count += 1; 
            setRecordCount(count)                                                               //To display how many sesnor data are recorded
        }
        else{
            count = 0;
            setSnackbarMsg("Successfully recorded") 
            setSnackbar(true);       
        }
    }
   
    return (
        <div>
            <DenseAppBar />
            {snackbar ? 
            <Snackbars 
            type = {snackbarType}
            open = "true"
            message = {snackbarMsg}
            />
            :
            ""}
            <div className="container">
                <h2>Record Sensor Data</h2>
                <h4>Requirement</h4>
                <p>
                    Functionality/API to store incoming sensor data at certain intervals.
                </p>
                <h4>Implementation</h4>
                <p>
                    To mock the requirement above of storing incoming sensor data press "RECORD SENSOR DATA" button. Few assumptions are made for demo purpose, the button
                    which would generate 30 sensor data samples at interval of 0.5 seconds with reading(0-100), ordered date timestamp(starting 2008) 
                    and sensor type category["Temperature","Wind", "Humidity"] to store to databse. 
                </p>
                <p>
                    Once sensor data is recorded, click on "RETRIEVE DATA" button on nav bar to fetch results.
                </p>
               <h4>Recorded {recordCount} sensor data</h4>
                <Button variant="contained" color="primary" onClick = {reportSensorData}>Record Sensor Data</Button>
            </div>
        </div>
    )
}