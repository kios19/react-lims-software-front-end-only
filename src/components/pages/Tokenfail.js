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
  Result,
  Timeline,
  Form,
  Descriptions,
  Input
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
  Table
} from "antd";
import "../css/login.css";
import { Link } from "react-router-dom";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial
} from "react-awesome-button";
//import "react-awesome-button/dist/styles.css";
import Sides from "../ui/Sidebar.js";
import TextLoop from "react-text-loop";

const { Header, Content, Footer, Sider } = Layout;
class Supplier extends Component {

  componentDidMount() {

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Sides />

        <Content style={{ background: "#fff" }}>
        <Result
            status="403"
            title="403"
            subTitle="Sorry token expired, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
        />,
        </Content>
      </Layout>
    );
  }
}

const WrappedSupplier = Form.create({ name: "get_test" })(Supplier);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedSupplier;
