import React, { Component, useState,useEffect } from "react";
import { CSVLink } from "react-csv";

class AsyncCSV extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading: false,
            date: ""
        }
        this.csvLinkEl = React.createRef();
        this.headers = [
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
        ]
    }

    getGpsList = () => {
        //'http://143.198.157.93:3857/rover/where?INPUT_SW_ID=1234&LIMIT=1430'
        //'http://143.198.157.93:3857/rover/where?DATE=2022-02-24'
        return fetch('http://143.198.157.93:3857/rover/where?DATE=' + this.props.date).then(res => res.json());
    }

    downloadGPS = async () => {
        
        this.setState({ loading: true});


        const data = await this.getGpsList();
        //console.log(data)
        this.setState({ data: data, loading: false }, () => {
            setTimeout(() => {
                this.csvLinkEl.current.link.click();
            }
            );
            
        });
        
    }

    render() {
        const {data, loading} = this.state;
        return <div>

            <button
                type="button" class="btn btn-secondary col-6"
                onClick={this.downloadGPS}
                disabled={loading}
                >
                 {loading? "Packaging..." : "Package" }
                </button>
            <CSVLink 
                headers={this.headers}
                data={data}
                filename={this.props.date +".csv"}
                ref={this.csvLinkEl}
            />
        </div>
    }
}

export default AsyncCSV;