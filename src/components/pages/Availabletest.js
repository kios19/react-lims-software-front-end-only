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
  AutoComplete,
  Table
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
const { Search } = Input;

class AddTest extends Component {
  state = {
      bars:[],
      alpheta:[]
  };

  logout = () => {
    localStorage.clear();
  };

  enterUser = () => {
    this.props.history.push("/user");
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
    const IconText = ({ type, text }) => (
        <span>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
        </span>
      );

      const columns = [
        {
          title: 'Unit',
          dataIndex: 'units',
          key: 'units',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Parameter',
          dataIndex: 'parameter',
          key: 'parameter',
        },
        {
          title: 'lowerLimit',
          dataIndex: 'lowerLimit',
          key: 'lowerLimit',
        },
        {
          title: 'upperLimit',
          dataIndex: 'upperLimit',
          key: 'upperLimit',
        },
      ];
      


      
    return (
      <Layout style={{ background: "#fff"  }}>
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
                <div>
                  <Button type="primary" onClick={()=>{
                    var printContents = document.getElementById('maku').innerHTML;
                    var originalContents = document.body.innerHTML;
                     document.body.innerHTML = printContents;
                     window.print();
                     document.body.innerHTML = originalContents
                  }}>
        Print
        <Icon type="printer" />
      </Button> &nbsp;&nbsp;
                
                
    <Search
      placeholder="input test name"
      onSearch={value => {
        fetch(
            "http://192.241.145.208:8890/lims/tests/getPrintForm?name="+value ,
            {
              method: "GET"
            }
          )
            .then(res => res.json())
            .then(data => {
      
              this.setState({bars: data.payload})

            })
            .catch(console.log);
      }
    
      }
      style={{ width: 200 , paddingRight:50}}
    ></Search>



                <img
                width="120px"
                src="https://image.flaticon.com/icons/svg/2194/2194346.svg"
                alt="content"
              />
              </div>
              ]}

                
              
            >


            </PageHeader>



                <div className="logdiv3" id="maku">
                
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={this.state.bars}
                    pagination={{
                        onChange: page => {
                          console.log(page);
                        },
                        pageSize: 12,
                      }}
                    renderItem={item => (
                          



<List.Item
key={item.description}
actions={[

]}
extra={
  <img
    width={102}
    alt="logo"
    src="https://image.flaticon.com/icons/svg/1038/1038840.svg"
  />
}
>
<p style={{display: "none"}}>{soph=item.printForm.replace(/[{}]/g, "").replace('[',"").replace(']',"").replace(/['"]+/g, '').replace(/,/g, '<br/>')}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/parameter/g,"<b>parameter</b>")}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/units/g,"<b>units</b>")}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/lowerLimit/g,"<b>lowerLimit</b>")}</p>
                           <p style={{display: "none"}}>{soph = soph.replace(/upperLimit/g,"<b>upperLimit</b>")}</p>
<List.Item.Meta
  avatar={<Avatar src='https://image.flaticon.com/icons/svg/123/123381.svg' />}
  title={<a href={item.description}>{item.description}</a>}
  description={"created at: "+item.date}
/>

<Table columns={columns} dataSource={JSON.parse(item.printForm)} size="middle" showHeader="true"  ></Table>
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
