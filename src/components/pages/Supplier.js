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
  Table,
  Divider,
  Tag,
  Breadcrumb
} from "antd";
import "../css/login.css";
import Chart from "react-apexcharts";
import { cpus } from "os";
import { Link } from "react-router-dom";
import pop from "../images/prop2.png";
import Highlighter from "react-highlight-words";
import Sides from "../ui/Sidebar.js";
const { Meta } = Card;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const data = [
  {
    key: "1",
    id: "23",
    firstname: "Jonathan",
    lastname: "Someone",
    sex: "male",
    dob: "2019/09/09",
    status: "High Fever",
    action: "Edit"
  },
  {
    key: "2",
    id: "23",
    firstname: "Jonathan",
    lastname: "Someone",
    sex: "male",
    dob: "2019/09/09",
    status: "High Fever",
    action: "Edit"
  }
];
function onChange(date, dateString) {
  console.log(date, dateString);
}

class Patients extends Component {
  state = {
    uname: [],
    ppic: [],
    role: [],
    avastyle: [],
    loading: true
  };

  logout = () => {
    localStorage.clear();
  };
  enterUser = () => {
    this.props.history.push("/user");
  };

  onRow = r => ({
    onClick: () => {
      console.log('values',r)
      sessionStorage.setItem("ppname", r.name);
      sessionStorage.setItem("ppno", r.patientNo);
      sessionStorage.setItem("ppsex", r.sex);
      sessionStorage.setItem("ppdob", r.dob);
      sessionStorage.setItem("pid",r.id);
      this.props.history.push({
        pathname: "/patient"
      });
    }
  });

  toggle = value => {
    this.setState({ loading: value });
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
          onClick={() => this.handleReset(clearFilters)}
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  state = {
    linda: [],
    bars: []
  };

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 
  componentDidMount() {
    if (localStorage.getItem("username") === null) {
      this.props.history.push("/");
    }


    fetch("http://192.241.145.208:8890/lims/inventory/suppliers", {
      method: "GET",
      headers: {

      },

    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars: data.payload });
        console.log(this.state.bars);
        this.setState({ loading: false });
      })
      .catch(console.log);
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },
      {
        title: "Contact",
        dataIndex: "contact",
        key: "contact",
        ...this.getColumnSearchProps("contact")
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address")
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        ...this.getColumnSearchProps("date")
      },
      
    ];
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
                <div className="dud" style={{ background: "#fff" }}>
                <div>

                <PageHeader
                    onBack={() => window.history.back()}
                    title="Suppliers"
                    
                    subTitle="Summary of suppliers"
                    extra={[

                      <Button key="1" type="primary" onClick={() => this.props.history.push('/inventory/addsupplier')}>
                        AddSupplier
                      </Button>
                    ]}
                  >

                  </PageHeader>
              </div>
                </div>

                <div className="dtable" style={{ background: "#fff" }}>
                  <Table columns={columns}  onRow={this.onRow} dataSource={this.state.bars} />
                </div>
              </div>
            </Content>
          </Spin>
        </Layout>
      </Layout>
    );
  }
}
export default Patients;
