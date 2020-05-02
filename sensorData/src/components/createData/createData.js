import React, {useEffect} from "react";
import Button from '@material-ui/core/Button/Button';
import DenseAppBar from "../headers/headeres";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Snackbars from "../common/message";

import { axiosInstance } from "../../helpers/axios"
import {useForm} from "react-hook-form";

export default function CreateData(props) {

    const [snackbar, setSnackbar] = React.useState(false)
    const [snackbarType, setSnackbarType] = React.useState("success")
    const [snackbarMsg, setSnackbarMsg] = React.useState("");

    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        data['timeStamp'] = String(Date.parse(data['timeStamp'])).slice(0,10)
        // data['timeStamp'] = "1511161234"
        console.log(data)
        submitData(data);
    }

    useEffect(() => {
        // console.log(Date.parse())
    }, [])

    async function submitData(data){
        const result = await axiosInstance.post(
            "/dataops/createdata/",
            JSON.stringify(data)
        ).then(function(result){
            console.log(result.data.message)
            setSnackbarMsg(result.data.message)
            setSnackbar(true)
        })
        
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
                <p>Enter Sensor data in following format:</p>
                <ul>
                    <li>Reading (type:double)</li>
                    <li>timestamp (type:long)</li>
                    <li>sensorType (type:string)</li>
                </ul>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Reading:</label>
                        <input ref={register} name="reading" placeholder="Enter Reading"/> 
                    </div>
                    <div>
                        <label>Time Stamp:</label>
                        <input ref={register} name="timeStamp" type= "datetime-local"  placeholder="Enter Time Stamp"/> 
                    </div>
                    <div>
                        <label>Sensor Type:</label>
                        <input ref = {register} name="sensorType" placeholder="Enter sensor type"/> 
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}