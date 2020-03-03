import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import "../css/colorme.css"
import {
  Layout,
  Menu,
  Icon,
  Spin,
  Col,
  Statistic,
  Divider,
  notification,
  Popover,
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
  message,
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
  Bar,

} from "recharts";
import { Link } from "react-router-dom";
import pop from "../images/prop2.png";
import pope from "../images/pope.jpg";
import tickAudio from "../sounds/accomplished.mp3";
import tockAudio from "../sounds/serious-strike.mp3";
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

  handleVerify = e => {
    console.log("put here")

    const mary = {
      status: "verify",
      testId: sessionStorage.getItem("sptestid"),
      userId: localStorage.getItem("uid"),
    };
    fetch("http://192.241.145.208:8890/lims/tests/updateTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mary)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars: data });
        console.log(this.state.bars);

        var audio = new Audio(tickAudio);
        var audio2 = new Audio(tockAudio);

        if (this.state.bars.status === 200) {
          message.success(this.state.bars.message);
          audio.play();
        }
        if (this.state.bars.status === 403) {
          message.error(this.state.bars.error);
          audio2.play();
        }
        if (this.state.bars.status === 500) {
          message.error(this.state.bars.error);
          audio2.play();
        }
      })
      .catch(console.log);
  }
  handleSearch = e => {

    fetch("http://192.241.145.208:8890/lims/tests/getResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orderId: sessionStorage.getItem("pphome") })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars: data.payload });
        console.log(this.state.bars);
        this.setState({ loading: false })
        this.setState({ barsresulttime: this.state.bars[0].resultTime });
        this.setState({ barsdeviceName: this.state.bars[0].deviceName });
        this.setState({ barspatientname: this.state.bars[0].patientName });
        this.setState({ barspatientno: this.state.bars[0].patient_no });
        this.setState({ barsresults: this.state.bars[0].results });
        

        console.log(this.state.barsresults);
      })
      .catch(console.log);

  };

  componentDidMount() {

    this.handleSearch()
  }

  render() {
    const { getFieldDecorator } = this.props.form;



    return (
      <Layout style={{ background: "#fff" }}>
        <Sides />
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



                    <Row gutter={16} style={{ paddingBottom: 60 }}>
                      <Col span={6}>
                        <Card className="raytrace1">
                          <Statistic
                            title="Patient Name"
                            value={this.state.barspatientname}


                            prefix={<Icon type="user" />}
                            suffix=""
                          />
                        </Card>
                      </Col>
                      <Col span={6} >
                        <Card className="raytrace2">
                          <Statistic

                            title="Device"
                            value={this.state.barsdevicename}


                            prefix={<Icon type="mobile" />}
                            suffix=""
                          />
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card className="raytrace3">
                          <Statistic
                            title="Patient No"
                            value={this.state.barspatientno}


                            prefix={<Icon type="solution" />}
                            suffix=""
                          />
                        </Card>
                      </Col>
                      <Col span={6}>
                        <Card className="raytrace4">
                          <Statistic
                            title="Time"
                            value={this.state.barsresulttime}


                            prefix={<Icon type="calendar" />}
                            suffix=""
                          />
                        </Card>
                      </Col>
                    </Row>




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
