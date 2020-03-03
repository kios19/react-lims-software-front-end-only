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
  Form,
  Descriptions,
  Input
} from "antd";
import {
  Avatar,
  Card,
  Row,
  PageHeader,
  Typography,
  Tooltip,
  Tabs,
  Tree,
  Popover,
  Steps,
  message,
  Button,
  Table,
  Cascader,
  Select,
  Checkbox,
  AutoComplete
} from "antd";
import "../css/login.css";
import DynamicFields from "../ui/DynamicFields";
import { Link } from "react-router-dom";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial
} from "react-awesome-button";
//import "react-awesome-button/dist/styles.css";
import Sides from "../ui/Sidebar.js";
import TextLoop from "react-text-loop";
import { tryStatement } from "@babel/types";

const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

const { Meta } = Card;

const { SubMenu } = Menu;

const { Option } = Select;

const { Step } = Steps;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

class AddPrint extends Component {
  constructor() {
    super();
  }
  goadd = () => {
    this.props.history.push("/");
  };

  enterUser = () => {
    this.props.history.push("/user");
  };
  over = value => {
    this.props.history.push("/tgroup");
  };
  over2 = value => {
    this.props.history.push("/tcategory");
  };
  over3 = value => {
    this.props.history.push("/addspecimen");
  };

  //🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃🏃
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        const mary = {
          name: values.name,
          price: values.price,
          Category: values.category,
          Group: values.testgroup,
          testCode: values.testcode,
          specimenName: values.specimen,
          description: values.name,
          printForm: values.address
        };
        console.log("👧 ", mary);
        fetch("http://192.241.145.208:8890/lims/tests/addPrintForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(mary)
        })
          .then(res => res.json())
          .then(data => {
            this.setState({ bars: data });
            console.log("🔋 ", this.state.bars);

            if (
              String(this.state.bars.status).valueOf == String("200").valueOf
            ) {
              this.setState({ animationtype: "steps" });
              {
                message.success("Printform Successfully saved", 10);
              }
            }
          })
          .catch(console.log);
      }
    });
  };

  state = {
    datas: [],
    ongoings: [],
    alls: [],
    uname: [],
    ppic: [],
    role: [],
    avastyle: [],
    bars: [],
    categs: [],
    alpheta: []
  };

  componentDidMount() {
    fetch("http://192.241.145.208:8890/lims/tests/getTestCategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwibmFtZSI6ImxpbXNfYWNjZXNzIiwicGFzcyI6IjEyQCEyMyM0JCIsImlhdCI6MTU2NjcyODkzMCwiZXhwIjoxNTY3MDg4OTMwfQ.b2OZ6kpop2cRo_GRWfgo5d9b1IyHCLa1RwM66qxsguY"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bars: data.payload });
        console.log("🍺 ", this.state.bars);

        //🖨🖨🖨🖨🖨🖨🖨🖨🖨🖨🖨🖨
        /* const fay = this.state.bars.forEach(
              printform=>{
                  console.log("printform 🍎 "+printform)
                  this.state.alpheta.push(printform.name)
              }
          )*/

        this.state.bars.map(printform => {
          console.log("printform 🍏 ", printform.name);
          this.state.alpheta.push(printform.name);
        });
        this.setState({ loading: false });
        console.log("🥜 ", this.state.alpheta);
      })
      .catch(console.log);
  }

  render() {
    const { form } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    var Data = this.state.alpheta,
      MakeItem = function(x) {
        return <option>{x}</option>;
      };

    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Sides />
        <Content style={{ background: "#fff" }}>
          <div style={{ background: "#fff" }}>
            <div className="" style={{ background: "#fff" }}>
              <PageHeader
                title="Add Print Form"
                style={{ paddingBottom: "10px" }}
              />
            </div>
            <Steps direction="vertical" size="small" current={1}>
              <div>
                <Row>
                  <Col span={8} />
                  <Col span={8}>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Item >
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              required: true,
                              message: "Please input Name"
                            }
                          ]
                        })(
                          <Input
                          placeholder="Name"
                            className="raytrace"
                            style={{ width: "400px" }}
                          />
                        )}
                      </Form.Item>
                      <Form.Item >
                        {getFieldDecorator("price", {
                          rules: [
                            {
                              required: true,
                              message: "Please input Price"
                            }
                          ]
                        })(
                          <Input
                          placeholder={"Price"}
                            className="raytrace"
                            style={{ width: "400px" }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item >
                        <Popover
                          content={
                            <div className="logdivspace">
                              <Button onClick={this.over2}>
                                Add Test category
                              </Button>
                            </div>
                          }
                          title="Helper"
                        >
                          {getFieldDecorator("category", {
                            rules: [
                              {
                                required: true,
                                message: "Please select category"
                              }
                            ]
                          })(
                            <Select
                              className="raytrace"
                              showSearch
                              style={{ width: 400 }}
                              placeholder="Select a Category"
                              optionFilterProp="children"
                              //onChange={onChange}
                              //onFocus={onFocus}
                              //onBlur={onBlur}
                              //onSearch={onSearch}
                              //filterOption={(input, option) =>
                              //option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              //}
                            >
                              {this.state.alpheta.map(team => (
                                <option key={team} value={team}>
                                  {team}
                                </option>
                              ))}
                            </Select>
                          )}
                        </Popover>
                      </Form.Item>

                      <Form.Item >
                        <Popover
                          content={
                            <div className="logdivspace">
                              <Button onClick={this.over}>Add Test grp</Button>
                            </div>
                          }
                          title="Helper"
                        >
                          {getFieldDecorator("testgroup", {
                            rules: [
                              {
                                required: true,
                                message: "Please select Test Group"
                              }
                            ]
                          })(
                            <Select
                              className="raytrace"
                              showSearch
                              style={{ width: 400 }}
                              placeholder="Select a Test Group"
                              optionFilterProp="children"
                              //onChange={onChange}
                              //onFocus={onFocus}
                              //onBlur={onBlur}
                              //onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {this.state.alpheta.map(team => (
                                <option key={team} value={team}>
                                  {team}
                                </option>
                              ))}
                            </Select>
                          )}
                        </Popover>
                      </Form.Item>

                      <Form.Item>
                        {getFieldDecorator("testcode", {
                          rules: [
                            {
                              required: true,
                              message: "Please input Test Code"
                            }
                          ]
                        })(
                          <Input
                            placeholder={"Test code"}
                            className="raytrace"
                            style={{ width: "400px" }}
                          />
                        )}
                      </Form.Item>

                      <Form.Item>
                        <Popover
                          content={
                            <div className="logdivspace">
                              <Button onClick={this.over3}>Add Specimen</Button>
                            </div>
                          }
                          title="Helper"
                        >
                          {getFieldDecorator("specimen", {
                            rules: [
                              {
                                required: true,
                                message: "Please input Specimen"
                              }
                            ]
                          })(
                            <Input
                              placeholder={"Specimen"}
                              className="raytrace"
                              style={{ width: "400px" }}
                            />
                          )}
                        </Popover>
                      </Form.Item>

                      <div className="container">
                        <Form>
                          <Divider
                            className="raytrace"
                            orientation="left"
                            className="first"
                          >
                            Parameters
                          </Divider>
                          <DynamicFields
                            {...form}
                            name="parameters"
                            fields={[
                              {
                                name: "parameter",
                                field: () => (
                                  <Input
                                    className="raytrace"
                                    style={{ width: 400 }}
                                    placeholder={"Parameter"}
                                  />
                                )
                              },
                              {
                                name: "lower limit",
                                field: () => (
                                  <Input
                                    className="raytrace"
                                    style={{ width: 400 }}
                                    placeholder={"Lower Limit"}
                                  />
                                )
                              },
                              {
                                name: "upper limit",
                                field: () => (
                                  <Input
                                    className="raytrace"
                                    style={{ width: 400 }}
                                    placeholder={"Upper Limit"}
                                  />
                                )
                              },
                              {
                                name: "units",
                                field: () => (
                                  <Input
                                    className="raytrace"
                                    style={{ width: 400 }}
                                    placeholder={"Units"}
                                  />
                                )
                              }
                            ]}
                          />
                        </Form>
                      </div>

                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={8} />
                </Row>
              </div>
            </Steps>
          </div>
        </Content>
      </Layout>
    );
  }
}

const WrappedSupplier = Form.create({ name: "get_test" })(AddPrint);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedSupplier;
