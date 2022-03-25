import React, { Component, useState,useEffect } from "react";
import { CSVLink } from "react-csv";

//accepts props from navla page
const AsyncCSV = (props) => {
    const now = new Date();
    const [data,setData] = useState();
    const [loading, setLoading] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [date, setDate] = useState('2022-02-24');
    const headers = [
            {label: 'INPUT_SW_ID', key: 'INPUT_SW_ID'},
            {label: 'LATITUDE', key: 'LATITUDE'},
            {label:'LONGITUDE', key: 'LONGITUDE'},
            {label: 'DATE', key: 'DATE'},
            {label: 'SLOPE_X', key: 'SLOPE_X'},
            {label: 'SLOPE_Y', key: 'SLOPE_Y'},
            {label: 'SRID', key: 'SRID'},
            {label: 'TIME', key: 'TIME'},
            {label: 'X_AXIS_TEMP', key: 'X_AXIS_TEMP'},
            {label: 'Y_AXIS_TEMP', key: 'Y_AXIS_TEMP'},
            {label: 'SPEED', key: 'SPEED'}
    ];
    const csvLink = React.useRef();
    const [check, setCheck] = useState(false);

    //function that handles request
     const getGpsList = () => {
         //'http://143.198.157.93:3857/rover/where?INPUT_SW_ID=1234&LIMIT=1430'
        //'http://143.198.157.93:3857/rover/where?DATE=2022-02-24'
        return fetch('http://143.198.157.93:3857/rover/where?DATE=2022-02-24' + props.date).then(res => res.json());       
    }
    
    //function that requests and saves the data also activating the csvlink to be downloaded
    const downloadGPS = async () => {
        setLoading(true);

        const data = await getGpsList();
        //console.log(data)
        setData(data);
        setLoading(false);
        setCheck(true);
        setTimeout(() => {
            csvLink.current.link.click();
            setCheck(false);
          });
        
    }

    useEffect(() => {
        //validates date to be correct
        if (props.date.length === 10 && parseInt(props.date.substring(0,4)) > 2000 && 
            parseInt(props.date.substring(0,4)) <= now.getFullYear() &&
            parseInt(props.date.substring(5,7)) >= 1 &&
            parseInt(props.date.substring(5,7)) <= 12 &&
            parseInt(props.date.substring(8,10)) >= 1 &&
            parseInt(props.date.substring(8,10)) <= 31
            ){
            setIsFormValid(true);
        }
        else {
            setIsFormValid(false);
        }

    },[props.date]);

    return (
        <div>
            <button
                type="button" class="btn btn-secondary col-6"
                 onClick={downloadGPS}
                 disabled={!isFormValid}
                 >
                {loading? "Packaging..." : "Package" }
                 </button>
            {check ?
                <CSVLink 
                headers={headers}
                data={data}
                filename={props.date +".csv"}
                ref={csvLink}
                />
            : undefined }
             
         </div>
    );

}

export default AsyncCSV;
