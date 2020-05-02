import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button/Button';
import DenseAppBar from "../headers/headeres";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Snackbars from "../common/message";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import CreatableSelect from "react-select/creatable";


import { axiosInstance } from "../../helpers/axios"
import { useForm } from "react-hook-form";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    typography_class: {
        fontSize: "1em"
    }
}));

export default function GetResults(props) {
    const classes = useStyles();
    const [sensorData, setSensorData] = useState([]);
    const [timestampList, setTimestampList] = useState([]);
    const [sensorTypeValue, setSensorTypeValue] = useState("");
    const [sensorTypeOptions, setSensorTypeOptions] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [message, setMessage] = useState("");

    const columns = ["Reading", "Timestamp", "Sensor Type"];

    const data = sensorData;

    const options = {
        filterType: 'checkbox',
    };

    async function fetchInitialSensorTypeList() {
        let dataArr = []
        const result = await axiosInstance.get(
            "/dataops/getresults/"
        ).then(function (result) {
            result.data.sensorData.map(record => {
                dataArr.push([record['reading'], record['timestamp'], record['sensorType']])
            })
            setSensorData(dataArr);
            setMessage("Sensor Data " + result.data.message);
            setFilterData(dataArr);
        });
    }

    function setFilterData(data) {

        let sensorTypeArr = [...new Set(data.map(type => type[2]))]
        let sensorTypeData = []
        sensorTypeArr.map(sensorType => {
            sensorTypeData.push({ label: sensorType, value: sensorType })
        })
        console.log(sensorTypeData)
        setSensorTypeOptions(sensorTypeData)
    }

    const handleChangeSensorType = e => {
        if (e == null) {
            setSensorTypeValue({ label: "", value: "" })
        }
        else {
            setSensorTypeValue({ label: e.value, value: e.value })
        }

    }

    const handleFromDateChange = e => {
        setFromDate(e.target.value)
    }

    const handleToDateChange = e => {
        setToDate(e.target.value)
    }

    function handleSubmit() {
        let dataFilter = {}
        dataFilter['fromDate'] = String(Date.parse(fromDate)).slice(0,10)
        dataFilter['toDate'] = String(Date.parse(toDate)).slice(0,10)
        dataFilter['sensorType'] = sensorTypeValue['label']
        
        fetchSensorData(dataFilter) 
    }

    async function fetchSensorData(dataFilter){
        var resultData = await axiosInstance.get(
            "/dataops/fetchresults/?startDate="+ 
            dataFilter['fromDate'] + 
            "&endDate="+ dataFilter['toDate'] +
            "&sensorType="+ dataFilter['sensorType']
        ).then(function(resultData){
            console.log(resultData)
        })
    }

    useEffect(() => {
        fetchInitialSensorTypeList();
        // setFilterData()
    }, [])
    return (
        <div>
            <DenseAppBar />
            <div className="container">
                <Grid container spacing={4} style={{ margin: "auto" }}>
                    <Grid item xs={3}>
                        <Typography
                            variant="h6"
                            component="h6"
                            className={classes.typography_class}
                        >
                            From Date Timestamp
                        </Typography>
                        <input name="timeStamp" type="datetime-local" placeholder="Enter Time Stamp" onChange={handleFromDateChange} style={{padding:"4px", borderRadius:"5px"}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            variant="h6"
                            component="h6"
                            className={classes.typography_class}
                        >
                            To Date Timestamp
                        </Typography>
                        <input name="timeStamp" type="datetime-local" placeholder="Enter Time Stamp" onChange={handleToDateChange} style={{padding:"4px", borderRadius:"5px"}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            variant="h6"
                            component="h6"
                            className={classes.typography_class}
                        >
                            Sensor Type
                        </Typography>
                        <CreatableSelect
                            id="sensortype"
                            label="Sensor Type"
                            value={sensorTypeValue}
                            onChange={handleChangeSensorType}
                            placeholder="Sensor Type"
                            isClearable
                            // isDisabled={false}
                            options={sensorTypeOptions}
                        />
                    </Grid>
                    <Grid item xs = {3}>
                        <br/>
                        <Button variant="contained" color="primary" onClick = {handleSubmit}>Fetch Data</Button>
                    </Grid>
                </Grid>


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