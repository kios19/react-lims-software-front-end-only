import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/ppage.css";
import { withRouter } from "react-router-dom";
import {
  Layout,
  Menu,
  Icon,
  Col,
  Statistic,
  Divider,
  Spin,
  Timeline
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  Typography,
  Tree,
  Popover,
  Anchor,
  Button,
  message
} from "antd";
import jwt_decode from "jwt-decode";
import tickAudio from "../sounds/closure.mp3";
import orb from "../images/med.png";

const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

const { Meta } = Card;

const { SubMenu } = Menu;

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  twende = e => {
    console.log('click ', e.key);
    var inta = parseInt(e.key, 10);
    /*if(inta === 1){
      this.props.history.push("/dash")
    }*/
    this.setState({ sey: e.key })

  };
  logout = () => {
    var audio = new Audio(tickAudio);
    audio.play();
    localStorage.clear();

    //this.props.history.push("/");
    window.location.replace("http://localhost:3000/");
  };
  push = () => {
    window.location.replace("http://localhost:3000/403");
  };

  enterUser = () => {
    window.location.replace("http://localhost:3000/user");
  };
  state = {
    datas: [],
    ongoings: [],
    alls: [],
    uname: [],
    ppic: [],
    role: [],
    avastyle: [],
    loading: true,
    items: 1,
    opec: 0,
    sey: []
  };

  menuClick = e => {
    console.log("click ", e.key);
    if (String(e.key).valueOf == String(1).valueOf) {
      //this.props.history.push("/dash")
    }
  };

  //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  componentDidMount() {
    if (localStorage.getItem("username") === null) {
      this.props.history.push("/");
    }
    var untu;
    untu = localStorage.getItem("username").slice(0, 3);
    this.setState({ uname: untu });
    console.log("🚆 ", untu);
    if (
      String(localStorage.getItem("ppic")).valueOf ==
      String("http://192.241.145.208:8890/lims/uploads/fileName=undefined")
        .valueOf
    ) {
      this.setState({ avastyle: "#ff0066" });
    } else {
      this.setState({ ppic: localStorage.getItem("ppic") });
    }
    this.setState({ loading: false });
    this.setState({ animationtype: "reposo" });

    this.setState({ role: localStorage.getItem("role") });

    if (
      String(localStorage.getItem("role")).valueOf == String("admin").valueOf
    ) {
      this.setState({ opec: 100 });
    }

    if (
      String(localStorage.getItem("role")).valueOf == String("user").valueOf
    ) {
      this.setState({ opec: 0 });
    }

    var a = localStorage.getItem("expiry");

    //console.log("📦 expiry",a)
    if (Date() > a) {
      //console.log("regen")
      fetch("http://192.241.145.208:8890/lims/v1/auth", {
        method: "GET",
        crossDomain: true,
        "Access-Control-Allow-Origin":
          "http://192.241.145.208:8890/lims/v1/auth",
        "Access-Control-Allow-Credentials": "true",
        headers: {
          Authorization: "Basic bGltc19hY2Nlc3M6MTJAITIzIzQk",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
          "Access-Control-Allow-Credentials": "true",
          Accept: "*/*",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ linda: data.payload.token });
          //console.log(this.state.linda);
          localStorage.setItem("key", this.state.linda);
          var coconut = jwt_decode(this.state.linda);

          const d = new Date(0);
          d.setUTCSeconds(coconut.exp);
          //console.log(d);
          localStorage.setItem("expiry", d);
        })
        .catch(console.log);
    }
  }
  render() {
    return (
      <Sider
        className="ant-layout-sider-light"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{ alignContent: "left"}} >
        <img src={orb}
            width={180}
            height={180}
            alignContent="left"
            style={{float:"left"}}
            
          />
</div>
        <Menu theme="light" >
          
          <Divider/>
          <Card
            style={{ alignContent: "center" }}
            bordered={false}

          >

            <Popover
              content={
                <div className="logdivspace">
                  <Button onClick={this.logout}>
                    Logout
                          </Button>
                </div>
              }
              title="Helper"
            >

              <Avatar
                onClick={() => this.props.history.push("/user")}
                className="raytrace"
                src={this.state.ppic}
                style={{
                  //borderStyle: "dashed",
                  backgroundColor: this.state.avastyle,
                  verticalAlign: "middle",
                  paddingBottom: "40px"
                }}
                size="large"
              >
                <b>{this.state.uname}</b>
              </Avatar>
            </Popover>
            <Text style={{ paddingLeft: "10px" }} strong>
              {localStorage.getItem("username")}
            </Text>
          </Card>

          <Menu.Item key="1" onClick={() => this.props.history.push("/dash")}>
            <Icon type="branches" />
            <span className="nav-text">

              <b>Dashboard</b>

            </span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="team" />
                <span>
                  <b>Patients</b>
                </span>
              </span>
            }
          >
            <Menu.ItemGroup>
              <Menu.Item key="2" onClick={() => this.props.history.push("/patients")}>

                <b>Patients</b>

              </Menu.Item>
              <Menu.Item key="3" onClick={() => this.props.history.push("/patients/patientinfo")}>

                <b>Patient info</b>

              </Menu.Item>
              <Menu.Item key="4" onClick={() => this.props.history.push("/patients/add")}>

                <b>Add Patient</b>

              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="5" onClick={() => this.props.history.push("/requests")}>
            <Icon type="coffee" />
            <span className="nav-text">

              <b>Requests</b>

            </span>
          </Menu.Item>
          <Menu.Item key="6" onClick={() => this.props.history.push("/samples")}>
            <Icon type="solution" />
            <span className="nav-text">

              <b>Samples</b>

            </span>
          </Menu.Item>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="team" />
                <span>
                  <b>Inventory</b>
                </span>
              </span>
            }
          >
            <Menu.ItemGroup>
              <Menu.Item key="7" onClick={() => this.props.history.push("/inventory/suppliers")}>

                <b>Suppliers</b>

              </Menu.Item>
              <Menu.Item key="8" onClick={() => this.props.history.push("/inventory/addsupplier")}>

                <b> Add Supplier</b>

              </Menu.Item>

              <Menu.Item key="9" onClick={() => this.props.history.push("/inventory/products")}>

                <b>Products</b>

              </Menu.Item>
              <Menu.Item key="10" onClick={() => this.props.history.push("/inventory/addproducts")}>

                <b>Add Products</b>

              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="schedule" />
                <span>
                  <b>Reports</b>
                </span>
              </span>
            }
          >
            <Menu.ItemGroup>
              <Menu.Item key="11" onClick={() => this.props.history.push("/results")}>

                <b>Result</b>

              </Menu.Item>

            </Menu.ItemGroup>

            <Menu.ItemGroup>
              <Menu.Item key="31" onClick={() => this.props.history.push("/reports/availabletest")}>

                <b>All Tests</b>

              </Menu.Item>

            </Menu.ItemGroup>

            <Menu.ItemGroup>
              <Menu.Item key="31" onClick={() => this.props.history.push("/reports/allresults")}>

                <b>MOH_240</b>

              </Menu.Item>

            </Menu.ItemGroup>

            <Menu.ItemGroup>
              <Menu.Item key="31" onClick={() => this.props.history.push("/reports/patientrepohome")}>

                <b>Patient Report</b>

              </Menu.Item>

            </Menu.ItemGroup>
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="reconciliation" />
                <span>
                  <b>Tests</b>
                </span>
              </span>
            }
          >
            <Menu.ItemGroup>
              <Menu.Item key="13" onClick={() => this.props.history.push("/test/order")}>
                <Link to="/test/order">
                  <b>Place Test</b>
                </Link>
              </Menu.Item>
              <Menu.Item key="14" onClick={() => this.props.history.push("/test/initiate")}>
                <Link to="/test/initiate">
                  <b>Initiate Test</b>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <Divider />
          <Menu.Item key="15">
            <Icon type="usb" />
            <span className="nav-text">
              Intergrations
            </span>
          </Menu.Item>
          <SubMenu
            key="sub7"
            title={
              <span>
                <Icon type="setting" />
                <span>
                  Settings
                </span>
              </span>
            }
          >
            <Menu.ItemGroup>
              <Menu.Item key="16" onClick={() => this.props.history.push("/test/addprint")}>

                <b>Setup Test</b>

              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup style={{ opacity: this.state.opec }}>
              <Menu.Item key="2">
                <Link to="/register">
                  <b>Register User</b>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
        <Divider />
        <div className="logdiv" />


      </Sider>


    );
  }
}
export default withRouter(Sidebar);
