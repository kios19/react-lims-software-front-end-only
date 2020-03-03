import React, { Component } from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css';
import '../../index.css';
import '../css/login.css';
import {DatePicker,Input, Layout, Menu, Col, Form, InputNumber, Button , Icon, Mentions} from 'antd';
import { Avatar, Card, Row , PageHeader, Table, Divider, Tag , AutoComplete, Tabs, Descriptions} from 'antd';
import '../css/login.css';
import Chart from "react-apexcharts";
import { cpus } from 'os';

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { Option, getMentions } = Mentions;

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['pending', 'dont know'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


class Editinfo extends Component{

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
    

state = {
    expand: false,
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
                <Menu theme="light" mode="inline" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">
                        <span className="nav-text">Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <span className="nav-text">Patients</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <span className="nav-text">Requests</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <span className="nav-text">Samples</span>
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
            
        <PageHeader title="Edit Patient Info" style={{ paddingTop: "50px", paddingBottom:"180px"}}></PageHeader>
        <div style={{ background: 'white', paddingLeft: "50px"}}>
        
        
        <h4 style={{ paddingBottom:"40px"}}>Patient Information</h4>

        <div className="str8"> <h4>Name: </h4> Jonathan Mwarongo </div>
        <div className="str8"> <h4>Gender: </h4> Male </div>
        <div className="str8"> <h4>Primary Diagnosis </h4> </div>
       </div>

       <div style={{ padding: "50px"}}>
       <Table dataSource={data}>
            <Column title="Name" dataIndex="firstName" key="firstName" />
            <Column title="Examiner" dataIndex="lastName" key="lastName" />
            <Column title="Age" dataIndex="age" key="age" />
            <Column title="Location" dataIndex="address" key="address" />
            <Column title="Type" dataIndex="address" key="address" />
            <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
                <span>
                {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                    {tag}
                    </Tag>
                ))}
                </span>
            )}
            />
            <Column
            title="Notes"
            key="action"
            render={(text, record) => (
                <span>
                <a href="javascript:;">Invite {record.lastName}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
                </span>
            )}
            />
        </Table>,
       </div>
           
        </Content>

        </Layout>
        </Layout>
        )
    }
}



const WrappedNormalEdit = Form.create({ name: 'editinfo' })(Editinfo);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));
          
export default WrappedNormalEdit ;