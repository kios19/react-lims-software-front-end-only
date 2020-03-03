import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
//import "antd/dist/result.css";
import "../css/login.css";
import { Layout, Menu, Icon, Col, Statistic, Spin } from "antd";
import { Card, Row, Typography } from "antd";
import "../css/login.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { Link } from "react-router-dom";

import orb from "../images/robo.flr";
import TextLoop from "react-text-loop";
import tickAudio from "../sounds/long-expected.mp3";
import Sides from "../ui/Sidebar.js";

import { ScatterChart, Scatter, ZAxis } from "recharts";

const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

const data01 = [
  { hour: "12a", index: 1, value: 170 },
  { hour: "1a", index: 1, value: 180 },
  { hour: "2a", index: 1, value: 150 },
  { hour: "3a", index: 1, value: 120 },
  { hour: "4a", index: 1, value: 200 },
  { hour: "5a", index: 1, value: 300 },
  { hour: "6a", index: 1, value: 400 },
  { hour: "7a", index: 1, value: 200 },
  { hour: "8a", index: 1, value: 100 },
  { hour: "9a", index: 1, value: 150 },
  { hour: "10a", index: 1, value: 160 },
  { hour: "11a", index: 1, value: 170 },
  { hour: "12a", index: 1, value: 180 },
  { hour: "1p", index: 1, value: 144 },
  { hour: "2p", index: 1, value: 166 },
  { hour: "3p", index: 1, value: 145 },
  { hour: "4p", index: 1, value: 150 },
  { hour: "5p", index: 1, value: 170 },
  { hour: "6p", index: 1, value: 180 },
  { hour: "7p", index: 1, value: 165 },
  { hour: "8p", index: 1, value: 130 },
  { hour: "9p", index: 1, value: 140 },
  { hour: "10p", index: 1, value: 170 },
  { hour: "11p", index: 1, value: 180 }
];

const data02 = [
  { hour: "12a", index: 1, value: 160 },
  { hour: "1a", index: 1, value: 180 },
  { hour: "2a", index: 1, value: 150 },
  { hour: "3a", index: 1, value: 120 },
  { hour: "4a", index: 1, value: 200 },
  { hour: "5a", index: 1, value: 300 },
  { hour: "6a", index: 1, value: 100 },
  { hour: "7a", index: 1, value: 200 },
  { hour: "8a", index: 1, value: 100 },
  { hour: "9a", index: 1, value: 150 },
  { hour: "10a", index: 1, value: 160 },
  { hour: "11a", index: 1, value: 160 },
  { hour: "12a", index: 1, value: 180 },
  { hour: "1p", index: 1, value: 144 },
  { hour: "2p", index: 1, value: 166 },
  { hour: "3p", index: 1, value: 145 },
  { hour: "4p", index: 1, value: 150 },
  { hour: "5p", index: 1, value: 160 },
  { hour: "6p", index: 1, value: 180 },
  { hour: "7p", index: 1, value: 165 },
  { hour: "8p", index: 1, value: 130 },
  { hour: "9p", index: 1, value: 140 },
  { hour: "10p", index: 1, value: 160 },
  { hour: "11p", index: 1, value: 180 }
];

const parseDomain = () => [
  0,
  Math.max(
    Math.max.apply(null, data01.map(entry => entry.value)),
    Math.max.apply(null, data02.map(entry => entry.value))
  )
];

const data22 = [
  { name: "18-24", uv: 31.47, pv: 2400, fill: "#8884d8" },
  { name: "25-29", uv: 26.69, pv: 4567, fill: "#83a6ed" },
  { name: "30-34", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
  { name: "35-39", uv: 8.22, pv: 9800, fill: "#82ca9d" },
  { name: "40-49", uv: 8.63, pv: 3908, fill: "#a4de6c" },
  { name: "50+", uv: 2.63, pv: 4800, fill: "#d0ed57" },
  { name: "unknow", uv: 6.67, pv: 4800, fill: "#ffc658" }
];

const data = [
  {
    name: "sample A",
    uv: 4000
  },
  {
    name: "sample B",
    uv: 3000
  },
  {
    name: "sample C",
    uv: 2000
  },
  {
    name: "sample D",
    uv: 2780
  },
  {
    name: "sample E",
    uv: 1890
  }
];

const data2 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

class Dash extends Component {
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
    cunt: [],
    role: [],
    avastyle: [],
    loading: true,
    animationtype: "Cargando",
    animationfile: orb,
    mostdone:[],
    mostcollected:[]
  };

  toggle = value => {
    this.setState({ loading: value });
  };

  componentDidMount() {
    if (localStorage.getItem("username") === null) {
      this.props.history.push("/");
    }

    fetch(process.env.REACT_APP_COUNTS)
      .then(res => res.json())
      .then(data => {
        this.setState({ datas: data.payload[0].pending });
        this.setState({ ongoings: data.payload[0].ongoing });
        this.setState({ alls: data.payload[0].allCount });

        //console.log(this.state.todos.payload[0].pending)
        this.setState({ loading: false });
        this.setState({ animationtype: "reposo" });
        var audio = new Audio(tickAudio);
        audio.play();
      })
      .catch(console.log);


      fetch(process.env.REACT_APP_MOSTDONE)
      .then(res => res.json())
      .then(data => {
        this.setState({ mostdone: data });
        
      })
      .catch(console.log);


      fetch(process.env.REACT_APP_MOSTCOLLECTED)
      .then(res => res.json())
      .then(data => {
        this.setState({ mostcollected: data });
        
      })
      .catch(console.log);
  }

  render() {
    const domain = parseDomain();
    const range = [16, 225];

    return (
      <Layout>
        <Sides />

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />

          <Content style={{}}>
            <div style={{ background: "#fff" }}>
              <div className="dud" style={{ paddingBottom: "50px" }}>
                <Row gutter={24}>
                  <Col span={20}>
                    <sampleHeader
                      style={{ paddingBottom: "80px", paddingTop: "0px" }}
                      title={
                        <TextLoop>
                          <div>
                            <span>Lims </span>
                            <span>Dashboard</span>
                          </div>
                          <div>Data Hub</div>
                        </TextLoop>
                      }
                    />
                  </Col>
                  <Col span={4}></Col>
                </Row>
              </div>

              <div
                className=""
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  paddingLeft: "50px"
                }}
              >
                <Row gutter={24}>
                  <Spin
                    spinning={this.state.loading}
                    delay={500}
                    tip="Loading..."
                    size="large"
                  >
                    <Col span={6}>
                      <Statistic
                        title="Pending"
                        value={this.state.datas}
                        valueStyle={{ color: "red" }}
                        prefix={<Icon type="project" className="raytrace" />}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Ongoing"
                        value={this.state.ongoings}
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<Icon type="loading" />}
                      />
                    </Col>
                    <Col span={6}>
                      
                      <Statistic
                        title="Total"
                        value={this.state.alls}
                        valueStyle={{ color: "blue" }}
                        prefix={<Icon type="fund" className="raytrace" />}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="To Ammend"
                        value={this.state.ongoings}
                        prefix={<Icon type="exception" className="raytrace" />}
                      />
                    </Col>
                  </Spin>
                </Row>
              </div>

              <div className="dud">
              
                <Card style={{ marginTop: 50 }} bordered={false}>
                <Text>
                      <b>Most Done Tests</b>
                    </Text>
                  <div className=" logdiv" style={{ margin: "10px" }}>
                  
                    <AreaChart width={1000} height={300} data={this.state.mostdone}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="NAME" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <AreaChart
                        type="monotone"
                        dataKey="count"
                        isAnimationActive={true}
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Area type="monotone" dataKey="COUNT" stroke="#82ca9d" />
                    </AreaChart>
                  </div>
                </Card>
              </div>
            </div>

            <div style={{background: "#fff"}} className="dud">

                  <Card bordered={false} >
                  <Text>
                      <b>Most Collected Samples</b>
                    </Text>
                  <div className=" logdiv" style={{ margin: "10px" }}>
                  
                      <BarChart
                        width={1000}
                        height={300}
                        data={this.state.mostcollected}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="NAME" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="COUNT" stackId="a" fill="#82ca9d" />
                      </BarChart>

                    </div>
                  </Card>


            </div>

            <Row style={{ background: "#fff" }}>
              <Col span={6}></Col>
              <Col span={8}>
                <Text style={{ padding: 60 }}>
                  <b>Weekly Patient flow</b>
                </Text>
                <div style={{ background: "#fff" }}>
                  <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                      top: 10,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis
                      type="category"
                      dataKey="hour"
                      interval={0}
                      tick={{ fontSize: 0 }}
                      tickLine={{ transform: "translate(0, -6)" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="index"
                      name="sunday"
                      height={10}
                      width={80}
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: "Sunday", position: "insideRight" }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="value"
                      domain={domain}
                      range={range}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      wrapperStyle={{ zIndex: 100 }}
                      content={this.renderTooltip}
                    />
                    <Scatter data={data01} fill="#8884d8" />
                  </ScatterChart>

                  <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                      top: 10,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis
                      type="category"
                      dataKey="hour"
                      name="hour"
                      interval={0}
                      tick={{ fontSize: 0 }}
                      tickLine={{ transform: "translate(0, -6)" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="index"
                      height={10}
                      width={80}
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: "Monday", position: "insideRight" }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="value"
                      domain={domain}
                      range={range}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      wrapperStyle={{ zIndex: 100 }}
                      content={this.renderTooltip}
                    />
                    <Scatter data={data02} fill="#8884d8" />
                  </ScatterChart>

                  <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                      top: 10,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis
                      type="category"
                      dataKey="hour"
                      name="hour"
                      interval={0}
                      tick={{ fontSize: 0 }}
                      tickLine={{ transform: "translate(0, -6)" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="index"
                      height={10}
                      width={80}
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: "Tuesday", position: "insideRight" }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="value"
                      domain={domain}
                      range={range}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      wrapperStyle={{ zIndex: 100 }}
                      content={this.renderTooltip}
                    />
                    <Scatter data={data01} fill="#8884d8" />
                  </ScatterChart>

                  <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                      top: 10,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis
                      type="category"
                      dataKey="hour"
                      name="hour"
                      interval={0}
                      tick={{ fontSize: 0 }}
                      tickLine={{ transform: "translate(0, -6)" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="index"
                      height={10}
                      width={80}
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: "Wednesday", position: "insideRight" }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="value"
                      domain={domain}
                      range={range}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      wrapperStyle={{ zIndex: 100 }}
                      content={this.renderTooltip}
                    />
                    <Scatter data={data02} fill="#8884d8" />
                  </ScatterChart>

                  <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                      top: 10,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis
                      type="category"
                      dataKey="hour"
                      name="hour"
                      interval={0}
                      tick={{ fontSize: 0 }}
                      tickLine={{ transform: "translate(0, -6)" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="index"
                      height={10}
                      width={80}
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: "Thursday", position: "insideRight" }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="value"
                      domain={domain}
                      range={range}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      wrapperStyle={{ zIndex: 100 }}
                      content={this.renderTooltip}
                    />
                    <Scatter data={data01} fill="#8884d8" />
                  </ScatterChart>

                  <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                      top: 10,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis
                      type="category"
                      dataKey="hour"
                      name="hour"
                      interval={0}
                      tick={{ fontSize: 0 }}
                      tickLine={{ transform: "translate(0, -6)" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="index"
                      height={10}
                      width={80}
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: "Friday", position: "insideRight" }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="value"
                      domain={domain}
                      range={range}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      wrapperStyle={{ zIndex: 100 }}
                      content={this.renderTooltip}
                    />
                    <Scatter data={data02} fill="#8884d8" />
                  </ScatterChart>

                  <ScatterChart
                    width={800}
                    height={60}
                    margin={{
                      top: 10,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }}
                  >
                    <XAxis
                      type="category"
                      dataKey="hour"
                      name="hour"
                      interval={0}
                      tickLine={{ transform: "translate(0, -6)" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="index"
                      height={10}
                      width={80}
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: "Saturday", position: "insideRight" }}
                    />
                    <ZAxis
                      type="number"
                      dataKey="value"
                      domain={domain}
                      range={range}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      wrapperStyle={{ zIndex: 100 }}
                      content={this.renderTooltip}
                    />
                    <Scatter data={data01} fill="#8884d8" />
                  </ScatterChart>
                </div>
              </Col>
              <Col span={8}></Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Dash;
