import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button/Button';
import DenseAppBar from "../headers/headeres";
import Snackbars from "../common/message";
import MUIDataTable from "mui-datatables";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import CreatableSelect from "react-select/creatable";
import StatisticBlock from "./statistics";
import ChartView from "./chartView";
import { axiosInstance } from "../../helpers/axios"

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
    const [sensorTypeValue, setSensorTypeValue] = useState("");
    const [sensorTypeOptions, setSensorTypeOptions] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [message, setMessage] = useState("");
    const [displayFlag, setDisplayFlag] = useState(false);
    const [chartSensorTypeValue, setChartSensorTypeValue] = useState(false);
    const [snackbar, setSnackbar] = React.useState(false);
    const [snackbarType, setSnackbarType] = React.useState("warning");
    const [snackbarMsg, setSnackbarMsg] = React.useState("");

    const columns = ["Reading", "Timestamp", "Sensor Type"];

    const options = {
        filterType: 'checkbox',
    };

    // API to get Initial data when page loads fetching unique sensor type list to be given as dropdown to user
    async function fetchInitialSensorTypeList() {
        let dataArr = []
        let sensorTypeData = []
        const result = await axiosInstance.get(
            "/dataops/getinitialresults/"
        ).then(function (result) {
            result.data.sensorTypeList.map(sensorType => {
                sensorTypeData.push({ label: sensorType, value: sensorType })
            })
            setSensorTypeOptions(sensorTypeData)
        });
    }

    //To handle Sensor type dropdown value change and update 'sensorTypeValue' variable accordingly which will be used as parameter in fetchresults API request
    const handleChangeSensorType = e => {
        if (e == null) {
            setSensorTypeValue({ label: "", value: "" })
        }
        else {
            setSensorTypeValue({ label: e.value, value: e.value })
        }

    }

    //To handle From date timestamp value change and update 'fromDate' variable accordingly which will be used as parameter in fetchresults API request
    const handleFromDateChange = e => {
        setFromDate(e.target.value)
    }

    //To handle To date timestamp value change and update 'toDate' variable accordingly which will be used as parameter in fetchresults API request
    const handleToDateChange = e => {
        setToDate(e.target.value)
    }

    //When Fetch Data button is clicked, prepare all data to be sent with fetchresults API and call API
    function handleSubmit() {
        let dataFilter = {}
        dataFilter['fromDate'] = String(Date.parse(fromDate)).slice(0,10)
        dataFilter['toDate'] = String(Date.parse(toDate)).slice(0,10)
        dataFilter['sensorType'] = sensorTypeValue['label']
        
        fetchSensorData(dataFilter) 
    }

    //Call API with filter paramenter to fetch sensor data results
    async function fetchSensorData(dataFilter){
        let dataArr = []
        var resultData = await axiosInstance.get(
            "/dataops/fetchresults/?startDate="+ 
            dataFilter['fromDate'] + 
            "&endDate="+ dataFilter['toDate'] +
            "&sensorType="+ dataFilter['sensorType']
        ).then(function(resultData){
            resultData.data.fetchResults.map(record => {
                dataArr.push([record['reading'], record['timestamp'], record['sensorType']])
            })

            setSensorData(dataArr);                                                             //Set the response data from API to 'sensorData' variable which be used for table, graph and statistics component
            setMessage("Sensor Data " + resultData.data.message);                               //Set the message to be displayed on table
            setValuesTableChart()                                                               //Condition check to render table and chart only for given sensor type  and necesary values 

        });
     }

     //Set values to be passed to Chart component  and render condition check for table and chart
     function setValuesTableChart(){
        if(sensorTypeValue['label'] !== "" && sensorTypeValue['label'] !== undefined){
            setDisplayFlag(true)
            setChartSensorTypeValue(sensorTypeValue['label'])
            }
        else{
            setDisplayFlag(false)
            setSnackbarMsg("Please choose a sensor type") 
            setSnackbar(true);   
        }
     }

    useEffect(() => {
        fetchInitialSensorTypeList();
        // setFilterData()
    }, [])
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
                <Grid container spacing={4} style={{ margin: "auto" }}>
                    <Grid item xs={3}>
                        <Typography
                            variant="h6"
                            component="h6"
                            className={classes.typography_class}
                        >
                            From Date Timestamp
                        </Typography>
                        <input name="timeStamp" type="date" placeholder="Enter Time Stamp" onChange={handleFromDateChange} style={{padding:"4px", borderRadius:"5px"}}/>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            variant="h6"
                            component="h6"
                            className={classes.typography_class}
                        >
                            To Date Timestamp
                        </Typography>
                        <input name="timeStamp" type="date" placeholder="Enter Time Stamp" onChange={handleToDateChange} style={{padding:"4px", borderRadius:"5px"}}/>
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

                <Grid container spacing={4} style={{ margin: "auto" }}>
                    <Grid item xs={6}>
                       {displayFlag ?
                        <MUIDataTable
                            title={message}
                            data={sensorData}
                            columns={columns}
                            options={options}
                        />
                        :""} 
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={4} style={{ margin: "auto" }}>
                        {displayFlag ?
                            <div>
                                <Grid item xs={12}>
                                    <StatisticBlock sensorData = {sensorData}/>  
                                </Grid>
                                <Grid item xs={12}>
                                
                                    <ChartView sensorType = {chartSensorTypeValue} sensorData = {sensorData}/>  
                                    
                                </Grid>
                            </div>
                        : ""}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}