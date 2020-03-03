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
  Popover,
  Icon,
  Col,
  notification,
  Spin,
  Badge,
  Button,
  Tooltip,
  Typography
} from "antd";
import {
  Avatar,
  Card,
  Row,
  Select,
  Steps,
  PageHeader,
  Drawer,
  Form,
  Divider,
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
import tickAudio from '../sounds/accomplished.mp3'
import tockAudio from '../sounds/serious-strike.mp3'

const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
const { Step } = Steps;
const success = () => {
  message.success("Order Successfully saved", 10);
};
const { Option } = Select;

class Order extends Component {
  state = {
    uname: [],
    ppic: [],
    alpheta: [],
    alpheta2: [],
    alpheta3: [],
    bars: [],
    barsa: [],
    bars2: [],
    role: [],
    avastyle: [],
    loading: true,
    patid: [],
    spinload: true,
    spinload2: true,
    spinload3: true,
    uid: [],
    animationtype: "wait",
    animationcontent: orb,
    blocksname: [],
    blocksgender: [],
    blocksno: [],
    blockphone: [],
    blockmail: [],
    blockaddress: [],
    blockregd: [],
    blocklast: [],
    blockdob: [],
    blockpatid: [],
    blockage: [],
    badger: "waiting",
    badgerstat: "default",
    badges: "",
    stepper: 0,
    doctors: [],
    visible: false,
    visible2:false,
    doso: false
  };

  onChange = value => {
    //console.log("ðŸ‘™ ",value);

    fetch("http://192.241.145.208:8890/lims/patients/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("key")
      },
      body: JSON.stringify({
        name: value
      })
    })
      .then(res => res.json())
      .then(data => {
        //ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯
        this.setState({ animationtype: "Untitled" });
        this.setState({ bars: data });
        this.setState({ patid: data.payload[0].id });
        //console.log("ðŸš‘ ",this.state.patid)
        
      })
      .catch(console.log);
  };

  onchanger = value => {
    this.setState({ stepper: 1 });
    //console.log("🤟" ,this.state.stepper)
  };

  onchanger2 = value => {
    this.setState({ stepper: 2 });
    //console.log("🤟" ,this.state.stepper)
  };
  over = value => {
    this.setState({ visible: true });
  };

  over2 = value => {
    this.props.history.push("/test/addprint")
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values.name);

        fetch("http://192.241.145.208:8890/lims/patients/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("key")
          },
          body: JSON.stringify({
            name: values.name
          })
        })
          .then(res => res.json())
          .then(data => {
            //ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯ðŸš¯
            this.setState({ animationtype: "Untitled" });
            this.setState({ bars: data });
            console.log(this.state.bars);
            this.setState({ blocksname: data.payload[0].name });
            console.log("name", this.state.blocksname);
            this.setState({ blockpatid: data.payload[0].id });
            this.setState({ blocksgender: data.payload[0].sex });
            this.setState({ blocksno: data.payload[0].patientNo });
            this.setState({ blockphone: data.payload[0].phone });
            this.setState({ blockmail: data.payload[0].email });
            this.setState({ blockaddress: data.payload[0].address });
            this.setState({ blockregd: data.payload[0].regDate });
            this.setState({ blocklast: data.payload[0].lastupdate });
            this.setState({ blockdob: data.payload[0].dob });
            this.setState({ blockage: data.payload[0].age });
            this.setState({ spinload: false });
            this.setState({ badgerstat: "success" });
            this.setState({ badges: data.payload.length });
          })
          .catch(console.log);
      }
    });
  };

  handlePat = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        fetch("http://192.241.145.208:8890/lims/patients/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("key")
          },
          body: JSON.stringify({
            name: values.firstname,
            age: values.age,
            sex: values.sex,
            phone: values.phone,
            email: values.email,
            address: values.address
          })
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ bars: data });
            console.log("🌵 ", this.state.bars.message);
            if (
              String(this.state.bars.message).valueOf ==
              String("success").valueOf
            ) {
              this.setState({ loading: false });
              this.setState({ iconLoading: false });
              {
                message.success("Patient Successfully saved", 10);
              }
            }
          });
      }
    });
  };



  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ animationtype: "squats" });
        console.log("Received values of form: ", values);

        const mary = {
          patientId: this.state.blockpatid,
          doctorName: values.doctorid,
          userId: localStorage.getItem("uid"),
          tests: values.test
        };
        //console.log("ðŸ‘§ ",mary)
        fetch("http://192.241.145.208:8890/lims/tests/addOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(mary)
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ barsa: data });
            console.log("🦀 ", this.state.barsa);

            if (
              String(this.state.barsa.status).valueOf == String(200).valueOf
            ) {
              var audio = new Audio(tickAudio)
              audio.play()
              notification.open({
                message: this.state.barsa.message,
                description: this.state.barsa.error
              });
              this.props.history.push("/requests")
            } else {
              var audio = new Audio(tockAudio)
              audio.play()
              notification.open({
                message: this.state.barsa.message,
                description: this.state.barsa.error
              });
            }
          })
          .catch(console.log);
      }
    });
  };

  componentDidMount() {
    this.setState({ uid: localStorage.getItem("uid") });
    //console.log("ðŸ§ "+localStorage.getItem("uid"))

    fetch("http://192.241.145.208:8890/lims/tests/getTestSetup", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars2: data.payload });

        this.state.bars2.map(majina => {
          //console.log("printform ðŸ ", majina.name);
          this.state.alpheta2.push(majina.name);
          this.setState({ spinload2: false });
        });

        //console.log("ðŸ¥œ ", this.state.alpheta);
      })
      .catch(console.log);

    fetch("http://192.241.145.208:8890/lims/tests/getPhysicians", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ doctors: data.payload });

        this.state.doctors.map(majina => {
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
    const { form } = this.props;
    const mist = "slu";
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


    return (
      <Layout style={{ background: "#fff" }}>
        <Sides />
        <Layout style={{ background: "#fff" }}>
          <Header style={{ background: "#fff", padding: 0 }} />



          <Drawer
            title="Add new Patient"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Form layout="vertical" onSubmit={this.handlePat}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Name">
                    {getFieldDecorator("name", {
                      rules: [
                        { required: false, message: "Please enter user name" }
                      ]
                    })(<Input placeholder="Please enter user name" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Age">
                    {getFieldDecorator("age", {
                      rules: [{ required: false, message: "Please enter age" }]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        //addonBefore="http://"
                        //addonAfter=".com"
                        placeholder="Please enter age"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Phone">
                    {getFieldDecorator("phone", {
                      rules: [
                        { required: false, message: "Please Enter Phone" }
                      ]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        //addonBefore="http://"
                        //addonAfter=".com"
                        placeholder="Please enter phone"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Gender">
                    {getFieldDecorator("gender", {
                      rules: [
                        { required: false, message: "Please choose gender" }
                      ]
                    })(
                      <Select placeholder="Please choose the type">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    {getFieldDecorator("email", {
                      rules: [
                        { required: false, message: "Please enter email" }
                      ]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        //addonBefore="http://"
                        //addonAfter=".com"
                        placeholder="Please enter email"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Address">
                    {getFieldDecorator("address", {
                      rules: [
                        { required: false, message: "Please enter address" }
                      ]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        //addonBefore="http://"
                        //addonAfter=".com"
                        placeholder="Please enter address"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #e9e9e9",
                  padding: "10px 16px",
                  background: "#fff",
                  textAlign: "right"
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.onClose} type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Drawer>

          <Content style={{ background: "#fff" }}>
            <div style={{ background: "#fff", padding: "30px" }}>
              <div className="dud" style={{ background: "#fff" }}>
                <Row>
                  <Col span={10}>
                  <PageHeader
                  onBack={() => window.history.back()}
                  title="Order"
                
                  subTitle="place order"
                  extra={[


                  ]}
                >

                </PageHeader>
                  </Col>
                </Row>
                <Steps size="small" current={this.state.stepper} style={{paddingLeft: 360, paddingRight: 360}}>
                  <Step title="Select Doctor" />
                  <Step title="Select tests" />
                  <Step title="Search for patient" />
                </Steps>
              </div>

              <div className="logdiv3">
                <Form
                  layout="inline"
                  onSubmit={this.handleSearch}
                  className="login-form"
                >
                  <Form.Item>
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: false,
                          message: "Please input your search name!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="search"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Patient Name"
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    <Popover
                      content={
                        <div className="logdivspace">
                          <Button onClick={this.over}>Add Patient</Button>
                        </div>
                      }
                      title="Helper"
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Search
                      </Button>
                    </Popover>
                  </Form.Item>
                </Form>
              </div>

              <div style={{ background: "#fff" }} className="logdiv3">
                <Form onSubmit={this.handleSubmit}>
                  <Divider orientation="left" className="first">
                    Select Doctor
                  </Divider>
                  <Spin spinning={this.state.spinload3}>
                    <Form.Item label="Doctor">
                      {getFieldDecorator("doctorid", {
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
                          style={{ width: 400 }}
                          placeholder="Select a Doctor"
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
                    </Form.Item>
                  </Spin>

                  <Form>
                    <Divider orientation="left" className="first">
                      Test
                    </Divider>
                    <Spin spinning={this.state.spinload2}>
                      <DynamicFields
                        {...form}
                        name="test"
                        initialValue="select"
                        fields={[
                          {
                            name: "test",
                            field: () => (
                              <Popover
                                content={
                                  <div className="logdivspace">
                                    <Button onClick={this.over2}>
                                      Add New Test
                                    </Button>
                                  </div>
                                }
                                title="Helper"
                              >
                                <Select
                                  className="raytrace"
                                  showSearch
                                  style={{ width: 400 }}
                                  placeholder="Select a Test"
                                  optionFilterProp="children"
                                  onChange={this.onchanger2}
                                  filterOption={(input, option) =>
                                    option.props.children
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {this.state.alpheta2.map(team => (
                                    <option key={team} value={team}>
                                      {team}
                                    </option>
                                  ))}
                                </Select>
                              </Popover>
                            )
                          }
                        ]}
                      />
                    </Spin>
                  </Form>

                  <Divider orientation="left" className="first">
                    Patient Details
                  </Divider>

                  <Spin spinning={this.state.spinload}>
                    <Form.Item label="Patient name">
                      <Badge
                        count={this.state.badges}
                        status={""}
                        style={{
                          backgroundColor: "#fff",
                          color: "#999",
                          boxShadow: "0 0 0 1px #d9d9d9 inset"
                        }}
                      >
                        <Icon type="user" style={{ paddingRight: 20 }} />
                        <b>{this.state.blocksname}</b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </Badge>
                    </Form.Item>

                    <Form.Item label="Patient ID">
                      <Badge
                        status={""}
                        style={{
                          backgroundColor: "#fff",
                          color: "#999",
                          boxShadow: "0 0 0 1px #d9d9d9 inset"
                        }}
                      >
                        <Icon type="idcard" style={{ paddingRight: 20 }} />
                        <b>{this.state.blockpatid}</b>&nbsp;&nbsp;
                      </Badge>
                    </Form.Item>
                  </Spin>

                  <Form.Item>
                    <Button
                      className="raytrace"
                      style={{ width: 400 }}
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

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Order);

export default WrappedNormalLoginForm;
