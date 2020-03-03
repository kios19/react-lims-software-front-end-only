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
  Affix,
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
  Popconfirm,
  InputNumber,
  Typography,
  Select,
  Tree,
  notification,
  Anchor,
  Button,
  Table
} from "antd";
import "../css/login.css";
import { Link } from "react-router-dom";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial
} from "react-awesome-button";
//import "react-awesome-button/dist/styles.css";
import Sides from "../ui/Sidebar.js";
import TextLoop from "react-text-loop";
const { Text } = Typography;
const { Content } = Layout;
const { Paragraph } = Typography;

const renderContent = (column = 2) => (
  <Descriptions size="small" column={column} style={{ paddingTop: 80, paddingLeft: 120, paddingBottom: 50 }}>
    <Descriptions.Item label="Patient Name">{sessionStorage.getItem("sppatientname")}</Descriptions.Item>
    <Descriptions.Item label="Test id">
      {sessionStorage.getItem("sptestid")}
    </Descriptions.Item>
    <Descriptions.Item label="Test Name">{sessionStorage.getItem("sptestname")}</Descriptions.Item>
    <Descriptions.Item label="Specimen">{sessionStorage.getItem("spspecimen")}</Descriptions.Item>

  </Descriptions>
);

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >

  </div>
);

const Contenta = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}
class Supplier extends Component {
  state = {
    bars: [],
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var mu = values.parameter
        var mus = "kitu"+mu
        console.log("mus",mus)
        console.log("uhandisi",values[mus])
        var play = values[mus]
        var cos = play.join()
        console.log("coz",cos)
        var jsonArr = [];

        for (var i = 0; i < this.state.bars.length; i++) {
          jsonArr.push({
            unit: values.unit,
            parameter: values.parameter,
            lowerLimit: values.lowerlimit,
            upperLimit: values.upperlimit,

          });

        }

        console.log("stat", jsonArr)
      }
    });
  }



  componentDidMount() {
    fetch(
      "http://192.241.145.208:8890/lims/tests/getPrintForm?name=" +
      sessionStorage.getItem("sptestname"),
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(data => {

        let a = 0;
        this.setState({
          bars: JSON.parse(data.payload[0].printForm).map(item => {
            a += 1
            //item.vals = 0;
            item.key = a;
            console.log(item)
            return item;
          })
        });

        console.log("✈  ", this.state.bars);
      })
      .catch(console.log);
  }

  render() {

    const { getFieldDecorator } = this.props.form;


    return (
      <Layout style={{ background: "#fff" }}>
        <Sides />
        <Content>
          <PageHeader
            onBack={() => window.history.back()}
            title="Save Results"
            subTitle="Key in test results"
            extra={[


            ]}
            footer={
              <div>

              </div>
            }
          >
            <Contenta extra={extraContent}>{renderContent()}</Contenta>
          </PageHeader>
          <Row style={{ background: "#fff" }}>
            <Col span={6}>

            </Col>
            <Col span={18}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                {this.state.bars.map(item => (
                  <div>
                    <Form.Item label="parameter" style={{ display: "none" }} >
                      {getFieldDecorator("parameter", {
                        initialValue: item.parameter,
                        rules: [{ required: false, message: 'Please input your note!' }],
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Unit" style={{ display: "none" }} >
                      {getFieldDecorator("unit", {
                        initialValue: item.units,
                        rules: [{ required: false, message: 'Please input your note!' }],
                      })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Lower Limit" style={{ display: "none" }}>
                      {getFieldDecorator("lowerlimit", {
                        initialValue: item.lowerLimit,
                        rules: [{ required: false, message: 'Please input your note!' }],
                      })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Upper Limit" style={{ display: "none" }}>
                      {getFieldDecorator("upperlimit", {
                        initialValue: item.upperLimit,
                        rules: [{ required: false, message: 'Please input your note!' }],
                      })(<Input />)}
                    </Form.Item>



                    <Form.Item label={item.parameter}>

                      {getFieldDecorator("kitu"+item.parameter, {
                        rules: [{ required: true, message: 'Please input your result!' }],
                      })(
                        <Select
                          mode="tags"
                          
                          style={{ width: 300 }}
                          placeholder="Input test"
                        >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="tom">Tom</Option>
                        </Select>
                      )}
                    </Form.Item>

                  </div>
                ))}


                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button className="raytrace" type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={4}>

            </Col>
          </Row>

        </Content>
      </Layout>
    );
  }
}

const WrappedSupplier = Form.create({ name: "get_test" })(Supplier);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedSupplier;
