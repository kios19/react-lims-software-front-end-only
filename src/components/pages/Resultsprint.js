import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import bac from "../images/cover.png";

import {
  Layout,
  Menu,
  Icon,
  Col,
  Statistic,
  Divider,
  Timeline,
  Form,
  Descriptions,
  Input
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  List,
  Spin,
  Typography,
  Tree,
  Anchor,
  Button,
  Table
} from "antd";
import "../css/login.css";
import { Link } from "react-router-dom";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial
} from "react-awesome-button";
//import "react-awesome-button/dist/styles.css";
import Sides from "../ui/Sidebar.js";
import TextLoop from "react-text-loop";
import InfiniteScroll from "react-infinite-scroller";

const { Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;


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

            let a =0;
            this.setState({
                bars: this.state.bars.map(load =>{
                    load.results.map(item=>{
                        item.color = item.flag == "" ? 'https://img.icons8.com/color/48/000000/green-flag.png': 'https://img.icons8.com/color/48/000000/filled-flag.png'
                        item.textcolor = item.flag == "" ? '000000': '#FF0000'
                    return item                        
                    })
                    console.log('load', load.results)
                    return load
                })
            })

            this.setState({ barsresulttime: this.state.bars[0].resultTime });
            this.setState({ barsdeviceName: this.state.bars[0].deviceName });
            this.setState({ barspatientname: this.state.bars[0].patientName });
            this.setState({ barspatientno: this.state.bars[0].patient_no });
            this.setState({ barsresults: this.state.bars[0].results });

            console.log(this.state.barsresults);
          })
          .catch(console.log);
      }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Sides />

        <Content style={{ background: "#fff" }}>
        <div className="printa, raytraces" style={{ margin: '50px' }}>


<div className="printa" >
  <Text strong >Test Results</Text>
</div>
<img
  src={bac} style={{ width: '200px' }} /><br />
<div style={{ paddingLeft: '40px' }}><Text><b>Innolab Solutions</b></Text><br />
  <Text><b>Address: </b> &nbsp;&nbsp;Parklands Plaza</Text><br />
  <Text><b>Phone: </b> &nbsp;&nbsp;0714716733</Text><br />
  <Text><b>Email: </b> &nbsp;&nbsp;info@innolab.co.ke</Text><br />
  <br/>
  <br/>
  <Timeline>

    <Timeline.Item dot={<Icon type="reconciliation" style={{ fontSize: '16px' }} />} color="blue">Tested for {localStorage.getItem("restest")}</Timeline.Item>
    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
       Testing time {localStorage.getItem("restime")}
    </Timeline.Item>
    <Timeline.Item>Specimen was {localStorage.getItem("resspecimen")}</Timeline.Item>
  </Timeline>,
  
  </div>


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
              <Avatar src={item.color}/>
            }
            title={<a style={{color : item.textcolor}}>Flag</a>}
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

        </Content>
      </Layout>
    );
  }
}

const WrappedSupplier = Form.create({ name: "get_test" })(Supplier);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedSupplier;
