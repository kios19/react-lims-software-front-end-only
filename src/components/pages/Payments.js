import React, { Component } from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css';
import '../../index.css';
import '../css/login.css';
import {DatePicker,Input, Layout, Menu, Col, Form, InputNumber, Button , Icon, Mentions} from 'antd';
import { Avatar, Card, Row , PageHeader, Table, Divider, Tag , AutoComplete, Tabs} from 'antd';
import '../css/login.css';
import Chart from "react-apexcharts";
import { cpus } from 'os';
import { Link } from "react-router-dom"

const { Header, Content, Footer, Sider } = Layout;
const { Option, getMentions } = Mentions;
const { Column, ColumnGroup } = Table;


const { TabPane } = Tabs;

const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['success'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['success'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['success'],
    },
  ];
function callback(key) {
  console.log(key);
}
class Payments extends Component{

    handleReset = e => {
        e.preventDefault();
        this.props.form.resetFields();
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
          if (errors) {
            console.log('Errors in the form!!!');
            return;
          }
          console.log('Submit!!!');
          console.log(values);
        });
      };
    
      checkMention = (rule, value, callback) => {
        const mentions = getMentions(value);
        if (mentions.length < 2) {
          callback(new Error('More than one must be selected!'));
        } else {
          callback();
        }
      };

      handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      };

      clearFilters = () => {
        this.setState({ filteredInfo: null });
      };
    
      clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
      };
    
      setAgeSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'age',
          },
        });
      };

      state = {
        filteredInfo: null,
        sortedInfo: null,
      };
    
  
    render(){  


        const { getFieldDecorator } = this.props.form;
        return(
            <Layout>
            <Sider className="ant-layout-sider-light"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            >
                <div className="logo" />
                <div style={{ paddingLeft: '40px', paddingTop: '40px', paddingBottom: '60px'}}>
                    <Avatar style={{}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  ></Avatar>
                        Tim
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <span className="nav-text"><Link to="/dash">Dashboard</Link></span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span className="nav-text"><Link to="/patients">Patients</Link></span>
                </Menu.Item>
                <Menu.Item key="3">
                    <span className="nav-text"><Link to="/requests">Requests</Link></span>
                </Menu.Item>
                <Menu.Item key="4">
                    <span className="nav-text"><Link to="/samples">Samples</Link></span>
                </Menu.Item>
                <Menu.Item key="5">
                    <span className="nav-text">Inventory</span>
                </Menu.Item>
                <Menu.Item key="6">
                    <span className="nav-text">Reports</span>
                </Menu.Item>
            </Menu>
            </Sider>
        <Layout>
       
        <Content style={{ background: 'white' }}>
            
        
        <div style={{ background: 'white', padding: "60px"}}>
        <PageHeader title="Payments"></PageHeader>
        
        <div style={{paddingLeft:"150px"}}>
                <Row gutter={16}>
                <Col span={6}>
                <p>Start Date</p>
                <p><DatePicker  /></p>
                </Col>
                <Col span={6}>
                <p>End Date</p>
                <p><DatePicker  /></p>
                </Col>
                </Row>
            </div>

            <div style={{padding:"150px"}}>
            <Tabs defaultActiveKey="1" onChange={callback} >
                <TabPane tab="Done" key="1">
                <Table dataSource={data} style={{ padding: "80px"}}>
                <Column title="Patient Name" dataIndex="firstName" key="firstName" />
                <Column title="Phone Number" dataIndex="lastName" key="lastName" />
                <Column title="Payment Date" dataIndex="age" key="age" />
                <Column title="Amount" dataIndex="address" key="address" />
                <Column title="Sponsors" dataIndex="address" key="address" />
                <Column
                title="Status"
                dataIndex="tags"
                key="tags"
                render={tags => (
                    <span>
                    {tags.map(tag => (
                        <Tag color="green" key={tag}>
                        {tag}
                        </Tag>
                    ))}
                    </span>
                )}
                />

            </Table>,
                </TabPane>
                <TabPane tab="Pending" key="2">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Cancelled" key="3">
                Content of Tab Pane 3
                </TabPane>
            </Tabs>,
            </div>
        
       </div>
           
        </Content>

        </Layout>
        </Layout>
        )
    }
}



const WrappedNormalPayments = Form.create({ name: 'payments' })(Payments);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));
          
export default WrappedNormalPayments ;