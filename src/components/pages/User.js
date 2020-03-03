import React, { Component } from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css';
import '../../index.css';
import '../css/login.css';
import {Upload, message,Steps, DatePicker,Input, Layout, Menu, Col, Form, InputNumber, Button , Icon, Mentions} from 'antd';
import {  Avatar, Card, Row , PageHeader, Table, Divider, Tag , AutoComplete, Tabs} from 'antd';
import '../css/login.css';
import Chart from "react-apexcharts";
import { cpus } from 'os';
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import pop from '../images/prop2.png'
import Home from '../pages/Home'
import Sides from "../ui/Sidebar.js";

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { Option, getMentions } = Mentions;
const { Meta } = Card;
const { SubMenu } = Menu;
const { Step } = Steps;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const AutoCompleteOption = AutoComplete.Option;

const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


class User extends Component{

  state = {
    loading: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err){
            console.log('Received values from form: ', values);
        }
      });
    }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  
  state = {
    datas: [],
    ongoings: [],
    alls: [],
    uname:[],
    ppic: [],
    role: [],
    bars:[]

}


state = {
  sampler:[],
}

  componentDidMount(){
    this.setState({uname: localStorage.getItem("username")})
    this.setState({ppic: localStorage.getItem("ppic")})
    this.setState({role: localStorage.getItem("role")})


    
  }

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

          console.log(values);
          fetch('http://192.241.145.208:8890/lims/users/update',{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
              "firstName": values.firstname,
              "lastName": values.lastname,
              "username": values.username,
              "phoneNumber": values.phone,
              "email": values.email,
              "role": values.role,

            })
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ bars: data})
          console.log(this.state.bars)
          console.log(this.state.bars.message)

          if(this.state.bars.message=="user created successfully"){
 
          }
          if(this.state.bars.message=="mail exists"){

          }
          if(this.state.bars.message=="an internal server error occured"){

          }

        })
        .catch(console.log)
        


        });
      };
    

    

state = {
    expand: false,
};
  
    render(){


        const uploadButton = (
          <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        const { imageUrl } = this.state;
        const { current } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;


        
        return(
            <Layout>
              <Sides/>
        <Layout>
       
        <Content style={{ background: 'white' }}>
            
        
        <div style={{ background: 'white', padding: '30px'}}>
        <PageHeader title="User Details"></PageHeader>

        
        <div className="logdiv">
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          </div>
          <div className="logdiv">
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="E-mail" style={{width: "500px"}}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(<Input />)}
            </Form.Item>

            <Form.Item label="First Name" style={{width: "500px"}}>
                  
                  {getFieldDecorator('firstname', {
                    value:10,
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Firstname!',
                      },
                    ],
                  })(<Input />)}
            </Form.Item>

            
            <Form.Item label="Last Name" style={{width: "500px"}}>
                  {getFieldDecorator('lastname', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Lastname!',
                      },
                    ],
                  })(<Input />)}
            </Form.Item>

            
            <Form.Item label="User Name" style={{width: "500px"}}>
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Username!',
                      },
                    ],
                  })(<Input />)}
            </Form.Item>


            <Form.Item label="Phone Number" style={{width: "500px"}}>
                  {getFieldDecorator('phone', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Phone Number!',
                      },
                    ],
                  })(<Input />)}
            </Form.Item>

            
            <Form.Item label="Role" style={{width: "500px"}}>
                  {getFieldDecorator('role', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Role!',
                      },
                    ],
                  })(<Input />)}
            </Form.Item>


            <Button type="dashed" block onClick={this.handleSubmit}>
              Update
            </Button>


          </Form>
          </div>

       </div>
           
        </Content>

        </Layout>
        </Layout>
        )
    }
}



const WrappedNormalsamples = Form.create({ name: 'sampes' })(User);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));
          
export default WrappedNormalsamples ;