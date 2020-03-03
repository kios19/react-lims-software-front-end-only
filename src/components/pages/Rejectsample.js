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
const { TextArea } = Input;
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

        console.log("Received values of form: ", values);

        const mary = {
            sampleCode:"samplecode",
            reason: values.comment,
            rejected:"1"
            
        }

        fetch("http://192.241.145.208:8890/lims/tests/updateSample?id="+sessionStorage.getItem("sid"), {
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
                
              if(String(this.state.bars.status).valueOf == 
              String(200).valueOf){
                  {message.success('Sample rejected', 10);}
                  window.history.back()
                  
              }
              if(!String(this.state.bars.status).valueOf == 
              String(200).valueOf){
                  {message.error('Sample Rejection error', 10);}

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
                      title="Reject sample"
                    
                      subTitle="cancel sample"
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
                    {getFieldDecorator("comment", {
                      rules: [
                        {
                          required: true,
                          message: "Who did Test"
                        }
                      ]
                    })(
                      <TextArea
                      className="raytrace"
                      rows={5}
                        prefix={
                          <Icon
                            type="carry-out"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Comment"
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
