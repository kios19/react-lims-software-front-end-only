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
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        fetch('http://192.241.145.208:8890/lims/inventory/supplier',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("key"),
            },
            body: JSON.stringify({
              "name": values.naem,
              "contactperson": values.cperson,
              "email": values.email,
              "contact": values.phone,
              "address": values.address
            })
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ bars: data})
          console.log("🌵 ",this.state.bars.message)
          if(String(this.state.bars.message).valueOf == 
              String("success").valueOf){
                  this.setState({loading:false})
                  this.setState({iconLoading:false})
                  {message.success('Supplier Successfully saved', 10);}
                  this.props.history.push('/inventory/addsupplier')
              }
        })


      }
    });
  };




  //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  componentDidMount() {


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
              title="Add Supplier"
            
              subTitle="create supplier profile"
              extra={[


              ]}
            >

            </PageHeader>

                <div className="logdiv3">
                  <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                    <Form.Item label="Name">
                      {getFieldDecorator("naem", {
                        initialValue:this.state.nameid,
                        rules: [
                          {
                            required: true,
                            message: "Please input Test Name"
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          Contact Person&nbsp;



                        </span>
                      }
                    >
                      {getFieldDecorator("cperson", {
                        rules: [
                          {
                            required: true,
                            message: "Please input Contact Person",
                            whitespace: true
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          Email&nbsp;

                        </span>
                      }
                    >
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            required: true,
                            message: "Please input mail!",
                            whitespace: true
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item
                      style={{ width: "400px" }}
                      label={
                        <span>
                          Contact&nbsp;

                        </span>
                      }
                    >
                      {getFieldDecorator("phone", {
                        initialValue:this.state.tgroup,
                        rules: [
                          {
                            required: true,
                            message: "Please input TestGroup!",
                            whitespace: true
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item
                      label={
                        <span>
                          Address&nbsp;

                        </span>
                      }
                    >
                      {getFieldDecorator("address", {
                        initialValue:this.state.specid,
                        rules: [
                          {
                            required: true,
                            message: "Please input Address!",
                            whitespace: true
                          }
                        ]
                      })(<Input />)}
                    </Form.Item>


                      
                    <Form.Item {...tailFormItemLayout}
                    >
                      
                      <Button type="primary" htmlType="submit" style={{width: 270}}>
                        Save Supplier
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
