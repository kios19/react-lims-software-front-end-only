import React, { Component } from "react";
import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import "../css/ppage.css";
import {
  Layout,
  Menu,
  Icon,
  Col,
  Statistic,
  Divider,
  Timeline,
  List,
  Form,
  Descriptions,
  Input
} from "antd";
import {
  Avatar,
  Card,
  notification,
  Row,
  PageHeader,
  Typography,
  Tree,
  Result,
  Anchor,
  Drawer,
  Button,
  Table,
  Badge,
  Dropdown
} from "antd";
import "../css/login.css";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import tickAudio from "../sounds/accomplished.mp3";
import tockAudio from "../sounds/serious-strike.mp3";
import InfiniteScroll from "react-infinite-scroller";
import axios from 'axios';

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial
} from "react-awesome-button";
//import "react-awesome-button/dist/styles.css";
import Sides from "../ui/Sidebar.js";
import TextLoop from "react-text-loop";

const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

const { Meta } = Card;

const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};





class Supplier extends Component {

  state = {
    datas: [],
    ongoings: [],
    alls: [],
    uname: [],
    ppic: [],
    role: [],
    avastyle: [],
    bars: [],
    barsresults: [],
    expandedRowKeys: [],
    size: 'small',
    visibles: false
  };

  state2 = {
    size: 'small'
  };
  handleSomething(value) {
    this.setState({
      bars: value
    });
  }
  onTableRowExpand(expanded, record) {
    var keys = [];
    if (expanded) {
      keys.push(record.id); // I have set my record.id as row key. Check the documentation for more details.
    }

    //this.setState({expandedRowKeys: keys});
  }

  expandedRowRender = r => {
    console.log('mbu', r)
    let formData = { testId: r.id };

    const encodeForm = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
    }
    axios.post('http://192.241.145.208:8890/lims/tests/getResult', encodeForm(formData), { headers: { 'Accept': 'application/json' } })
      .then((response) => {
        console.log("response", response.data.payload[0].results);
        //this.handleSomething(response.data.payload[0].results)
        //this.handleSomething(response.data.payload[0].results)
        // console.log(this.state.bars)
        this.setState({ barsresults: response.data.payload[0].results })
        console.log("done")
        //console.log("barsresults")

      })
      .catch(function (error) {
        console.log(error);
      });

    return <div>
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

            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>;



  };


  onClose = () => {
    this.setState({
      visibles: false,
    });
  };

  onRow = r => ({
    onClick: () => {
      console.log('values', r)
      sessionStorage.setItem("pphome", r.orderId);
      //this.props.history.push({
      //pathname: "/pres"
      //});


    }
  });
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


  goadd = () => {
    this.props.history.push("/");
  };

  enterUser = () => {
    this.props.history.push("/user");
  };


  componentDidMount() {
    var audio2 = new Audio(tockAudio);
    fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?patientId=" + sessionStorage.getItem("pid"))
      .then(res => res.json())
      .then(data => {
        //this.setState({ datas: data.payload });

        console.log("datas", data.payload);

        if (parseInt(data.payload.status) != 200 & data.payload.error) {
          console.log("eror")
          audio2.play();
          notification.open({
            message: 'Error',
            description: data.payload.message
          })
        }
        if (parseInt(data.status) == 200) {
          fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?patientId=" + sessionStorage.getItem("pid"))
            .then(res => res.json())
            .then(data => {
              this.setState({ datas: data.payload });

              //console.log(this.state.todos.payload[0].pending)
              console.log("datas", this.state.datas);

            })
            .catch(console.log);
        }

      })
      .catch(console.log);

    /*fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?patientId="+sessionStorage.getItem("pid"))
      .then(res => res.json())
      .then(data => {
        this.setState({ datas: data.payload });

        //console.log(this.state.todos.payload[0].pending)
        console.log("datas" ,this.state.datas);

      })
      .catch(console.log);*/

  }

  render() {
    const columns = [
      {
        title: "Order",
        dataIndex: "orderId",
        key: "orderId",
        //...this.getColumnSearchProps("orderId")
      },
      {
        title: "Date Ordered",
        dataIndex: "dateOrdered",
        key: "dateOrdered",
        //...this.getColumnSearchProps("dateOrdered")
      },
      {
        title: "Device",
        dataIndex: "device",
        key: "device",
        //...this.getColumnSearchProps("device")
      },
      {
        title: "DeviceId",
        dataIndex: "deviceId",
        key: "sex",
        //...this.getColumnSearchProps("deviceId")
      },
      {
        title: "Test Name",
        dataIndex: "testName",
        key: "testName",
        //...this.getColumnSearchProps("testName")
      },
      {
        title: "Test Status",
        dataIndex: "testStatus",
        key: "testStatus",
        //...this.getColumnSearchProps("testStatus")
      },
      {
        title: "Specimen Name",
        dataIndex: "specimenName",
        key: "testStatus",
        //...this.getColumnSearchProps("specimenName")
      },
      {
        title: "Date",
        dataIndex: "dateOrdered",
        key: "dateOrdered",
        //...this.getColumnSearchProps("dateOrdered")
      },

    ];
    const { getFieldDecorator } = this.props.form;
    const rowSelection22 = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ spinning: true })
        console.log('selectedRows22: ', selectedRows[0]);

        let formData = { testId: selectedRows[0].id };

        const encodeForm = (data) => {
          return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
        }
        axios.post('http://192.241.145.208:8890/lims/tests/getResult', encodeForm(formData), { headers: { 'Accept': 'application/json' } })
          .then((response) => {
            console.log("response", response.data.payload[0].results);
            //this.handleSomething(response.data.payload[0].results)
            //this.handleSomething(response.data.payload[0].results)
            // console.log(this.state.bars)
            this.setState({ barsresults: response.data.payload[0].results })
            console.log("done")
            this.setState({visibles: true})
            //console.log("barsresults")

          })
          .catch(function (error) {
            console.log(error);
          });
        //this.setState({spinning: false})
        //this.setState({visible2: true});
      },

    };
    return (
      <Layout>
        <Sides />

        <Content style={{ background: "#fff" }}>
          <PageHeader

            onBack={() => window.history.back()}
            title="Patient info"

            subTitle="patients history"
            extra={[


            ]}
          >

          </PageHeader>
          <div style={{ background: "#fff", padding: "30px" }}>

            <div className="box">
              <div className="card">
                <div className="imgBx">
                  <img src="https://image.flaticon.com/icons/svg/754/754554.svg" alt="images"></img>

                </div>
                <div className="details">
                  <h2>{sessionStorage.getItem("ppname")}</h2><br />
                  <span><b>Patient No:</b>&nbsp;&nbsp;&nbsp;{sessionStorage.getItem("ppno")}</span>
                </div>

              </div>
            </div>

            <div style={{ paddingTop: 50 }}>
              <Drawer
                title="History"
                placement="left"
                onClose={this.onClose}
                closable={true}
                width= {920}
                onClose={this.onClose}
                visible={this.state.visibles}
              >
                <div style={{padding: 40}}>
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
                            
                            title={<a>Unit</a>}
                            description={item.unit}
                          />

                          <List.Item.Meta
                            
                            title={<a>Flag</a>}
                            description={item.flag}
                          />

                          <List.Item.Meta
                            
                            title={<a>Value</a>}
                            description={item.value}
                          />

                          <List.Item.Meta
                            
                            title={<a>Parameter</a>}
                            description={item.parameter}
                          />

                          <List.Item.Meta
                            
                            title={<a>Uper Limit</a>}
                            description={item.uperLimit}
                          />

                          <List.Item.Meta
                            
                            title={<a>Lower Limit</a>}
                            description={item.lowerLimit}
                          />
                        </List.Item>
                      )}
                    >
                      {this.state.loading && this.state.hasMore && (
                        <div className="demo-loading-container">

                        </div>
                      )}
                    </List>
                  </InfiniteScroll>
                </div>;
                </Drawer>
              <Row>
                <Col span={4}></Col>
                <Col span={16}>

                  <Table
                    //onRow={this.onRow}  
                    {...this.state2}
                    columns={columns}
                    rowSelection={rowSelection22}
                    dataSource={this.state.datas} />

                </Col>
                <Col></Col>
              </Row>

            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

const WrappedSupplier = Form.create({ name: "get_test" })(Supplier);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedSupplier;
