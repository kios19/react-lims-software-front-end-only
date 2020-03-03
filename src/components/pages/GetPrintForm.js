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

class GetPrint extends Component {
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

        fetch(process.env.REACT_APP_GETPRINT+values.id, {
          method: "GET",


        })
          .then(res => res.json())
          .then(data => {
            this.setState({ bars: JSON.parse(data.payload[0].printForm) });
            console.log(this.state.bars);

            this.setState({ barsresulttime: this.state.bars[0].resultTime });
            this.setState({ barsdeviceName: this.state.bars[0].deviceName });
            this.setState({ barspatientname: this.state.bars[0].patientName });
            this.setState({ barspatientno: this.state.bars[0].patient_no });

            console.log(this.state.barsresults);
          })
          .catch(console.log);
      }
    });
  };

  componentDidMount() {
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
                  <PageHeader title="Print Form" />

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
                            placeholder="Name"
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



                    <div>
                      <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        hasMore={true}
                        useWindow={false}
                      >
                        <List
                          dataSource={this.state.bars}
                          renderItem={item => (
                            <List.Item key={item.id}>
                              <List.Item.Meta
                              className="raytrace"
                                avatar={
                                  <Avatar src="https://img.icons8.com/nolan/40/000000/module.png" />
                                }
                                title={<a>Unit</a>}
                                description={item.units}
                              />

                              <List.Item.Meta
                              className="raytrace"
                                avatar={
                                  <Avatar src="https://img.icons8.com/nolan/64/000000/filter.png" />
                                }
                                title={<a>Parameter</a>}
                                description={item.parameter}
                              />

                              <List.Item.Meta
                              className="raytrace"
                                avatar={
                                  <Avatar src="https://img.icons8.com/color/48/000000/stairs-up.png" />
                                }
                                title={<a>Uper Limit</a>}
                                description={item.upperLimit}
                              />

                              <List.Item.Meta
                              className="raytrace"
                                avatar={
                                  <Avatar src="https://img.icons8.com/color/48/000000/stairs-down.png" />
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
  GetPrint
);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedNormalResultsinfoForm;
