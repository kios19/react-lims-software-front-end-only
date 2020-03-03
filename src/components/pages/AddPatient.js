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
  Form,
  InputNumber,
  Button
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  Select,
  Statistic,
  Table,
  Divider,
  Tag,
  message,
  AutoComplete
} from "antd";
import "../css/login.css";
import Chart from "react-apexcharts";
import { cpus } from "os";
import Sides from "../ui/Sidebar.js";

const { Header, Content, Footer, Sider } = Layout;
const AutoCompleteOption = AutoComplete.Option;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

class AddPatient extends Component {
  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  state = {
    autCompleteResult: [],
    bars:[]
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        fetch('http://192.241.145.208:8890/lims/patients/add',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("key"),
            },
            body: JSON.stringify({
              "name": values.firstname,
              "age": values.age,
              "sex": values.sex,
              "phone": values.phone,
              "email": values.email,
              "address": values.address
            })
        })
        .then(res => res.json())
        .then((data) => {
          this.setState({ bars: data})
          console.log("🌵 ",this.state.bars.message)
          if(String(this.state.bars.message).valueOf == 
              String("success").valueOf){
                  this.setState({loading:false})
                  this.setState({iconLoading:false})
                  {message.success('Patient Successfully saved', 10);}
                  window.history.back()
              }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { AutoComplete } = this.state;
    return (
      <Layout style={{background:"#fff"}}>
        <Sides />
        <Layout>
          <Content style={{background:"#fff"}}>
          <div>

<PageHeader
  onBack={() => window.history.back()}
  title="Patients"
 
  subTitle="Add New Patient"
  extra={[


  ]}
>

</PageHeader>
</div>

            <div style={{ background: "white", paddingLeft: 40 }}>
              <Row gutter={16}>
                <Form className="dada" onSubmit={this.handleSubmit}>
                  <Col span={8}>
                    <Form.Item label="First Name" style={{ width: "300px" }}>
                      {getFieldDecorator("firstname", {
                        rules: [
                          {
                            message: "Not a valid name!"
                          },
                          {
                            required: true,
                            message: "Please input your Firstname!"
                          }
                        ]
                      })(<Input className = "raytrace"/>)}
                    </Form.Item>

                    <Form.Item label="Age" style={{ width: "300px" }}>
                      {getFieldDecorator("age", {
                        rules: [
                          {
                            message: "Not a valid Age!"
                          },
                          {
                            required: true,
                            message: "Please input your Age!"
                          }
                        ]
                      })(<Input className = "raytrace"/>)}
                    </Form.Item>

                    <Form.Item label="Gender" style={{ width:"300px"}}>
                        {getFieldDecorator("sex",{
                            rules:[
                                {
                                    required: true,
                                    message: "select gender"
                                }
                            ]
                        })(
                            <Select
                                placeholder="Select patient gender"
                                onChange={this.handleSelectChange}
                                >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="Phone" style={{ width: "300px" }}>
                      {getFieldDecorator("phone", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your phone!"
                          }
                        ]
                      })(<Input className = "raytrace"/>)}
                    </Form.Item>

                    <Form.Item label="Email" style={{ width: "300px" }}>
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            type: "email",
                            message: "Please input a valid email!"
                          },

                          {
                            required: true,
                            message: "Please input your email!"
                          }
                        ]
                      })(<Input className = "raytrace"/>)}
                    </Form.Item>

                    <Form.Item label="Address" style={{ width: "300px" }}>
                      {getFieldDecorator("address", {
                        rules: [
                          {
                            message: "Not a valid place of Address!"
                          },
                          {
                            required: true,
                            message: "Please input your Address!"
                          }
                        ]
                      })(<Input className = "raytrace"/>)}
                    </Form.Item>
                  </Col>

                  <Col span={8} style={{ paddingLeft: "100px"}} ></Col>
                  <div style={{height: 650}}></div>
                  <Row>
                  <div style={{paddingLeft: 800}}>
                  <Col span={4}><Button
                    
                    htmlType="submit"
                    className = "raytrace"
                    //loading={this.state.loading}
                    onClick={()=> this.props.history.push("/patients/add")}
                  >
                    Cancel
                  </Button></Col>

                    <Col span={6}>
                    <Button
                    
                    type="primary"
                    htmlType="submit"
                    className = "raytrace"
                    loading={this.state.loading}
                    onClick={this.enterLoading}
                  >
                    Add Patient
                  </Button>
                  </Col >
                  
                  </div>
                  </Row>
                </Form>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const WrappedNormalPatientForm = Form.create({ name: "addpatient" })(
  AddPatient
);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedNormalPatientForm;
