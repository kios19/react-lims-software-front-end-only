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
import Sides from "../ui/Sidebar.js";
//import "react-awesome-button/dist/styles.css";

const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

const { Meta } = Card;

const { SubMenu } = Menu;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sidney No. 1 Lake Park"
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};

class GetTest extends Component {
  goadd = () => {
    this.props.history.push("/");
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
    avastyle: []
  };

  componentDidMount() {
    fetch("http://192.241.145.208:8890/lims/tests/getCounts")
      .then(res => res.json())
      .then(data => {
        this.setState({ datas: data.payload[0].pending });
        this.setState({ ongoings: data.payload[0].ongoing });
        this.setState({ alls: data.payload[0].allCount });
        //console.log(this.state.todos.payload[0].pending)
        console.log(this.state.datas);
        var untu;
        untu = localStorage.getItem("username").slice(0, 3);
        this.setState({ uname: untu });
        console.log(untu);
        //if(localStorage.getItem("ppic") =="http://192.241.145.208:8890/lims/uploads/fileName=undefined"){
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
        //this.setState({ppic: localStorage.getItem("ppic")})
        this.setState({ role: localStorage.getItem("role") });
      })
      .catch(console.log);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout style={{ background: "#fff" }}>
        <Sides/>

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ background: "#fff" }}>
            <div style={{ background: "#fff", padding: "30px" }}>
              <div className="dud">
                <PageHeader title="Get Test" subTitle="" />
              </div>
              <div style={{ background: "#fff" }}>
                <Row>
                  <Col span={8}>
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
                            placeholder="Username"
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        <Button
                          shape="circle"
                          icon="search"
                          htmlType="submit"
                          className="login-form-button"
                        ></Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={8}>
                    <Button type="primary" icon="plus">
                      <Link style={{ color: "#fff" }} to="/gettest/addtest">
                        Add Test
                      </Link>{" "}
                    </Button>

                    

                  </Col>
                </Row>
              </div>

              <div style={{ background: "#fff" }}>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const WrappedGetTest = Form.create({ name: "get_test" })(GetTest);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedGetTest;
