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
    Table,
    Modal,
    Input,
    AutoComplete, Pagination
} from "antd";
import {
    Avatar,
    Card,
    Row,
    PageHeader,
    Typography,
    Empty,
    List,
    Descriptions,
    Button,
    Form,
} from "antd";
import "../css/login.css";
import { Link } from "react-router-dom";
import Sides from "../ui/Sidebar.js";

const { Header, Content, Footer, Sider } = Layout;

const columns = [


    {
        title: 'Test Id',
        dataIndex: 'testId',
        key: 'testId',
        width: 100,
    },
    {
        title: 'Date Name',
        dataIndex: 'resultTime',
        key: 'resultTime',
        width: 150,
    },
    {
        title: 'Test Group',
        dataIndex: 'testGroup',
        key: 'testGroup',
        width: 150,
    },

    {
        title: 'Patient No',
        dataIndex: 'patient_no',
        key: 'patient_no',
        width: 70,


    },
    {
        title: 'Patient Name',
        dataIndex: 'patientName',
        key: 'patientName',
        width: 150,

    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 100,
    },
    {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
        width: 100,
    },

    {
        title: 'Specimen Id',
        dataIndex: 'specimenId',
        key: 'specimenId',
        width: 150,

    },
    {
        title: 'Specimen Name',
        dataIndex: 'specimenName',
        key: 'specimenName',
        width: 150,
    },
    {
        title: 'Source',
        dataIndex: 'specimenSource',
        key: 'specimenSource',
        width: 100,
    },
    {
        title: 'Specimen Time',
        dataIndex: 'specimenTime',
        key: 'specimenTime',
        width: 100,
    },

    {
        title: 'Proceedure Code',
        dataIndex: 'procedureCode',
        key: 'procedureCode',
        width: 80,

    },
    {
        title: 'Procedure',
        dataIndex: 'procedureName',
        key: 'procedureName',
        width: 150,
    },

    {
        title: 'Done by',
        dataIndex: 'done_by',
        key: 'done_by',
        width: 80,

    },
    {
        title: 'Validated by',
        dataIndex: 'validated_by',
        key: 'validated_by',
        width: 150,
    },
    {
        title: 'Device',
        dataIndex: 'deviceName',
        key: 'deviceName',
        width: 150,
    },
    {
        title: 'Comments',
        dataIndex: 'comments',
        key: 'comments',
        width: 150,
    }



];

const columnsmini = [
    {
        title: <b>Parameter</b>,
        dataIndex: 'parameter',
    },
    {
        title: <b>Units</b>,
        dataIndex: 'units',
    },
    {
        title: <b>Flag</b>,
        dataIndex: 'flag',
    },
    {
        title: <b>Value</b>,
        dataIndex: 'value',
    },
    {
        title: <b>Lower Limit</b>,
        dataIndex: 'lowerLimit',
    },
    {
        title: <b>Upper Limit</b>,
        dataIndex: 'upperLimit',
    },
]

const { Search } = Input;

const { Text } = Typography;

class AddTest extends Component {
    logout = () => {
        localStorage.clear();
    };

    enterUser = () => {
        this.props.history.push("/user");
    };

    state = {
        bars:[],
        alpheta:[],
        pageclick: 1,
        numbers:[],
        datekeeper:[],
        visible:false,
        visible2:false,
        mavitu:[],
        patientName:[],
        parientAge:[],
        patientSex:[],
        patientDoneby:[],
        parientComment:[],
        makusu:[]
    };


    componentDidMount() {

        function getUrlVars() {

            var Muma = []
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }

        var number = getUrlVars()["x"];


        console.log("newby",decodeURIComponent(number));
        this.setState({makusu: decodeURIComponent(number)})

        fetch(
            process.env.REACT_APP_GETRESULTALL ,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patientName: decodeURIComponent(number),

                })
            },

        )
            .then(res => res.json())
            .then(data => {

                this.setState({bars: data})
                this.setState({mavitu: this.state.bars.payload[0].results})
                this.setState({patientName: this.state.bars.payload[0].patientName})
                this.setState({patientAge: this.state.bars.payload[0].age})
                this.setState({patientSex: this.state.bars.payload[0].gender})
                this.setState({patientDoneby: this.state.bars.payload[0].done_by})
                this.setState({patientComment: this.state.bars.payload[0].comments})
                console.log('content', this.state.bars.totalDocs)
                console.log('contentas', this.state.bars.limit)
                var pages = this.state.bars.totalDocs / this.state.bars.limit
                console.log("math",Math.round(pages))
                this.setState({numbers: Math.round(pages)})
                console.log("numba",this.state.numbers)

            })
            .catch(console.log);


        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        this.setState({datekeeper: today})


    }



    onCha = page => {
        this.setState({
            pageclick: page,
        });

        fetch(process.env.REACT_APP_GETRESULTALL+this.state.pageclick, {
            method: 'POST'

        })
            .then(res => res.json())
            .then(data => {
                this.setState({ bars: data })
                console.log(this.state.bars.payload[0].results)
                var pages = this.state.bars.totalDocs / this.state.bars.limit
                console.log(Math.round(pages))
                this.setState({numbers: Math.round(pages)})
            })
            .catch(console.log)
    };


    render() {
        var kis;
        var soph;
        var fay;
        var kus;

        function isJson(str) {
            try {
                kus =JSON.parse(str);
            } catch (e) {
                return kus;
            }
            return kus;
        }
        return (
            <Layout style={{ background: "#fff" }}>

                <Layout style={{ background: "#fff" }}>
                    <Header style={{ background: "#fff" }} />
                    <Content style={{}}>
                        <div style={{ background: "#fff" }}>
                            <div >
                                <PageHeader style={{ paddingBottom: 20}}
                                            onBack={() => window.history.back()}
                                            title="Patient Report"
                                            subTitle="result summary"
                                            extra={[
                                                <div>
                                                    <Button type="primary" onClick={()=>{
                                                        var printContents = document.getElementById('maku').innerHTML;
                                                        var originalContents = document.body.innerHTML;
                                                        document.body.innerHTML = printContents;
                                                        window.print();
                                                        document.body.innerHTML = originalContents
                                                    }}>
                                                        Export
                                                        <Icon type="printer" />
                                                    </Button> &nbsp;&nbsp;


                                                    <Search
                                                        placeholder="Patient Name"
                                                        onSearch={value => {
                                                            fetch(
                                                                process.env.REACT_APP_GETRESULTALL ,
                                                                {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json"
                                                                    },
                                                                    body: JSON.stringify({
                                                                        patientName: value,

                                                                    })
                                                                },

                                                            )
                                                                .then(res => res.json())
                                                                .then(data => {

                                                                    this.setState({bars: data})
                                                                    this.setState({mavitu: this.state.bars.payload[0].results})
                                                                    this.setState({patientName: this.state.bars.payload[0].patientName})
                                                                    this.setState({patientAge: this.state.bars.payload[0].age})
                                                                    this.setState({patientSex: this.state.bars.payload[0].gender})
                                                                    this.setState({patientDoneby: this.state.bars.payload[0].done_by})
                                                                    this.setState({patientComment: this.state.bars.payload[0].comments})
                                                                    console.log('content', this.state.bars.totalDocs)
                                                                    console.log('contentas', this.state.bars.limit)
                                                                    var pages = this.state.bars.totalDocs / this.state.bars.limit
                                                                    console.log("math",Math.round(pages))
                                                                    this.setState({numbers: Math.round(pages)})
                                                                    console.log("numba",this.state.numbers)

                                                                })
                                                                .catch(console.log);
                                                        }
                                                        }
                                                        style={{ width: 200 , paddingRight:50}}
                                                    />
                                                </div>
                                            ]}
                                >

                                </PageHeader>

                                <div  style={{ padding: 50}} id="maku" >
                                    <div style={{ paddingLeft: 140}}><span><Text strong>Patient Name :&nbsp;&nbsp;&nbsp;</Text><Text
                                        style={{textTransform: "lowercase"}}>{this.state.patientName}</Text></span><br/>
                                        <span><Text strong>Gender :&nbsp;&nbsp;&nbsp;</Text><Text
                                            style={{textTransform: "lowercase"}}>{this.state.patientSex}</Text></span><br/>
                                        <span><Text strong>Age :&nbsp;&nbsp;&nbsp;</Text><Text
                                            style={{textTransform: "lowercase"}}>{this.state.parientAge}</Text></span><br/>
                                        <span><Text strong>Done by :&nbsp;&nbsp;&nbsp;</Text><Text
                                            style={{textTransform: "lowercase"}}>{this.state.patientDoneby}</Text></span><br/>
                                        <span><Text strong>Comments :&nbsp;&nbsp;&nbsp;</Text><Text
                                            style={{textTransform: "lowercase"}}>{this.state.parientComment}</Text></span><br/></div>


                                    <div style={{paddingTop: 40, paddingBottom: 60}}><Divider type="horizontal"/></div>
                                    <div className="logdiv5"><List
                                        itemLayout="vertical"
                                        size="large"
                                        dataSource={this.state.bars.payload}
                                        pagination={{
                                            onChange: page => {
                                                console.log(page);
                                            },
                                            pageSize: 12,
                                        }}
                                        renderItem={item => (


                                            <List.Item
                                                key={item.procedureName}
                                                actions={[]}


                                            >

                                                <List.Item.Meta
                                                    avatar={<Avatar
                                                        src='https://image.flaticon.com/icons/svg/123/123381.svg'/>}
                                                    title={<a href={item.testId}>{item.procedureName}</a>}
                                                    description={"created at: " + item.resultTime}

                                                />
                                                <Table
                                                    columns={columnsmini}
                                                    bordered={false}
                                                    pagination={false}
                                                    dataSource={isJson(item.results)}
                                                    size="large"
                                                    showHeader="true"/>
                                            </List.Item>

                                        )}
                                    />,</div>


                                </div>
                        </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const WrappedAddTest = Form.create({ name: "addtest" })(AddTest);

export default WrappedAddTest;
