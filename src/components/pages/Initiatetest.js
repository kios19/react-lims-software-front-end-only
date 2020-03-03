import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import {
  DatePicker,
  Input,
  Layout,
  Menu,
  Icon,
  Col,
  Spin,
  Popover,
  Button,
  Typography
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  notification,
  Form,
  Divider,
  Checkbox,
  message
} from "antd";
import "../css/login.css";
import Chart from "react-apexcharts";
import { cpus } from "os";
import { Link } from "react-router-dom";
import pop from "../images/prop2.png";
import Highlighter from "react-highlight-words";
import Sides from "../ui/Sidebar.js";
import DynamicFields from "../ui/DynamicFields";

import orb from "../images/boy.flr";

const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
const success = () => {
    message.success('Order Successfully saved', 10);
  };



class Initiate extends Component {
  state = {
    uname: [],
    ppic: [],
    bars:[],
    role: [],
    avastyle: [],
    loading: true,
    animationtype:"wait",
    animationcontent:orb,
    trut:0
  };

  onChange = e => {
    this.setState({trut:"1"})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.setState({animationtype:"squats"})
        console.log("Received values of form: ", values);

        const mary = {
            deviceId:values.deviceid,
            id: values.testid,
            isDevice:this.state.trut,
            done_by:values.testid
        }

        fetch("http://192.241.145.208:8890/lims/tests/initiateTest", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mary)
          })
            .then(res => res.json())
            .then(data => {
              this.setState({ bars: data });
              console.log("🔋 ",this.state.bars)
                
              /*if(String(this.state.bars.status).valueOf == 
              String(200).valueOf){
                  {message.success('Order Successfully saved', 10);}
              }*/

              if(String(this.state.bars.status).valueOf == 
              String(403).valueOf){
                notification.open({
                  message: 'Ooops....',
                  description:this.state.bars.error,
                  icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
                });
              }
            })
            .catch(console.log);
        }
      
    });
  };

  //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  componentDidMount() {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props;

    return (
      <Layout style={{ background: "#fff" }}>
        <Sides />
        <Layout style={{ background: "#fff" }}>
          <Header style={{ background: "#fff", padding: 0 }} />

          <Content style={{ background: "#fff" }}>
            <div style={{ background: "#fff", padding: "30px" }}>
              <div className="dud" style={{ background: "#fff" }}>
                  <Row>
                      <Col span={10}>
                      <PageHeader
                      onBack={() => window.history.back()}
                      title="Test initialize"
                    
                      subTitle="manually initiate test"
                      extra={[


                      ]}
                    >

                    </PageHeader>
                </Col>
                <Col span={8}>
                </Col>
                </Row>
              </div>

              <div style={{ background: "#fff" }} className="logdiv3">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator("deviceid", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Device Id!"
                        }
                      ]
                    })(
                      <Input
                      className="raytrace"
                        prefix={
                          <Icon
                            type="tablet"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Device id"
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("testid", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Test id!"
                        }
                      ]
                    })(
                      <Input
                      className="raytrace"
                        prefix={
                          <Icon
                            type="solution"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Test id"
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox onChange={this.onChange}>Is device</Checkbox>)}
                    </Form.Item>

                    <Form.Item>
                    {getFieldDecorator("doneby", {
                      rules: [
                        {
                          required: true,
                          message: "Who did Test"
                        }
                      ]
                    })(
                      <Input
                      className="raytrace"
                        prefix={
                          <Icon
                            type="carry-out"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Done by"
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    <Button
                    className="raytrace"
                    style={{width: 400}}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Initiate);

export default WrappedNormalLoginForm;
