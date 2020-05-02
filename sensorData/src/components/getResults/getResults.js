import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button/Button';
import DenseAppBar from "../headers/headeres";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Snackbars from "../common/message";
import MUIDataTable from "mui-datatables";

import { axiosInstance } from "../../helpers/axios"
import { useForm } from "react-hook-form";

export default function GetResults(props) {
    const [sensorData, setSensorData] = useState([]);
    const [message, setMessage] = useState("");

    const columns = ["Reading", "Timestamp", "Sensor Type"];

    const data = sensorData;

    const options = {
    filterType: 'checkbox',
    };

    async function fetchSensorData() {
        let dataArr = []
        const result = await axiosInstance.get(
            "/dataops/getresults/"
        ).then(function(result){
            result.data.sensorData.map(record => {
                dataArr.push([record['reading'], record['timestamp'], record['sensorType']])
            })
            console.log(dataArr);
            setSensorData(dataArr);
            setMessage("Sensor Data " +result.data.message);
        });
    }

    useEffect(() => {
        fetchSensorData();
    }, [])
    return (
        <div>
            <DenseAppBar />
            <div className="container">
            <MUIDataTable 
            title={message} 
            data={data} 
            columns={columns} 
            options={options} 
            />
            </div>
        </div>
    )
}