import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import {
  Layout,
  Menu,
  Icon,
  Spin,
  Col,
  Statistic,
  Divider,
  Timeline,
  Input,
  List
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  Typography,
  Tree,
  Anchor,
  Button,
  Form
} from "antd";
import "../css/login.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { Link } from "react-router-dom";
import pop from "../images/prop2.png";
import pope from "../images/pope.jpg";

import InfiniteScroll from "react-infinite-scroller";
import Sides from "../ui/Sidebar.js";
const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

const { Meta } = Card;

const { SubMenu } = Menu;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

class Results extends Component {
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

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values.id);

        fetch("http://192.241.145.208:8890/lims/tests/getResult", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ testId: values.id })
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
    });
  };

  componentDidMount() {
    
    if (
      String(localStorage.getItem("ppic")).valueOf ==
      String("http://192.241.145.208:8890/lims/uploads/fileName=undefined")
        .valueOf
    ) {
      this.setState({ avastyle: "#f56a00" });
      console.log("tennessy whisky");
      console.log(this.state.ppic);
      this.setState({ loading: false });
    } else {
      this.setState({ ppic: localStorage.getItem("ppic") });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout style={{ background: "#fff" }}>
        <Sides/>
        <Layout style={{ background: "#fff" }}>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Spin
            spinning={this.state.loading}
            delay={500}
            tip="Loading..."
            size="large"
          >
            <Content style={{ background: "#fff" }}>
              <div style={{ background: "#fff", padding: "30px" }}>
                <div className="dud">
                  <PageHeader title="Results" />

                  <div>
                    <Form
                      layout="inline"
                      onSubmit={this.handleSearch}
                      className="login-form"
                      style={{ paddingBottom: "30px" }}
                    >
                      <Form.Item>
                        {getFieldDecorator("id", {
                          rules: [
                            {
                              required: true,
                              message: "Please input result id!"
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
                            placeholder="Result ID"
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        <Button
                          shape="circle"
                          icon="search"
                          htmlType="submit"
                          className="raytrace"
                        />
                      </Form.Item>
                    </Form>

                    <div className="" style={{ paddingBottom: "60px" }}>
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

                    <div>
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
                                description={item.flag}
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
                </div>
              </div>
            </Content>
          </Spin>
        </Layout>
      </Layout>
    );
  }
}
const WrappedNormalResultsinfoForm = Form.create({ name: "results_info" })(
  Results
);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedNormalResultsinfoForm;
