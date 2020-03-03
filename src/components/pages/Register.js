
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css'
import '../css/login.css'
import {
  Form,
  Result,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { Link } from "react-router-dom"

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

class Register extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    resogun:[],
    linda:[],
    bars:[],
    teller:[],
    stats:["Please Fill all Details"],
    content:[<Button type="primary" key="console" >
    <Link to="/dash">Go Home</Link> 
  </Button>]
  };

  gohome = () =>{
    this.props.history.push('/')
  }

  componentDidMount(){
    fetch('http://192.241.145.208:8890/lims/v1/auth',{
        method: "GET",
        "crossDomain": true,
        "Access-Control-Allow-Origin":"http://192.241.145.208:8890/lims/v1/auth",
        "Access-Control-Allow-Credentials":"true",
        headers: {
            "Authorization": "Basic bGltc19hY2Nlc3M6MTJAITIzIzQk",
            "Access-Control-Allow-Origin":"http://localhost:3000/",
            "Access-Control-Allow-Credentials":"true",
            "Accept": "*/*",
            "Content-Type":"application/json",
            "Cache-Control": "no-cache",
        }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ linda: data.payload.token})
      console.log(this.state.linda)

    })
    .catch(console.log)

}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);


        var form = new FormData();
        form.append("firstName", values.firstname);
        form.append("lastName", values.lastname);
        form.append("username", values.username);
        form.append("phoneNumber", values.phone);
        form.append("email", values.email);
        form.append("role", values.role);
        form.append("addedBy", "1");


        fetch('http://192.241.145.208:8890/lims/users/register',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+this.state.linda,
            },
            body: JSON.stringify({
              "firstName": values.firstname,
              "lastName": values.lastname,
              "username": values.username,
              "phoneNumber": values.phone,
              "email": values.email,
              "role": values.role,
              "addedBy": "1"
            })
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ bars: data})
          console.log(this.state.bars)
          console.log(this.state.bars.message)

          if(this.state.bars.message=="user created successfully"){
            this.setState({stats: "User Successfully Registered"})
            this.setState({teller: "success"})
          }
          if(this.state.bars.message=="mail exists"){
            this.setState({stats: "Email Exists"})
            this.setState({teller: "error"})
          }
          if(this.state.bars.message=="an internal server error occured"){
            this.setState({stats: "Sorry , server error"})
            this.setState({teller: "500"})
          }

        })
        .catch(console.log)
        
        
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '254',
    })(
      <Select style={{ width: 70 }}>
        <Option value="254">+254</Option>
        <Option value="256">+256</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
     <div className="logdiv">
       <Result
          status={this.state.teller}
          title={this.state.stats}
          extra={
            this.state.content
          }
        />
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
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
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="First Name">
          {getFieldDecorator('firstname', {
            rules: [
              {
                message: 'The input is not valid Firstname',
              },
              {
                required: true,
                message: 'Please input your Firstname',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Last Name">
          {getFieldDecorator('lastname', {
            rules: [
              {
                message: 'The input is not valid Lasttname',
              },
              {
                required: true,
                message: 'Please input your Lastname',
              },
            ],
          })(<Input />)}
        </Form.Item>



        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>

        <Form.Item label="Role">
          {getFieldDecorator('role', {
            rules: [
              {
                message: 'The input is not valid Role',
              },
              {
                required: true,
                message: 'Please input your Role',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
     </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm;          