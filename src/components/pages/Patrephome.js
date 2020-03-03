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
    Statistic,
    Table,
    List,
    Divider,
    Tag,
    Breadcrumb
} from "antd";
import "../css/login.css";
import Chart from "react-apexcharts";
import { cpus } from "os";
import { Link } from "react-router-dom";
import pop from "../images/prop2.png";
import Kamtu from '../images/145853.png'
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
        loading: true,
        males:[],
        malepct:[],
        femalepct:[],
        females:[],
        patients:[],
        datas:[]
    };

    logout = () => {
        localStorage.clear();
    };
    enterUser = () => {
        this.props.history.push("/user");
    };

    onRow = r => ({
        onClick: () => {
            console.log('values', r)
            sessionStorage.setItem("ppname", r.name);
            sessionStorage.setItem("ppno", r.patientNo);
            sessionStorage.setItem("ppsex", r.sex);
            sessionStorage.setItem("ppdob", r.dob);
            sessionStorage.setItem("pid", r.id);
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

        fetch("http://192.241.145.208:8890/lims/v1/auth", {
            method: "GET",
            headers: {
                Authorization: "Basic bGltc19hY2Nlc3M6MTJAITIzIzQk",
                "Access-Control-Allow-Credentials": "true",
                Accept: "*/*",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ linda: data.payload.token });
                this.setState({ uname: localStorage.getItem("username") });
                this.setState({ ppic: localStorage.getItem("ppic") });
                this.setState({ role: localStorage.getItem("role") });

                var untu;
                untu = localStorage.getItem("username").slice(0, 3);
                this.setState({ uname: untu });
                if (
                    String(localStorage.getItem("ppic")).valueOf ==
                    String("http://192.241.145.208:8890/lims/uploads/fileName=undefined")
                        .valueOf
                ) {
                    this.setState({ avastyle: "#f56a00" });
                } else {
                    this.setState({ ppic: localStorage.getItem("ppic") });
                }
            })
            .catch(console.log);

        fetch("http://192.241.145.208:8890/lims/patients/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + localStorage.getItem("key")
            },
            body: JSON.stringify({})
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
                title: "Patient no",
                dataIndex: "patientNo",
                key: "patientNo",
                ...this.getColumnSearchProps("patientNo")
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                ...this.getColumnSearchProps("name")
            },
            {
                title: "Sex",
                dataIndex: "sex",
                key: "sex",
                ...this.getColumnSearchProps("sex")
            },
            {
                title: "DOB",
                dataIndex: "dob",
                key: "dob",
                ...this.getColumnSearchProps("dob")
            },
            {
                title: "Age",
                dataIndex: "age",
                key: "age",
                ...this.getColumnSearchProps("age")
            },
            {
                title: "Phone",
                dataIndex: "phone",
                key: "phone",
                ...this.getColumnSearchProps("phone")
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                ...this.getColumnSearchProps("email")
            },
            {
                title: "Address",
                dataIndex: "address",
                key: "address",
                ...this.getColumnSearchProps("address")
            },
            {
                title: "Reg Date",
                dataIndex: "regDate",
                key: "regDate",
                ...this.getColumnSearchProps("regDate")
            },
            {
                title: "Last Update",
                dataIndex: "lastUpdate",
                key: "lastUpdate",
                ...this.getColumnSearchProps("lastUpdate")
            }
        ];
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
                                <div>

                                    <PageHeader
                                        onBack={() => window.history.back()}
                                        title="Patients"
                                        tags={<Tag color="blue">from System</Tag>}
                                        subTitle="Summary of patients"
                                        extra={[

                                            <Button key="1" type="primary" href={"/reports/patientrepo/"}>
                                               Manual Search
                                            </Button>
                                        ]}
                                    >

                                    </PageHeader>
                                </div>


                                <div  style={{ background: "#fff" }}>

                                    <List
                                        itemLayout="vertical"
                                        dataSource={this.state.bars}
                                        pagination={{

                                            pageSize: 6,
                                        }}

                                        renderItem={item => (
                                            <List.Item
                                            >
                                                <List.Item.Meta
                                                    rowKey={item.name}
                                                    avatar={<Avatar src="https://image.flaticon.com/icons/svg/145/145867.svg" />}
                                                    title={<a href={"/reports/patientrepo/?x="+item.name}>{item.name}</a>}
                                                    description="Patient Details"
                                                />
                                                <div style={{ paddingLeft: 30}}><Button type="primary" href={"/reports/patientrepo/?x=" + item.name}>
                                                    View Details
                                                    <Icon type="right"/>
                                                </Button></div>

                                                <div className="card green" style={{ width: 500, height: 200}} >
                                                    <div className="additional">
                                                        <div className="user-card">
                                                            <div className="level center">
                                                                {item.patienteNo}
                                                            </div>
                                                            <div className="points center">
                                                                {item.patientNo}
                                                            </div>
                                                            <img width={110} height={110}  xmlns="" role="img" aria-labelledby="title desc" className="center" src={Kamtu}/>


                                                        </div>
                                                        <div className="more-info">
                                                            <h1>{item.name}</h1>
                                                            <div className="coords" style={{color: "#fff"}}>
                                                                <span><b>Address</b></span>
                                                                <span >{item.address}</span>
                                                            </div>
                                                            <div className="coords" style={{color: "#fff"}}>
                                                                <span><b>Date of birth</b></span>
                                                                <span>{item.dob}</span>
                                                            </div>
                                                            <div className="coords" style={{color: "#fff"}}>
                                                                <span><b>Email</b></span>
                                                                <span>{item.email}</span>
                                                            </div>
                                                            <div className="coords" style={{color: "#fff"}}>
                                                                <span><b>Phone</b></span>
                                                                <span>{item.phone}</span>
                                                            </div>
                                                            <div className="stats">
                                                                <div>
                                                                    <div className="title" >Age</div>
                                                                    <i className="fa fa-trophy" />
                                                                    <div className="value">{item.age}</div>
                                                                </div>
                                                                <div>
                                                                    <div className="title">Sex</div>
                                                                    <i className="fa fa-gamepad" />
                                                                    <div className="value">{item.sex}</div>
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="general">
                                                        <h1>{item.name}</h1>

                                                        <div className="coords" style={{paddingTop: 40}}>
                                                            <span><b>Registration Date</b></span>&nbsp;&nbsp;
                                                            <span>{item.regDate}</span>
                                                        </div>
                                                        <div className="coords">
                                                            <span><b>Last Update</b></span>&nbsp;&nbsp;
                                                            <span>{item.lastUpdate}</span>
                                                        </div>
                                                        <span className="more">Mouse over the card for more info</span>
                                                    </div>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
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
