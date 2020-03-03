import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import "antd/dist/antd.css";
import bac from "../images/cover.png";
import {
  Col,
  Row,
  Card,
  List,
  Typography,
  Spin,
  Avatar,
  AutoComplete
} from "antd";
import InfiniteScroll from "react-infinite-scroller";

const { Text } = Typography;

class Supplier extends Component {
  state = {
    datas: [],
    ongoings: [],
    alls: [],
    uname: [],
    ppic: [],
    role: [],
    bars: [],
    barsbyname: [],
    barsbyemail: [],
    barsbyphone: [],
    barstimereceived: [],
    barsdevicename: [],
    barsspecimentype: [],
    barsresulttime: [],
    barsspecimenid: [],
    barsspecimenname: [],
    barstestgroup: [],
    barsspecimensource: [],
    barstimecompleted: [],
    barstimevalidated: [],
    barsorderid: [],
    barspatientname: [],
    barspatientno: [],
    barsunit: [],
    barsname: [],
    barsvalue: [],
    barsresults: [],
    avastyle: [],
    loading: true
  };

  state = { numPages: null, pageNumber: 1 };

  componentDidMount(){
    fetch("http://192.241.145.208:8890/lims/tests/getResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ testId: localStorage.getItem("resid")})
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars: data.payload });
        console.log(this.state.bars);

        /*this.setState({barsbyname: this.state.bars[0].done_by.name})
            this.setState({barsbyemail: this.state.bars[0].done_by.email})
            this.setState({barsbyphone: this.state.bars[0].done_by.phoneNumber})
            this.setState({barstimereceived: this.state.bars[0].time_received})
            
            this.setState({barsspecimentype: this.state.bars[0].specimenTime})
            
            this.setState({barsspecimenid: this.state.bars[0].specimenId})
            this.setState({barsspecimenname: this.state.bars[0].specimenName})
            this.setState({barstestgroup: this.state.bars[0].testGroup})
            this.setState({barsspecimensource: this.state.bars[0].specimenSource})
            this.setState({barstimecompleted: this.state.bars[0].time_completed})
            this.setState({barstimevalidated: this.state.bars[0].time_validated})
            this.setState({barsorderid: this.state.bars[0].orderId})*/
        this.setState({ barsresulttime: this.state.bars[0].resultTime });
        this.setState({ barsdeviceName: this.state.bars[0].deviceName });
        this.setState({ barspatientname: this.state.bars[0].patientName });
        this.setState({ barspatientno: this.state.bars[0].patient_no });
        this.setState({ barsresults: this.state.bars[0].results });
        /*this.setState({barsunit: this.state.bars[0].results[0].unit})
            this.setState({barsname: this.state.bars[0].results[0].name})
            this.setState({barsvalue: this.state.bars[0].results[0].value})
            
            */
        console.log(this.state.barsresults);
      })
      .catch(console.log);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {

    const { pageNumber, numPages } = this.state;
    return (
      <div className="printa, raytrace" style={{ margin: '50px' ,marginLeft:'200px',marginRight:'200px' }}>


        <div className="printa" >
          <Text strong >Test Results</Text>
        </div>
        <img
          src={bac} style={{ width: '200px' }} /><br />
        <div style={{ paddingLeft: '40px' }}><Text><b>Innolab Solutions</b></Text><br />
          <Text><b>Address: </b> &nbsp;&nbsp;Parklands Plaza</Text><br />
          <Text><b>Phone: </b> &nbsp;&nbsp;0714716733</Text><br />
          <Text><b>Email: </b> &nbsp;&nbsp;info@innolab.co.ke</Text><br /></div>


        <div className="" style={{ margin: "40px" }}>
          <List
            itemLayout="horizontal"
            dataSource={this.state.bars}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a>Patient Name</a>}
                  description={this.state.barspatientname}
                />

                <List.Item.Meta
                  title={<a>Device Name</a>}
                  description={this.state.barsdeviceName}
                />

                <List.Item.Meta
                  title={<a>Patient No</a>}
                  description={this.state.barspatientno}
                />

                <List.Item.Meta
                  title={<a>Result Time</a>}
                  description={this.state.barsresulttime}
                />
              </List.Item>
            )}
          />
        </div>




        <div style={{margin:'40px'}}> 
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            hasMore={true}
            useWindow={false}
          >
            <List
              dataSource={this.state.barsresults}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.icons8.com/color/48/000000/chemical-plant.png" />
                    }
                    title={<a>Unit</a>}
                    description={item.unit}
                  />

                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.icons8.com/color/48/000000/empty-flag.png" />
                    }
                    title={<a>Flag</a>}
                    description={
                      item.flag}
                  />

                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.icons8.com/color/48/000000/minimum-value.png" />
                    }
                    title={<a>Value</a>}
                    description={item.value}
                  />

                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.icons8.com/color/48/000000/filled-filter.png" />
                    }
                    title={<a>Parameter</a>}
                    description={item.parameter}
                  />

                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.icons8.com/color/48/000000/sort-up.png" />
                    }
                    title={<a>Uper Limit</a>}
                    description={item.uperLimit}
                  />

                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://img.icons8.com/color/48/000000/sort-down.png" />
                    }
                    title={<a>Lower Limit</a>}
                    description={item.lowerLimit}
                  />
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
      </div>




    );

  }
}


export default Supplier;
