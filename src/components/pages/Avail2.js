import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import {
  Layout,
  Menu,
  Icon,
  Col,
  Statistic,
  Divider,
  Timeline,
  Input,
  Tooltip,
  Cascader,
  Checkbox,
  AutoComplete
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  Typography,
  Tree,
  List,
  Anchor,
  Spin,
  message,
  Select,
  Button,
  Form,
  notification
} from "antd";
import "../css/login.css";
import { Link } from "react-router-dom";
import Sides from "../ui/Sidebar.js";


const { Header, Content, Footer, Sider } = Layout;


class AddTest extends Component {
  logout = () => {
    localStorage.clear();
  };

  enterUser = () => {
    this.props.history.push("/user");
  };

  state = {
      bars:[],
      alpheta:[]
  };





  
  componentDidMount() {
    fetch(
        "http://192.241.145.208:8890/lims/tests/getPrintForm" ,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(data => {
  
          this.setState({bars: data.payload})
          //console.log("✈  ", this.state.bars.printForm);

          //🖨🖨🖨🖨🖨🖨🖨🖨🖨🖨🖨🖨
        const kiss =this.state.bars
        //console.log("kiss 🍏 ", kiss)
        var myStringArray = ["Hello","World"];
        var arrayLength = kiss.length;
        //for (var i = 0; i < arrayLength; i++) {
           // console.log("kiss 🍏 ",JSON.parse(kiss[i].printForm));
            //var kus = JSON.parse(kiss[i].printForm)
            //let myJson = {
                //"name" : "sam"
              //}
            //kus.push(myJson)
            //console.log("kus",kus)
            //var kuslen =  kus.length
            //for (var i=0; i < kuslen; i++){
               // console.log("kuss 🍏 ",kus[i].parameter)
            //}
            //Do something
        //}

          //this.state.bars.map(printform => {
            //console.log("printform 🍏 ", printform.description);
            //this.state.alpheta.push(printform.description);
           // console.log("printform 🍏 ",JSON.parse(printform.printForm)[0].parameter)
          //});

          //console.log("🥜 ", this.state.alpheta);
        })
        .catch(console.log);
  }

  render() {
    var kis;
    var soph;
    var fay;
    return (
      <Layout style={{ background: "#fff" }}>
       <Sides/>

        <Layout style={{ background: "#fff" }}>
          <Header style={{ background: "#fff" }} />
          <Content style={{}}>
            <div style={{ background: "#fff" }}>
              <div >
              <PageHeader
              onBack={() => window.history.back()}
              title="Available Tests"
            
              subTitle="tests offered"
              extra={[
              ]}
            >

            </PageHeader>

                <div className="logdiv3">
                  
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.state.bars}
                    pagination={{
                        onChange: page => {
                          console.log(page);
                        },
                        pageSize: 12,
                      }}
                    renderItem={item => (
                          
                    <List.Item>
                  
                        
                        <Card title={item.description} className="raytrace" >
                      
                           <p style={{display: "none"}}>{soph=item.printForm.replace(/[{}]/g, "").replace('[',"").replace(']',"").replace(/['"]+/g, '').replace(/,/g, '<br/>')}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/parameter/g,"<b>parameter</b>")}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/units/g,"<b>units</b>")}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/lowerLimit/g,"<b>lowerLimit</b>")}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/upperLimit/g,"<b>upperLimit</b>")}</p>

                           <div onClick={console.log(item.description)} dangerouslySetInnerHTML={{__html: soph}} />
                        <p style={{display: "none"}}><b>Parameter : </b>{JSON.parse(item.printForm)[0].parameter}<br/></p>
                        <p style={{display: "none"}}><b>Units : </b>{JSON.parse(item.printForm)[0].units}<br/></p>
                        <p style={{display: "none"}}><b>Lower Limit : </b>{JSON.parse(item.printForm)[0].lowerLimit}<br/></p>
                        <p style={{display: "none"}}><b>Upper Limit : </b>{JSON.parse(item.printForm)[0].upperLimit}<br/></p>
                        </Card>
                    </List.Item>
                    )}
                />,
  
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const WrappedAddTest = Form.create({ name: "addtest" })(AddTest);

export default WrappedAddTest;
