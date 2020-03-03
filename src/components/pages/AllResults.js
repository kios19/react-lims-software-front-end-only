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
    Tooltip,
    Cascader,
    Checkbox,
    AutoComplete, Pagination
} from "antd";
import {
    Avatar,
    Card,
    Row,
    PageHeader,
    Typography,
    Empty,
    Tree,
    List,
    Anchor,
    Spin,
    message,
    Descriptions,
    Select,
    Button,
    Form,
    notification
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
        mavitu:[]
    };


    componentDidMount() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        this.setState({datekeeper: today})

        fetch(
            process.env.REACT_APP_GETRESULTALL ,
            {
                method: "POST"
            }
        )
            .then(res => res.json())
            .then(data => {

                this.setState({bars: data})
                console.log('content', this.state.bars.totalDocs)
                console.log('contentas', this.state.bars.limit)
                var pages = this.state.bars.totalDocs / this.state.bars.limit
                console.log("math",Math.round(pages))
                this.setState({numbers: Math.round(pages)})
                console.log("numba",this.state.numbers)

            })
            .catch(console.log);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleOk2 = e => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    };

    handleCancel2 = e => {
        console.log(e);
        this.setState({
            visible2: false,
        });
    };
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
                var pages = this.state.bars.totalDocs / this.state.bars.limit
                console.log(Math.round(pages))
                this.setState({numbers: Math.round(pages)})
            })
            .catch(console.log)
    };

    onRow = r => ({
        onClick: () => {
            //console.log('values',r.results)
            //this.setState({mavitu:r.results})
            //this.showModal()
            if(r.results.length == 9){
                console.log("hakuna")
                this.showModal2()
            }else {
                console.log("iko kitu bwana")
                console.log('values',r.results)
                this.setState({mavitu:r.results})
                this.showModal()
            }

        }
    });
    render() {
        var kis;
        var soph;
        var fay;
        return (
            <Layout style={{ background: "#fff" }}>

                <Layout style={{ background: "#fff" }}>
                    <Header style={{ background: "#fff" }} />
                    <Content style={{}}>
                        <div style={{ background: "#fff" }}>
                            <div >
                                <PageHeader style={{ paddingBottom: 20}}
                                    onBack={() => window.history.back()}
                                    title="All Results"
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
                                                placeholder="Order Id"
                                                onSearch={value => {
                                                    fetch(
                                                        process.env.REACT_APP_GETRESULTALL+"?orderId="+value ,
                                                        {
                                                            method: "POST"
                                                        }
                                                    )
                                                        .then(res => res.json())
                                                        .then(data => {

                                                            this.setState({bars: data})
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

                                <div  id="maku" >
                                    <Modal
                                        title="Results"
                                        visible={this.state.visible2}
                                        onOk={this.handleOk2}
                                        onCancel={this.handleCancel2}
                                    >
                                        <Empty />
                                    </Modal>
                                    <Modal
                                        title="Results"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <Table columns={columnsmini} bordered={false} dataSource={this.state.mavitu} size="small" />
                                    </Modal>
                                    <Row style={{paddingBottom: 50}} >

                                        <div className="logdiv4">
                                            <img
                                                width="170px"
                                                src="https://image.flaticon.com/icons/svg/1803/1803017.svg"
                                                alt="content"
                                            /><h2><b>MOH 240 Laboratory Test</b></h2>
                                        </div>

                                    </Row>

                                    <div >
                                        <Table
                                            onRow={this.onRow}
                                            bordered
                                            size="middle"
                                            columns={columns}
                                            pagination={false}
                                            dataSource={this.state.bars.payload}
                                        />
                                        <div style={{ paddingTop: 30, paddingBottom: 30, paddingLeft: 40}}>
                                            <Pagination current={this.state.pageclick} onChange={this.onCha} total={this.state.numbers} />
                                        </div>
                                    </div>

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
