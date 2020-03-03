import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import {
  Typography,
  DatePicker,
  Input,
  Layout,
  Menu,
  Col,
  Spin,
  notification,
  Form,
  InputNumber,
  Button,
  Icon
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  Table,
  Divider,
  Tag,
  AutoComplete,
  Tabs,
  Descriptions,
  Badge
} from "antd";
import "../css/login.css";
import Chart from "react-apexcharts";
import { cpus } from "os";
import { Link } from "react-router-dom";
import orb from "../images/swing.flr";
import FlareComponent from "flare-react";
import Sides from "../ui/Sidebar.js";

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Text } = Typography;
const { SubMenu } = Menu;
const { Meta } = Card;

class Patientinfo extends Component {

    logout = () => {
    localStorage.clear();
    };

    enterUser = () => {
    this.props.history.push("/user");
    };
  state = {
    expand: false,
    bars: [],
    blocksname: [],
    blocksgender: [],
    blocksno: [],
    blockphone: [],
    blockmail: [],
    blockaddress: [],
    blockregd: [],
    blocklast: [],
    blockdob: [],
    blockpatid:[],
    blockage: [],
    linda: [],
    uname: [],
    ppic: [],
    role: [],
    buffs: [],
    avastyle: [],
    loading: true,
    animationtype:[],
    animationcontent:orb,
    notmessage:[],
    noticon:[],
    notcolor:[],
    nottitle:[],
    notmoji:[]
  };

  toggle = value => {
    this.setState({ loading: value });
  };

  handleUpdate = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values from form: ", values);


        const mary = {
          name: values.name,
          sex: values.sex,
          address: values.address,
          email: values.email,
          age: values.age,
      }
        fetch(
          "http://192.241.145.208:8890/lims/patients/update?patientId=" +
            this.state.blockpatid,
          {
            method: "PATCH",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key"),
            },
            body: JSON.stringify(mary)
          }
        )
          .then(res => res.json())
          .then(data => {
            this.setState({ buffs: data });
            console.log(this.state.buffs);


            if(String(this.state.buffs.status).valueOf == String("200").valueOf){
              this.setState({noticon:"smile"})
              this.setState({notcolor:'#3333FF'})
              this.setState({nottitle:"okay"})
              this.setState({notmoji: "👍" })
            }
            if(String(this.state.buffs.status).valueOf == String("403").valueOf){
              this.setState({noticon:"frown"})
              this.setState({notcolor:'#FF0000'})
              this.setState({nottitle:"error"})
              this.setState({notmoji: "🌵"  })
            }
            if(String(this.state.buffs.status).valueOf == String("500").valueOf){
              this.setState({noticon:"frown"})
              this.setState({notcolor:'#FF0000'})
              this.setState({nottitle:"error"})
              this.setState({notmoji: "🌵"  })
            }
            notification.open({
              message:this.state.notmoji+this.state.buffs.message,
              description:this.state.buffs.error,
              icon: <Icon type={this.state.noticon} style={{ color: this.state.notcolor }} />
    
    
            })
          })
          .catch(console.log);
      }
    });
  };

  //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥   
  componentDidMount() {

    if (localStorage.getItem("username") === null) {
        this.props.history.push("/");
      }
    fetch("http://192.241.145.208:8890/lims/v1/auth", {
      method: "GET",
      headers: {
        Authorization: "Basic bGltc19hY2Nlc3M6MTJAITIzIzQk"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars: data.payload.token });
        this.setState({ loading: false });
        console.log(this.state.bars);
        var untu;
        untu = localStorage.getItem("username").slice(0, 3);
        this.setState({ uname: untu });
        console.log(untu);
        if (
          String(localStorage.getItem("ppic")).valueOf ==
          String("http://192.241.145.208:8890/lims/uploads/fileName=undefined")
            .valueOf
        ) {
          this.setState({ avastyle: "#f56a00" });
          console.log("tennessy whisky");
          console.log(this.state.ppic);
        } else {
          this.setState({ ppic: localStorage.getItem("ppic") });
        }
      })
      .catch(console.log);
  }

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
            //🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯
            this.setState({animationtype: "Untitled"})
            this.setState({ bars: data });
            console.log(this.state.bars)
            this.setState({ blocksname: data.payload[0].name });
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
          })
          .catch(console.log);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
       <Sides/>
        <Layout style={{background:"#fff"}}>
          <Spin
            spinning={this.state.loading}
            delay={500}
            tip="Loading..."
            size="large"
          >
            <Content style={{}}>
              <div style={{ background: "white" }}>
                <Row>
                <div>

        <PageHeader
          onBack={() => window.history.back()}
          title="Patient Information"
          subTitle="Search for patient"
          extra={[


          ]}
        >

        </PageHeader>
        </div>
                <Col span={8}>
                

                </Col>
                </Row>
                
                <div style={{ paddingLeft: "20px" }}>
                  <Row>
                    <Col span={8}>
                  <p>
                    <Form
                      layout="inline"
                      onSubmit={this.handleSearch}
                      className="login-form"
                    >
                      <Form.Item>
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
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
                            placeholder="Username"
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                        >
                          Search
                        </Button>
                      </Form.Item>
                    </Form>
                  </p>
                  
                  <p>
                    <Text style={{ paddingRight: "10px" }}>
                      <b>Name:</b>{" "}
                    </Text>{" "}
                    {this.state.blocksname}
                  </p>
                  <p>
                    <Text style={{ paddingRight: "10px" }}>
                      <b>Gender:</b>{" "}
                    </Text>{" "}
                    {this.state.blocksgender}
                  </p>
                  <p>
                    <Text style={{ paddingRight: "10px" }}>
                      <b>Patient ID:</b>{" "}
                    </Text>{" "}
                    {this.state.blocksno}
                  </p>
                  </Col>
                  <Col span={8}>
                  <FlareComponent
                  width={300}
                  height={150}
                  animationName={this.state.animationtype}
                  file={this.state.animationcontent}
                />
                  </Col>
                  </Row>
                </div>

                <div style={{ padding: "50px" }}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab={<span> History </span>} key="1">
                      <div className="logdiv">
                        <Descriptions title="User Info" bordered>
                          <Descriptions.Item label="Phone">
                            {this.state.blockphone}
                          </Descriptions.Item>
                          <Descriptions.Item label="Address">
                            {this.state.blockaddress}
                          </Descriptions.Item>
                          <Descriptions.Item label="Date of Birth">
                            {this.state.blockdob}
                          </Descriptions.Item>
                          <Descriptions.Item label="Email">
                            {this.state.blockmail}
                          </Descriptions.Item>
                          <Descriptions.Item label="Status" span={3}>
                            <Badge status="processing" text="Running" />
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    </TabPane>
                    <TabPane tab={<span>General</span>} key="2">
                      <div className="logdiv">
                        <Col span={8} style={{ block: "none" }}>
                          <Form.Item label={"Address"}>
                            {getFieldDecorator(
                              "address",
                              { initialValue: this.state.blockaddress },
                              {
                                rules: [
                                  {
                                    required: false,
                                    message: "Address"
                                  }
                                ]
                              }
                            )(<Input placeholder="Address" />)}
                          </Form.Item>

                          <Form.Item label={"Age"}>
                            {getFieldDecorator(
                              "age",
                              { initialValue: this.state.blockage },
                              {
                                rules: [
                                  {
                                    required: false,
                                    message: "age"
                                  }
                                ]
                              }
                            )(<Input placeholder="age" />)}
                          </Form.Item>

                          <Form.Item label={"Sex"}>
                            {getFieldDecorator(
                              "sex",
                              { initialValue: this.state.blocksgender },
                              {
                                rules: [
                                  {
                                    required: false,
                                    message: "Sex"
                                  }
                                ]
                              }
                            )(<Input placeholder="Address" />)}
                          </Form.Item>
                        </Col>

                        <Col
                          span={8}
                          style={{ block: "none", paddingLeft: "20px" }}
                        >
                          <Form.Item label={"Name"}>
                            {getFieldDecorator(
                              "name",
                              { initialValue: this.state.blocksname },
                              {
                                rules: [
                                  {
                                    required: false,
                                    message: "Name"
                                  }
                                ]
                              }
                            )(<Input placeholder="Religion" />)}
                          </Form.Item>

                          <Form.Item label={"Registration date"}>
                            {getFieldDecorator(
                              "regdate",
                              { initialValue: this.state.blockregd },
                              {
                                rules: [
                                  {
                                    required: false,
                                    message: "Registration date!"
                                  }
                                ]
                              }
                            )(<Input placeholder="Guardian" />)}
                          </Form.Item>

                          <Form.Item label="Email">
                            {getFieldDecorator(
                              "email",
                              { initialValue: this.state.blockmail },
                              {
                                rules: [
                                  {
                                    type: "email",
                                    message: "The input is not valid E-mail!"
                                  },
                                  {
                                    required: false,
                                    message: "Please input your E-mail!"
                                  }
                                ]
                              }
                            )(<Input placeholder="Email" />)}
                          </Form.Item>
                        </Col>
                      </div>
                      <Form className="ant-advanced-search-form">
                        <Row>
                          <Col span={24} style={{ textAlign: "right" }}>
                            <Button
                              style={{ marginLeft: 8 }}
                              onClick={this.handleUpdate}
                            >
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </TabPane>
                  </Tabs>
                  ,
                </div>
              </div>
            </Content>
          </Spin>
        </Layout>
      </Layout>
    );
  }
}

const WrappedNormalPatientinfoForm = Form.create({ name: "patient_info" })(
  Patientinfo
);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedNormalPatientinfoForm;
