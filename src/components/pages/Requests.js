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
  Drawer,
  Checkbox,
  notification,
  message,
  Form,
  Icon,
  Result,
  Affix,
  List,
  Spin,
  Col,
  Pagination,
  Button,
  Typography
} from "antd";
import { Avatar, Card, Row, PageHeader, Table, Divider, Tag, Tabs } from "antd";
import "../css/login.css";
import Chart from "react-apexcharts";
import { cpus } from "os";
import Highlighter from "react-highlight-words";
import Sidebar from "../ui/Sidebar";
import { Link } from "react-router-dom";
import pop from "../images/userfile.png";
import test from "../images/test.png";
import male from "../images/user.png";
import female from "../images/female.png";
import cfemale from "../images/cfemale.png";
import cmale from "../images/cmale.png";
import Sides from "../ui/Sidebar.js";
import tickAudio from "../sounds/accomplished.mp3";
import tockAudio from "../sounds/serious-strike.mp3";
import { Select } from 'antd';

const { Option } = Select;



function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}


const { Meta } = Card;
const { SubMenu } = Menu;
const { Text, Paragraph } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const { Search } = Input;

function onChange(date, dateString) {
  console.log(date, dateString);
}

function callback(key) {
  console.log(key);
}


class Requests extends Component {
  
  logout = () => {
    localStorage.clear();
  };

  reload = () => {
    fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=inprogress")
      .then(res => res.json())
      .then(data => {
        this.setState({ inprog: data });

        var pages = this.state.inprog.totalDocs / this.state.inprog.limit
        console.log(Math.round(pages))
        this.setState({numbers: Math.round(pages)})

        console.log("pendme",this.state.inprog.length);
        if(this.state.inprog.length >= 1){
          this.setState({rivpend: "#ff0066"})
        }

      })
      .catch(console.log);

    fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=pending")
      .then(res => res.json())
      .then(data => {
        this.setState({ pend: data });
       //console.log("pendme", this.state.pend.length);
       if(this.state.pend.length >= 1){
        this.setState({rivphlab: "#3461c1"})

        var pages = this.state.pend.totalDocs / this.state.pend.limit
        console.log(Math.round(pages))
        this.setState({numbers2: Math.round(pages)})
      }
      })
      .catch(console.log);


      fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=archived")
      .then(res => res.json())
      .then(data => {
        this.setState({ archiv: data });
        //console.log("archived", this.state.archiv);
        var pages = this.state.archiv.totalDocs / this.state.archiv.limit
        console.log(Math.round(pages))
        this.setState({numbers3: Math.round(pages)})
      })
      .catch(console.log);

    fetch(
      "http://192.241.145.208:8890/lims/tests/getTestsBy?status=samplecollected"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ collectedsamps: data });
        //console.log(this.state.collectedsamps);
        var pages = this.state.collectedsamps.totalDocs / this.state.collectedsamps.limit
        console.log(Math.round(pages))
        this.setState({numbers4: Math.round(pages)})

        if(this.state.collectedsamps.length >= 1){
          this.setState({ rivsamp: "#4579e2"})
        }
      })
      .catch(console.log);

    fetch(
      "http://192.241.145.208:8890/lims/tests/getTestsBy?status=complete"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ complete: data });
        this.setState({ roll: false });
        //console.log(this.state.complete);
        var pages = this.state.complete.totalDocs / this.state.inprog.limit
        console.log(Math.round(pages))
        this.setState({numbers5: Math.round(pages)})
      })
      .catch(console.log);

    fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=unverified")
      .then(res => res.json())
      .then(data => {
        this.setState({ unverified: data });
        this.setState({ roll: false });
        this.setState({rivdata: "#3814ff"})
        //console.log(this.state.complete);
        var pages = this.state.unverified.totalDocs / this.state.inprog.limit
        console.log(Math.round(pages))
        this.setState({numbers6: Math.round(pages)})
      })
      .catch(console.log);
  };
  enterUser = () => {
    this.props.history.push("/user");
  };

  onRow = r => ({
    onClick: () => {
      //console.log('values',r)
      localStorage.setItem("resid", r.id);
      localStorage.setItem("restest", r.testName);
      localStorage.setItem("resspecimen", r.specimenName);
      localStorage.setItem("restime", r.dateOrdered);
      this.props.history.push({
        pathname: "/results/resultspageog"
      });
    }
  });

  state = {
    filteredInfo: null,
    sortedInfo: null,
    searchText: "",
    stats: [],
    datas: [],
    inprog: [],
    collectedsamps: [],
    complete: [],
    unverified: [],
    pend: [],
    archiv:[],
    insearch:[],
    linda: [],
    visible: false,
    visible2: false,
    visible3: false,
    visible4:false,
    showtime: false,
    uname: [],
    ppic: [],
    role: [],
    bars: [],
    bars2: [],
    bars3: [],
    wabebe: [],
    avastyle: [],
    roll: true,
    notmessage: [],
    noticon: [],
    notcolor: [],
    nottitle: [],
    notmoji: [],
    phlaname: [],
    phlatest: [],
    phlano: [],
    phladate: [],
    buffs: [],
    blocksname: [],
    blocksgender: [],
    blocksno: [],
    blockphone: [],
    blockmail: [],
    blockaddress: [],
    blockregd: [],
    blocklast: [],
    blockdob: [],
    blockpatid: [],
    blockage: [],
    patgend: [],
    patcol: [],
    sampres:[],
    spinning:false,
    mario:true,
    rivpend: "#fff",
    rivsamp:"#fff",
    rivphlab:"#fff",
    rivdata:"#fff",
    bottom:0.1,
    saba:[],
    tabkey:1,
    magic:0,
    pageclick:1,
    pageclick2:1,
    pageclick3:1,
    pageclick4:1,
    pageclick5:1,
    pageclick6:1,
    numbers:[],
    numbers2:[],
    numbers3:[],
    numbers4:[],
    numbers5:[],
    numbers6:[],
    sim:[]
  };

  //search

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

  onChanges(value) {
    console.log(`selected ${value}`);

    this.setState({sim: value})
  }
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleCancel = () => {
    const mary = {
      sampleCode: sessionStorage.getItem("testsamplecode"),
      reason: "cancelled",
      rejected: "1"
    };
    fetch(
      "http://192.241.145.208:8890/lims/tests/updateSample?id=" +
        sessionStorage.getItem("testid"),
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.state.linda
        },
        body: JSON.stringify(mary)
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ bars2: data });

        //console.log("ðŸŒ¯ ",this.state.bars2)

        if (String(this.state.bars2.status).valueOf == String("200").valueOf) {
          this.setState({ noticon: "smile" });
          this.setState({ notcolor: "#3333FF" });
          this.setState({ nottitle: "okay" });
          this.setState({ notmoji: "ðŸ‘" });
        }
        if (String(this.state.bars2.status).valueOf == String("403").valueOf) {
          this.setState({ noticon: "frown" });
          this.setState({ notcolor: "#FF0000" });
          this.setState({ nottitle: "error" });
          this.setState({ notmoji: "ðŸŒµ" });
        }
        if (String(this.state.bars2.status).valueOf == String("500").valueOf) {
          this.setState({ noticon: "frown" });
          this.setState({ notcolor: "#FF0000" });
          this.setState({ nottitle: "error" });
          this.setState({ notmoji: "ðŸŒµ" });
        }
        var audio = new Audio(tickAudio);
        var audio2 = new Audio(tockAudio);
        //audio.play();
        sessionStorage.clear();
        //notification.open({
        //message: this.state.bars2.message,
        //description: this.state.bars2.error
        //});
        if (this.state.bars2.status === 200) {
          message.success(this.state.bars2.message);
          audio.play();
        }
        if (this.state.bars2.status === 403) {
          message.error(this.state.bars2.error);
          audio2.play();
        }
        if (this.state.bars2.status === 500) {
          message.error(this.state.bars3.error);
          audio2.play();
        }
        this.reload();
      })
      .catch(console.log);
    //var audio = new Audio(tockAudio);
    //audio.play();
  };

  handleSaba = () => {
    console.log(this.state.saba)
  }
  //search
  handleSubmite = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ animationtype: "squats" });
        //console.log("Received values of form: ", values);

        const mary = {
          testId: sessionStorage.getItem("testid"),
          userId: localStorage.getItem("uid"),
          orderId: localStorage.getItem("testod")
        };

        fetch("http://192.241.145.208:8890/lims/tests/addSample", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(mary)
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ bars3: data });
            //console.log("🥑"  ,this.state.bars3)
            this.setState({sampres: this.state.bars3.payload})
            
            console.log("🥑"  ,this.state.sampres)
            if (
              String(this.state.bars3.status).valueOf == String(200).valueOf
            ) {
              this.setState({ noticon: "smile" });
              this.setState({ notcolor: "#3333FF" });
              this.setState({ nottitle: "okay" });
              this.setState({ notmoji: "ðŸ‘" });

              var audio = new Audio(tickAudio);
              var audio2 = new Audio(tockAudio);
              //audio.play();
              sessionStorage.clear();
              //notification.open({
              //message: this.state.bars3.message,
              //description: this.state.bars3.error
              //});
              if (this.state.bars3.status === 200) {
                message.success(this.state.bars3.message);
                audio.play();
              }
              if (this.state.bars3.status === 403) {
                message.error(this.state.bars3.error);
                audio2.play();
              }
              if (this.state.bars3.status === 500) {
                message.error(this.state.bars3.error);
                audio2.play();
              }
              this.reload();
              this.onClose2();
              this.onOpen();

              fetch(
                "http://192.241.145.208:8890/lims/tests/getTestsBy?status=inprogress"
              )
                .then(res => res.json())
                .then(data => {
                  this.setState({ inprog: data.payload });

                  if(this.state.inprog.length >= 1){
                    this.setState({rivpend: "#ff0066"})
                  }
                  //console.log(this.state.inprog);
                })
                .catch(console.log);
              this.reload();
            } else {
              this.setState({ noticon: "frown" });
              this.setState({ notcolor: "#FF0000" });
              this.setState({ notmessage: "error" });
              this.setState({ notmoji: "ðŸŒµ" });

              var audio = new Audio(tickAudio);
              //audio.play();
              //notification.open({
              //message: this.state.bars3.message,
              //description: this.state.bars3.error
              //});
              if (
                String(this.state.bars3.status).valueOf == String(200).valueOf
              ) {
                message.success(this.state.bars3.message);

                audio.play();
              }
              this.reload();
            }
          })
          .catch(console.log);
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ animationtype: "squats" });
    console.log("were here");

    const mary = {
      deviceId: sessionStorage.getItem("testdevice"),
      id: sessionStorage.getItem("testid"),
      isDevice: sessionStorage.getItem("testdevice"),
      done_by: localStorage.getItem("uid")
    };

    fetch("http://192.241.145.208:8890/lims/tests/initiateTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mary)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars: data });

        var audio = new Audio(tickAudio);
        var audio2 = new Audio(tockAudio);
        //audio.play();
        //sessionStorage.clear();
        //notification.open({
        //message: this.state.bars.message,
        //description: this.state.bars.error
        //});
        if (this.state.bars.status === 200) {
          message.success(this.state.bars.message);
          audio.play();
        }
        if (this.state.bars.status === 403) {
          message.error(this.state.bars.error);
          audio2.play();
        }
        if (this.state.bars.status === 500) {
          message.error(this.state.bars3.error);
          audio2.play();
        }
        //this.reload();
        //this.props.form.resetFields();
        sessionStorage.clear();
        //window.location.reload()
        this.reload();
      })
      .catch(console.log);
  };

  componentDidMount() {
    if (localStorage.getItem("username") === null) {
      this.props.history.push("/");
    }
    fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=inprogress")
      .then(res => res.json())
      .then(data => {
        this.setState({ inprog: data });

        var pages = this.state.inprog.totalDocs / this.state.inprog.limit
        console.log(Math.round(pages))
        this.setState({numbers: Math.round(pages)})

        console.log("pendme",this.state.inprog.length);
        if(this.state.inprog.length >= 1){
          this.setState({rivpend: "#ff0066"})
        }

      })
      .catch(console.log);

    fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=pending")
      .then(res => res.json())
      .then(data => {
        this.setState({ pend: data });
       //console.log("pendme", this.state.pend.length);
       if(this.state.pend.length >= 1){
        this.setState({rivphlab: "#3461c1"})

        var pages = this.state.pend.totalDocs / this.state.pend.limit
        console.log(Math.round(pages))
        this.setState({numbers2: Math.round(pages)})
      }
      })
      .catch(console.log);


      fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=archived")
      .then(res => res.json())
      .then(data => {
        this.setState({ archiv: data });
        //console.log("archived", this.state.archiv);
        var pages = this.state.archiv.totalDocs / this.state.archiv.limit
        console.log(Math.round(pages))
        this.setState({numbers3: Math.round(pages)})
      })
      .catch(console.log);

    fetch(
      "http://192.241.145.208:8890/lims/tests/getTestsBy?status=samplecollected"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ collectedsamps: data });
        //console.log(this.state.collectedsamps);
        var pages = this.state.collectedsamps.totalDocs / this.state.collectedsamps.limit
        console.log(Math.round(pages))
        this.setState({numbers4: Math.round(pages)})

        if(this.state.collectedsamps.length >= 1){
          this.setState({ rivsamp: "#4579e2"})
        }
      })
      .catch(console.log);

    fetch(
      "http://192.241.145.208:8890/lims/tests/getTestsBy?status=complete"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ complete: data });
        this.setState({ roll: false });
        //console.log(this.state.complete);
        var pages = this.state.complete.totalDocs / this.state.inprog.limit
        console.log(Math.round(pages))
        this.setState({numbers5: Math.round(pages)})
      })
      .catch(console.log);

    fetch("http://192.241.145.208:8890/lims/tests/getTestsBy?status=unverified")
      .then(res => res.json())
      .then(data => {
        this.setState({ unverified: data });
        this.setState({ roll: false });
        this.setState({rivdata: "#3814ff"})
        //console.log(this.state.complete);
        var pages = this.state.unverified.totalDocs / this.state.inprog.limit
        console.log(Math.round(pages))
        this.setState({numbers6: Math.round(pages)})
      })
      .catch(console.log);

      fetch("http://192.241.145.208:8890/lims/tests/getOrders?multiple=true&",{
          method: "GET",
          headers: {
              "Content-Type": "application/json",

          },
      })
          .then(res => res.json())
          .then(data => {

              this.setState({ insearch: data.payload });
              console.log(this.state.saba)

          })
          .catch(console.log);
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  handleSearcher = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values.name);


      }
    });
  };

  onCha = page => {
    this.setState({
      pageclick: page,
    });

    fetch('http://192.241.145.208:8890/lims/tests/getTestsBy?status=inprogress&page='+this.state.pageclick, {
      method: 'GET',
      headers: {},
      data: JSON.stringify({
        email: sessionStorage.getItem('mail'),
        password: sessionStorage.getItem('pass')
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ inprog: data })
        console.log('content', this.state.inprog.totalDocs)
        console.log('contentas', this.state.inprog.limit)
        var pages = this.state.inprog.totalDocs / this.state.inprog.limit
        console.log(Math.round(pages))
        this.setState({numbers: Math.round(pages)})
      })
      .catch(console.log)
  };

  onCha3 = page => {
    this.setState({
      pageclick3: page,
    });

    fetch('http://192.241.145.208:8890/lims/tests/getTestsBy?status=archived&page='+this.state.pageclick3, {
      method: 'GET',
      headers: {},
      data: JSON.stringify({
        email: sessionStorage.getItem('mail'),
        password: sessionStorage.getItem('pass')
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ archiv: data })
        //console.log('content', this.state.arch.totalDocs)
        //console.log('contentas', this.state.inprog.limit)
        var pages = this.state.archiv.totalDocs / this.state.archiv.limit
        console.log(Math.round(pages))
        this.setState({numbers3: Math.round(pages)})
      })
      .catch(console.log)
  };
  onCha4 = page => {
    this.setState({
      pageclick4: page,
    });

    fetch('http://192.241.145.208:8890/lims/tests/getTestsBy?status=samplecollected&page='+this.state.pageclick4, {
      method: 'GET',
      headers: {},
      data: JSON.stringify({
        email: sessionStorage.getItem('mail'),
        password: sessionStorage.getItem('pass')
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ collectedsamps: data })
        //console.log('content', this.state.arch.totalDocs)
        //console.log('contentas', this.state.inprog.limit)
        var pages = this.state.collectedsamps.totalDocs / this.state.collectedsamps.limit
        console.log(Math.round(pages))
        this.setState({numbers4: Math.round(pages)})
      })
      .catch(console.log)
  };

  onCha6 = page => {
    this.setState({
      pageclick6: page,
    });

    fetch('http://192.241.145.208:8890/lims/tests/getTestsBy?status=unverified&page='+this.state.pageclick6, {
      method: 'GET',
      headers: {},
      data: JSON.stringify({
        email: sessionStorage.getItem('mail'),
        password: sessionStorage.getItem('pass')
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ unverified: data })
      //console.log('content', this.state.arch.totalDocs)
      //console.log('contentas', this.state.inprog.limit)
      var pages = this.state.unverified.totalDocs / this.state.unverified.limit
      console.log(Math.round(pages))
      this.setState({numbers6: Math.round(pages)})
    })
    .catch(console.log)
  };

  onCha5= page => {
    this.setState({
      pageclick5: page,
    });

    fetch('http://192.241.145.208:8890/lims/tests/getTestsBy?status=complete&page='+this.state.pageclick5, {
      method: 'GET',
      headers: {},
      data: JSON.stringify({
        email: sessionStorage.getItem('mail'),
        password: sessionStorage.getItem('pass')
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ complete: data })
      //console.log('content', this.state.arch.totalDocs)
      //console.log('contentas', this.state.inprog.limit)
      var pages = this.state.complete.totalDocs / this.state.complete.limit
      console.log(Math.round(pages))
      this.setState({numbers5: Math.round(pages)})
    })
    .catch(console.log)
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  onClose2 = () => {
    this.setState({
      visible2: false
    });
  };

  onClose3 = () => {
    this.setState({
      visible4: false
    });
  };

  onOpen = () => {
    this.setState({ visible4: true})
  }
  reset = () => {
    window.location.reload();
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
        ...this.getColumnSearchProps("patientName")
      },
      {
        title: "Date",
        dataIndex: "dateOrdered",
        key: "dateOrdered",
        ...this.getColumnSearchProps("dateOrdered")
      },
      {
        title: "OrderId",
        dataIndex: "orderId",
        key: "orderId",
        ...this.getColumnSearchProps("orderId")
      },
      {
        title: "Specimen",
        dataIndex: "specimenName",
        key: "specimenName",
        //...this.getColumnSearchProps("specimenName")
      },
      {
        title: "SpecimenId",
        dataIndex: "specimenId",
        key: "specimenId",
        //...this.getColumnSearchProps("specimenId")
      },
      {
        title: "Test",
        dataIndex: "testName",
        key: "testName"
        //...this.getColumnSearchProps("testName")
      },
      {
        title: "Status",
        dataIndex: "testStatus",
        key: "testStatus",
        //...this.getColumnSearchProps("testStatus")
      }
    ];

    const columnsf = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
        ...this.getColumnSearchProps("patientName")
      },
      {
        title: "Date",
        dataIndex: "dateOrdered",
        key: "dateOrdered",
        ...this.getColumnSearchProps("dateOrdered")
      },
      {
        title: "OrderId",
        dataIndex: "orderId",
        key: "orderId",
        ...this.getColumnSearchProps("orderId")
      },
      {
        title: "Specimen",
        dataIndex: "specimenName",
        key: "specimenName",
        //...this.getColumnSearchProps("specimenName")
      },
      {
        title: "SpecimenId",
        dataIndex: "specimenId",
        key: "specimenId",
        //...this.getColumnSearchProps("specimenId")
      },
      {
        title: "Test",
        dataIndex: "testName",
        key: "testName"
      },
      {
        title: "Status",
        dataIndex: "testStatus",
        key: "testStatus",
        ...this.getColumnSearchProps("testStatus")
      }
    ];

    const columnsfe = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        //...this.getColumnSearchProps("id")
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
        //...this.getColumnSearchProps("patientName")
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        key: "doctor",
        //...this.getColumnSearchProps("patientName")
      },
      {
        title: "Date",
        dataIndex: "orderTime",
        key: "orderTime",
        //...this.getColumnSearchProps("dateOrdered")
      },
      {
        title: "OrderId",
        dataIndex: "orderId",
        key: "orderId",
        //...this.getColumnSearchProps("orderId")
      },
      {
        title: "Specimen",
        dataIndex: "specimenName",
        key: "specimenName",
       // ...this.getColumnSearchProps("specimenName")
      },
      {
        title: "SpecimenId",
        dataIndex: "specimenId",
        key: "specimenId",
        //...this.getColumnSearchProps("specimenId")
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      }
    ];

    const columns2 = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
        ...this.getColumnSearchProps("patientName")
      },
      {
        title: "Date",
        dataIndex: "dateOrdered",
        key: "dateOrdered",
        ...this.getColumnSearchProps("lastname")
      },
      {
        title: "OrderId",
        dataIndex: "orderId",
        key: "orderId",
        ...this.getColumnSearchProps("orderId")
      },
      {
        title: "Specimen",
        dataIndex: "specimenName",
        key: "specimenName",
        //...this.getColumnSearchProps("specimenName")
      },
      {
        title: "SpecimenId",
        dataIndex: "specimenId",
        key: "specimenId",
        //...this.getColumnSearchProps("specimenId")
      },
      {
        title: "Test",
        dataIndex: "testName",
        key: "testName",
        ...this.getColumnSearchProps("testName")
      },
      {
        title: "Status",
        dataIndex: "testStatus",
        key: "testStatus",
        ...this.getColumnSearchProps("testStatus")
      }
    ];

    const columns3 = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
        ...this.getColumnSearchProps("patientName")
      },
      {
        title: "Patient No",
        dataIndex: "patientNo",
        key: "patientNo",
        ...this.getColumnSearchProps("patientNo")
      },
      {
        title: "Date",
        dataIndex: "dateOrdered",
        key: "dateOrdered",
        ...this.getColumnSearchProps("dateOrdered")
      },

      {
        title: "Device",
        dataIndex: "device",
        key: "device",
        ...this.getColumnSearchProps("device")
      }
    ];

    const columns33 = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Patient Name",
        dataIndex: "patientName",
        key: "patientName",
        ...this.getColumnSearchProps("patientName")
      },
      {
        title: "Order ID",
        dataIndex: "orderId",
        key: "orderID",
        ...this.getColumnSearchProps("orderId")
      },
      {
        title: "Test Name",
        dataIndex: "testName",
        key: "testName",
        //..this.getColumnSearchProps("testName")
      },
      {
        title: "Patient No",
        dataIndex: "patientNo",
        key: "patientNo",
        ...this.getColumnSearchProps("patientNo")
      },
      {
        title: "Date",
        dataIndex: "dateOrdered",
        key: "dateOrdered",
        ...this.getColumnSearchProps("dateOrdered")
      },

      {
        title: "Device",
        dataIndex: "device",
        key: "device",
        //...this.getColumnSearchProps("device")
      }
    ];

    const cola = [
      {
        title: ' Test Name',
        dataIndex: 'testName',
        key: 'testName',
      },
      {
        title: 'Specimen Name',
        dataIndex: 'specimenName',
        key:'specimenName',
      },
      {
        title: "SpecimenId",
        dataIndex: "specimenId",
        key: "specimenId",
        //...this.getColumnSearchProps("specimenId")
      },
      {
        title: 'SampleCode',
        dataIndex: 'sampleCode',
        key:'sampleCode'
      },
    
      
    ];

    const rowSelection = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //console.log( 'selectedRows: ', selectedRows[0]);
        sessionStorage.setItem("spspecimen", selectedRows[0].specimenName);
        sessionStorage.setItem("sppatientname", selectedRows[0].patientName);
        sessionStorage.setItem("sptestname", selectedRows[0].testName);
        sessionStorage.setItem("sptestid", selectedRows[0].id);
        localStorage.setItem("oda", selectedRows[0].orderId);
        this.props.history.push("/test/savetest");
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    const rowSelectioner = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //console.log( 'selectedRows: ', selectedRows[0]);
        sessionStorage.setItem("vpspecimen", selectedRows[0].specimenName);
        sessionStorage.setItem("vppatientname", selectedRows[0].patientName);
        sessionStorage.setItem("vptestname", selectedRows[0].testName);
        sessionStorage.setItem("vptestid", selectedRows[0].id);
        localStorage.setItem("voda", selectedRows[0].orderId);
        sessionStorage.setItem("sptestid",selectedRows[0].id)
        //this.props.history.push("/test/verifytest");
        this.props.history.push("/verify");
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };
    const rowSelectiona = {
      type:"radio",
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const rowSelection2 = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        console.log("selectedRows2: ", selectedRows[0]);
        sessionStorage.setItem("testid", selectedRows[0].id);
        sessionStorage.setItem("testdevice", selectedRows[0].device);
        sessionStorage.setItem("testsamplecode", selectedRowKeys[0].sampleCode);
        sessionStorage.setItem("testpat", selectedRows[0].patientName);
        sessionStorage.setItem("testspec", selectedRows[0].specimenName);
        sessionStorage.setItem("testdate", selectedRows[0].dateOrdered);
        sessionStorage.setItem("test", selectedRows[0].testName);

        fetch("http://192.241.145.208:8890/lims/patients/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("key")
          },
          body: JSON.stringify({
            name: selectedRows[0].patientName
          })
        })
          .then(res => res.json())
          .then(data => {
            //🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯🚯
            this.setState({ animationtype: "Untitled" });
            this.setState({ bars: data });

            console.log(this.state.bars);
            this.setState({ blocksname: data.payload[0].name });
            this.setState({ blockpatid: data.payload[0].id });
            this.setState({ blocksno: data.payload[0].patientNo });
            this.setState({ blockphone: data.payload[0].phone });
            this.setState({ blockmail: data.payload[0].email });
            this.setState({ blocksgender: data.payload[0].sex });
            this.setState({ blockaddress: data.payload[0].address });
            this.setState({ blockregd: data.payload[0].regDate });
            this.setState({ blocklast: data.payload[0].lastupdate });
            this.setState({ blockdob: data.payload[0].dob });
            this.setState({ blockage: data.payload[0].age });
          })
          .catch(console.log);

        this.setState({
          visible: true
        });
      },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };

    const rowSelection22 = {
      type: "radio",
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ spinning: true})
        //console.log( 'selectedRows22: ', selectedRows[0]);
        sessionStorage.setItem("testid", selectedRows[0].id);
        sessionStorage.setItem("testdevice", selectedRows[0].device);
        sessionStorage.setItem("testsamplecode", selectedRows[0].sampleCode);
        sessionStorage.setItem("testpat", selectedRows[0].patientName);
        sessionStorage.setItem("testnam", selectedRows[0].testName);
        sessionStorage.setItem("teststa", selectedRows[0].testStatus);
        sessionStorage.setItem("testdate",selectedRows[0].dateOrdered)
        localStorage.setItem("testod",selectedRows[0].orderId)

        fetch("http://192.241.145.208:8890/lims/patients/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("key")
          },
          body: JSON.stringify({
            name: selectedRows[0].patientName
          })
        })
          .then(res => res.json())
          .then(data => {



            this.setState({ bars: data });
            //console.log("state bars ", this.state.bars);
            //console.log("payload", data.payload);
            // this.state.bars.payload[0].color = this.state.bars.payload[0].sex == "M" ? 'https://img.icons8.com/color/48/000000/male-stroke-v.png': 'img src="https://img.icons8.com/color/48/000000/female.png'


            //console.log(this.state.bars);
            this.setState({ blocksname: data.payload[0].name });
            this.setState({ blockpatid: data.payload[0].id });
            this.setState({ blocksgender: data.payload[0].sex });
            this.setState({ blocksno: data.payload[0].patientNo });
            this.setState({ blockphone: data.payload[0].phone });
            this.setState({ blockmail: data.payload[0].email });
            this.setState({ blockaddress: data.payload[0].address });
            this.setState({ blockregd: data.payload[0].regDate });
            this.setState({ blocklast: data.payload[0].lastupdate });
            this.setState({ blockdob: data.payload[0].dob });
            this.setState({ blockage: data.payload[0].age });
            this.setState({ patgend: data.payload[0].gender });
            this.setState({ patcol: data.payload[0].color });
          })
          .catch(console.log);

          if (typeof this.state.patcol != undefined){
            this.setState({spinning: false})
            this.setState({visible2: true})
          }
          //this.setState({spinning: false})
        //this.setState({visible2: true});
      },

    };
    return (
      <Layout style={{ background: "#fff" }}>
        <Sides />
        <Layout style={{ background: "#fff" }}>

        <Drawer
            title="Print Samples"
            width={720}
            onClose={this.onClose3}
            visible={this.state.visible4}
            style={{
              overflow: "auto",
              height: "100",
              paddingBottom: "108px"
            }}
          >
            <div>
            <Table  rowSelection={rowSelectiona} columns={cola} dataSource={this.state.sampres} />
            </div>
            
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            ></div>
          </Drawer>

          

          

          <Drawer
            title="Verify Results"
            width={720}
            onClose={this.onClose2}
            visible={this.state.visible3}
            style={{
              overflow: "auto",
              height: "100%",
              paddingBottom: "108px"
            }}
          >
            <Form
              layout="vertical"
              hideRequiredMark
              onSubmit={this.handleSubmite}
            >
              <Row style={{ padding: 150 }} gutter={16}>
                <Form.Item label="Device id">
                  {getFieldDecorator("deviceid", {
                    initialValue: sessionStorage.getItem("testdevice"),
                    rules: [
                      {
                        required: true,
                        message: "Please input your Device Id!"
                      }
                    ]
                  })(
                    <Input
                      className="raytrace"
                      prefix={
                        <Icon
                          type="tablet"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Device id"
                    />
                  )}
                </Form.Item>

                <Form.Item label="Test Name">
                  {getFieldDecorator("testname", {
                    initialValue: sessionStorage.getItem("testnam"),
                    rules: [
                      {
                        required: true,
                        message: "Please input your Test Name!"
                      }
                    ]
                  })(
                    <Input
                      className="raytrace"
                      prefix={
                        <Icon
                          type="solution"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Test id"
                    />
                  )}
                </Form.Item>

                <Form.Item label="Test id">
                  {getFieldDecorator("testid", {
                    initialValue: sessionStorage.getItem("testid"),
                    rules: [
                      {
                        required: true,
                        message: "Please input your Test id!"
                      }
                    ]
                  })(
                    <Input
                      className="raytrace"
                      prefix={
                        <Icon
                          type="solution"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Test id"
                    />
                  )}
                </Form.Item>

                <Form.Item label="Patient Name">
                  {getFieldDecorator("patientname", {
                    initialValue: sessionStorage.getItem("testpat"),
                    rules: [
                      {
                        required: true,
                        message: "Set patient name"
                      }
                    ]
                  })(
                    <Input
                      className="raytrace"
                      prefix={
                        <Icon
                          type="carry-out"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="patientname"
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <ButtonGroup className="logdivspace">
                    <Button
                      type="primary"
                      className="raytrace"
                      style={{ width: 300 }}
                      htmlType="submit"
                    >
                      <Icon type="experiment" />
                      Collect Specimen
                    </Button>
                  </ButtonGroup>
                </Form.Item>
              </Row>
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            ></div>
          </Drawer>

          <Drawer
            title="Collect specimen"
            width={720}
            onClose={this.onClose2}
            visible={this.state.visible2}
            style={{
              overflow: "auto",
              height: "100%",
              
            }}
          >
            <Form
              layout="vertical"
              hideRequiredMark
              onSubmit={this.handleSubmite}
            >
              <Row style={{ padding: 150 }} gutter={16}>
                <div style={{ padding: 40 }}>
                  {" "}
                  <Card
                    className="fay"
                    style={{ width: 300, borderRadius: 25 }}
                    cover={<img alt="example" src={pop} />}
                  >
                    <Meta
                      avatar={<Avatar src={male} />}
                      title={sessionStorage.getItem("testpat")}
                      description={
                        <div>
                          <p>
                            <b>Patient no:&nbsp;&nbsp;&nbsp;</b>
                            {this.state.blockpatid}
                          </p>
                          <p>
                            <b>Age:&nbsp;&nbsp;&nbsp;</b>
                            {this.state.blockage}
                          </p>
                          <p>
                            <b>Sex:&nbsp;&nbsp;&nbsp;</b>
                            {this.state.blocksgender}
                          </p>
                        </div>
                      }
                    />
                  </Card>
                </div>
                <Result
                  status="info"
                  title="Phlabetomy Details"
                  subTitle="Please check and modify the following information before resubmitting."
                >
                  <div className="desc">
                    <Paragraph>
                      <Text
                        strong
                        style={{
                          fontSize: 16
                        }}
                      >
                        The following are the test details
                      </Text>
                    </Paragraph>
                    <Paragraph>
                      <Icon style={{ color: "green" }} type="tablet" />{" "}
                      <b>Device : </b> {sessionStorage.getItem("testdevice")}
                    </Paragraph>
                    <Paragraph>
                      <Icon style={{ color: "green" }} type="file-done" />{" "}
                      <b>Test :</b> {sessionStorage.getItem("testnam")}
                    </Paragraph>

                    <Paragraph>
                      <Icon style={{ color: "green" }} type="calendar" />{" "}
                      <b>Date :</b> {sessionStorage.getItem("testdate")}
                    </Paragraph>
                  </div>
                </Result>

                <Form.Item>
                  <ButtonGroup className="logdivspace">
                    <Button
                      type="primary"
                      className="raytrace"
                      style={{ width: 300 }}
                      htmlType="submit"
                    >
                      <Icon type="experiment" />
                      Collect Specimen
                    </Button>
                  </ButtonGroup>
                </Form.Item>
              </Row>
            </Form>
            
          </Drawer>

          <Drawer
            title="Initialise Test"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
            style={{
              overflow: "hidden",
              height: "100%",
              paddingBottom: "108px"
            }}
          >
            <Form
              layout="vertical"
              hideRequiredMark
              onSubmit={this.handleSubmit}
            >
              <Row style={{ padding: 150 }} gutter={16}>
                <div style={{ padding: 40 }}>
                  <Card
                    className="fay"
                    style={{ width: 300, borderRadius: 25 }}
                    cover={<img alt="example" src={test} />}
                  >
                    <Meta
                      avatar={<Avatar src={male} />}
                      title={sessionStorage.getItem("testpat")}
                      description={
                        <div>
                          <p>
                            <b>Patient no:&nbsp;&nbsp;&nbsp;</b>
                            {this.state.blockpatid}
                          </p>
                          <p>
                            <b>Age:&nbsp;&nbsp;&nbsp;</b>
                            {this.state.blockage}
                          </p>
                          <p>
                            <b>Sex:&nbsp;&nbsp;&nbsp;</b>
                            {this.state.blocksgender}
                          </p>
                        </div>
                      }
                    />
                  </Card>
                </div>

                <Result
                  status="info"
                  title="Test Details"
                  subTitle="Please check and modify the following information before resubmitting."
                >
                  <div className="desc">
                    <Paragraph>
                      <Text
                        strong
                        style={{
                          fontSize: 16
                        }}
                      >
                        The following are the test details
                      </Text>
                    </Paragraph>
                    <Paragraph>
                      <Icon style={{ color: "green" }} type="tablet" />{" "}
                      <b>Device : </b> {sessionStorage.getItem("testdevice")}
                    </Paragraph>
                    <Paragraph>
                      <Icon style={{ color: "green" }} type="file-done" />{" "}
                      <b>Test :</b> {sessionStorage.getItem("test")}
                    </Paragraph>
                    <Paragraph>
                      <Icon style={{ color: "green" }} type="schedule" />{" "}
                      <b>Specimen :</b> {sessionStorage.getItem("testspec")}
                    </Paragraph>
                    <Paragraph>
                      <Icon style={{ color: "green" }} type="calendar" />{" "}
                      <b>Date :</b> {sessionStorage.getItem("testdate")}
                    </Paragraph>
                  </div>
                </Result>

                <Form.Item>
                  <ButtonGroup className="logdivspace" style={{paddingLeft: 80}}>
                    <Button
                      type="primary"
                      className="raytrace"
                      style={{ width: 100 }}
                      htmlType="submit"
                    >
                      <Icon type="cloud" />
                      Initiate
                    </Button>
                    <Button
                      type="primary"
                      className="raytrace"
                      onClick={this.handleCancel}
                      style={{ width: 100 }}
                    >
                      Cancel
                      <Icon type="close" />
                    </Button>
                  </ButtonGroup>
                </Form.Item>
              </Row>
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            ></div>
          </Drawer>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ background: "#fff" }}>
            <div style={{  padding: "30px" }}>
            <div style={{paddingBottom: 40}}>

            <PageHeader
            
              onBack={() => window.history.back()}
              title="Requests"
            
              subTitle="transactions on system"
              extra={[
                <Button type="primary"
                onClick={()=>this.props.history.push("/test/order")}>
                Place Order
                <Icon type="folder-open" />
              </Button>

              ]}
            >

            </PageHeader>
            </div>

              <Spin indicator={antIcon} spinning={this.state.spinning}>
              <Tabs defaultActiveKey={this.state.tabkey} style={{paddingBottom: 80}}>
                <TabPane tab="Pending" key="1">
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowKey="id"
                        columns={columns3}
                        dataSource={this.state.pend.payload}
                        pagination={false}
                      />
                      <div style={{ paddingTop: 20}}>
                      <Pagination current={this.state.pageclick2} onChange={this.onCha} total={this.state.numbers2} />
                      </div>
                    </Spin>
                  </div>
                </TabPane>

                <TabPane tab="Archived" key="2">
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowKey="id"
                        columns={columns3}
                        dataSource={this.state.archiv.payload}
                        pagination={false}
                      />
                      <div style={{ paddingTop: 20}}>
                      <Pagination current={this.state.pageclick3} onChange={this.onCha3} total={this.state.numbers3} />
                      </div>
                    </Spin>
                  </div>
                </TabPane>

                <TabPane tab="Phlabetomy" key="3">
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowKey="id"
                        rowSelection={rowSelection22}
                        columns={columns33}
                        dataSource={this.state.pend.payload}
                        pagination={false}
                      />
                      <div style={{ paddingTop: 20}}>
                      <Pagination current={this.state.pageclick} onChange={this.onCha} total={this.state.numbers} />
                      </div>
                    </Spin>
                  </div>
                </TabPane>
                <TabPane tab="Initialise Test" key="4">
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowSelection={rowSelection2}
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.collectedsamps.payload}
                        pagination={false}
                      />
                      <div style={{ paddingTop: 20}}>
                      <Pagination current={this.state.pageclick4} onChange={this.onCha4} total={this.state.numbers4} />
                      </div>
                    </Spin>
                  </div>
                </TabPane>

                <TabPane tab="in Progress" key="5">
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowKey="id"
                        rowSelection={rowSelection}
                        columns={columns2}
                        dataSource={this.state.inprog.payload}
                        pagination={false}
                      />
                      <div style={{ paddingTop: 20}}>
                      <Pagination current={this.state.pageclick} onChange={this.onCha} total={this.state.numbers} />
                      </div>
                    </Spin>
                  </div>
                </TabPane>

                <TabPane tab="Verify Results" key="6">
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowSelection={rowSelectioner}
                        rowKey="id"
                        columns={columns}
                        dataSource={this.state.unverified.payload}
                      />
                      <div style={{ paddingTop: 20}}>
                      <Pagination current={this.state.pageclick6} onChange={this.onCha6} total={this.state.numbers6} />
                      </div>
                    </Spin>
                  </div>
                </TabPane>

                <TabPane tab="Complete" key="7">
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowKey="id"
                        onRow={this.onRow}
                        columns={columnsf}
                        dataSource={this.state.complete.payload}
                        pagination={false}
                      />
                      <div style={{ paddingTop: 20}}>
                      <Pagination current={this.state.pageclick5} onChange={this.onCha5} total={this.state.numbers5} />
                      </div>
                    </Spin>
                  </div>
                </TabPane>


                <TabPane tab="Search" key="8" >
                <Row>




                <Select
                  id="joy"
                  showSearch
                  style={{ width: 200, paddingRight: 30 }}
                  placeholder="Select a Search criteria"
                  optionFilterProp="children"
                  onChange={(value)=>this.setState({sim: value})}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="id">id</Option>
                  <Option value="sampleId">sampleId</Option>
                  <Option value="patientName">patientName</Option>
                </Select>

                <Search
                placeholder="Search for order id"
                onSearch={value => {
                  this.setState({saba: value})
                  this.setState({tabkey: 8})
                  console.log(value)
                  console.log("sim",this.state.sim)
                  fetch("http://192.241.145.208:8890/lims/tests/getOrders?multiple=true&"+this.state.sim+"="+value, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",

                    },
                  })
                    .then(res => res.json())
                    .then(data => {

                      this.setState({ insearch: data.payload });
                      console.log(this.state.saba)

                    })
                    .catch(console.log);
                }
              }
                style={{ width: 200 }}

              />              
              </Row>
              <br />
                  <div className="dtable">
                    <Spin spinning={this.state.roll}>
                      <Table
                        rowKey="id"
                        //onRow={this.onRow}
                        columns={columnsfe}
                        dataSource={this.state.insearch}
                      />
                    </Spin>
                  </div>
                </TabPane>
              </Tabs>
              </Spin>
            </div>
            

          </Content>

        </Layout>

      </Layout>
    );
  }
}
const WrappedRegistrationForm = Form.create({ name: "register" })(Requests);

export default WrappedRegistrationForm;
