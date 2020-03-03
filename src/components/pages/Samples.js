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
  Col,
  Form,
  InputNumber,
  Modal,
  Button,
  Icon,
  Mentions,
  Typography
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  Table,
  Divider,
  Tag,
  Spin,
  AutoComplete,
  Tabs
} from "antd";
import "../css/login.css";
import Chart from "react-apexcharts";
import { cpus } from "os";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import pop from "../images/prop2.png";
import Home from "../pages/Home";
import Sides from "../ui/Sidebar.js";

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { Option, getMentions } = Mentions;
const { Meta } = Card;
const { SubMenu } = Menu;
const { Text } = Typography;

class Samples extends Component {
  //showModal = () => {
  //this.setState({
  //visible: true,
  //});
  //console.log("hey")
  //};

  showModal = r => ({
    onClick: () => {
      sessionStorage.setItem("sid", r.id)
      sessionStorage.setItem("scode", r.sampleCode)
      this.props.history.push('/samples/reject')
    }
  });
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

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
    role: [],
    avastyle: [],
    roll: true,
    roll2:true,
    visible: false,
    rejects: []
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            onClick={() => this.handleReseter(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReseter = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  state = {
    sampler: []
  };

  componentDidMount() {

    if (localStorage.getItem("username") === null) {
      this.props.history.push("/");
    }

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

    this.setState({ ppic: localStorage.getItem("ppic") });
    this.setState({ role: localStorage.getItem("role") });

    fetch("http://192.241.145.208:8890/lims/tests/getSample", {
      method: "POST",
      headers: {
        Accept: "*/*"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ sampler: data.payload });
        console.log(this.state.sampler);
        this.setState({ roll: false })
      })
      .catch(console.log);

    fetch("http://192.241.145.208:8890/lims/tests/getSample?status=rejected", {
      method: "POST",
      headers: {
        Accept: "*/*"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ rejects: data.payload });
        console.log(this.state.rejects);
        this.setState({ roll2: false})
      })
      .catch(console.log);
  }

  handleReset = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log("Errors in the form!!!");
        return;
      }
      console.log("Submit!!!");
      console.log(values);
    });
  };

  checkMention = (rule, value, callback) => {
    const mentions = getMentions(value);
    if (mentions.length < 2) {
      callback(new Error("More than one must be selected!"));
    } else {
      callback();
    }
  };

  state = {
    expand: false
  };

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Specimen",
        dataIndex: "specimenName",
        key: "specimenName",
        ...this.getColumnSearchProps("specimenId")
      },
      {
        title: "Test ID",
        dataIndex: "testId",
        key: "testId",
        ...this.getColumnSearchProps("testId")
      },
      {
        title: "Test",
        dataIndex: "testName",
        key: "testName",
        ...this.getColumnSearchProps("testId")
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        ...this.getColumnSearchProps("date")
      },
      {
        title: "Sample Code",
        dataIndex: "sampleCode",
        key: "sampleCode",
        ...this.getColumnSearchProps("sampleCode")
      },
      {
        title: "Used",
        dataIndex: "used",
        key: "used",
        ...this.getColumnSearchProps("used")
      },
      {
        title: "Patient",
        dataIndex: "patientName",
        key: "patientName",
        ...this.getColumnSearchProps("used")
      },

    ];
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Sides />
        <Layout>
          <Content style={{ background: "white" }}>
            <div style={{ background: "white", padding: "30px" }}>
              <div>

                <PageHeader
                  onBack={() => window.history.back()}
                  title="Samples"

                  subTitle="sample details"
                  extra={[


                  ]}
                >

                </PageHeader>
              </div>

              <div className="dtable">
                <Modal
                  title="Cancel Sample"
                  visible={this.state.visible}
                  onOk={this.hideModal}
                  onCancel={this.hideModal}
                  okText="确认"
                  cancelText="取消"
                >
                  <p>Bla bla ...</p>
                  <p>Bla bla ...</p>
                  <p>Bla bla ...</p>
                </Modal>
                <Tabs defaultActiveKey={1}>
                  <TabPane tab="Running" key="1">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowKey="id"
                        onRow={this.showModal}
                        columns={columns}
                        dataSource={this.state.sampler}
                      />
                    </Spin>
                  </TabPane>
                  <TabPane tab="Rejected" key="2">
                  <Spin spinning={this.state.roll2}>
                      <Table
                        rowKey="id"

                        columns={columns}
                        dataSource={this.state.rejects}
                      />
                    </Spin>
                  </TabPane>

                </Tabs>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const WrappedNormalsamples = Form.create({ name: "sampes" })(Samples);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedNormalsamples;
