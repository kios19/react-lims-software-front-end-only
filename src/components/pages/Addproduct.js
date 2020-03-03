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
  InputNumber,
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
  Popover,
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

const { Text } = Typography;

const { Meta } = Card;

const { SubMenu } = Menu;

const AutoCompleteOption = AutoComplete.Option;

class AddTest extends Component {
  logout = () => {
    localStorage.clear();
  };

  enterUser = () => {
    this.props.history.push("/user");
  };

  state = {
    datas: [],
    ongoings: [],
    alls: [],
    uname: [],
    ppic: [],
    role: [],
    bars:[],
    uname: [],
    alpheta:[],
    ppic: [],
    role: [],
    specid:[],
    nameid:[],
    tgroup:[],
    printid:[],
    avastyle: [],
    confirmDirty: false,
    autoCompleteResult: [],
    alpheta3:[],
    products:[],
    spinload3:[]
    
  };

  handleSubmit = e => {
    e.preventDefault();
    let status;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        fetch('http://192.241.145.208:8890/lims/inventory/product',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("key"),
            },
            body: JSON.stringify({
              "name": values.naem,
              "type": values.type,
              "units": values.units,
              "measure": values.measure,
              "cost": values.cost
            })
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({  bars: data})
         
          console.log("🌵 ",this.state.bars.message)
          if(String(this.state.bars.message).valueOf == 
              String("success").valueOf){
                  this.setState({loading:false})
                  this.setState({iconLoading:false})
                  {message.success('Supplier Successfully saved', 10);}
                  this.props.history.push('/inventory/addproducts')
                  console.log("saved")
                  
              }else{
                message.error("Error saving product")
              }
              
        })


      }
    });
  };




  //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  componentDidMount() {
    fetch("http://192.241.145.208:8890/lims/inventory/productTypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data.payload });

        this.state.products.map(majina => {
          //console.log("printform ðŸ ", majina.name);
          this.state.alpheta3.push(majina.name);
          this.setState({ spinload3: false });
        });

        //console.log("ðŸ¥œ ", this.state.alpheta);
      })
      .catch(console.log);

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const openNotification = () => {
      notification.open({
        message: "Ahem",
        description: "Hey there, I see you havent crosschecked yet",
        onClick: () => {
          console.log("Notification Clicked!");
        }
      });
    };
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
              title="Add Product"
            
              subTitle="new product"
              extra={[


              ]}
            >

            </PageHeader>
                <div className="logdiv3">
                  <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Spin spinning={this.state.spinload3}>
                    <Form.Item label="Product Type">
                    <Popover
                      content={
                        <div className="logdivspace">
                          <Button onClick={()=>this.props.history.push('/inventory/products/typis')}>Add Product Type</Button>
                        </div>
                      }
                      title="Helper"
                    >
                      {getFieldDecorator("type", {
                        rules: [
                          {
                            required: false,
                            message: "Please input your Doctor id!"
                          }
                        ]
                      })(
                        <Select
                          className="raytrace"
                          showSearch
                          //style={{ width: 400 }}
                          placeholder="Select a Product type"
                          optionFilterProp="children"
                          onChange={this.onchanger}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.state.alpheta3.map(team => (
                            <option key={team} value={team}>
                              {team}
                            </option>
                          ))}
                        </Select>
                      )}
                      </Popover>
                    </Form.Item>
                  </Spin>
                    <Form.Item label="Name">
                      {getFieldDecorator("naem", {
                        initialValue:this.state.nameid,
                        rules: [
                          {
                            required: true,
                            message: "Please input Test Name"
                          }
                        ]
                      })(<Input className="raytrace" />)}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          Units&nbsp;



                        </span>
                      }
                    >
                      {getFieldDecorator("units", {
                        rules: [
                          {
                            required: true,
                            message: "Please input Unit",
                            whitespace: true
                          }
                        ]
                      })(<Input className="raytrace"/>)}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          Measure&nbsp;

                        </span>
                      }
                    >
                      {getFieldDecorator("measure", {
                        rules: [
                          {
                            required: true,
                            message: "Please input measure!",
                            whitespace: true
                          }
                        ]
                      })(<Input className="raytrace"/>)}
                    </Form.Item>

                    <Form.Item
                      style={{ width: "400px" }}
                      label={
                        <span>
                          Cost&nbsp;

                        </span>
                      }
                    >
                      {getFieldDecorator("cost", {
                        initialValue:0,
                        
                      })(<InputNumber className="raytrace"/>)}
                    </Form.Item>


                      
                    <Form.Item {...tailFormItemLayout}
                    >
                      
                      <Button className="raytrace" type="primary" htmlType="submit" style={{width: 270}}>
                        Save Product
                      </Button>
                    </Form.Item>
                    
                  </Form>
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
