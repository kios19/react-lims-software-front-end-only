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
  notification,
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
  Tree,
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

import tickAudio from '../sounds/accomplished.mp3'


// rowSelection objects indicates the need for row selection

const { Header, Content, Footer, Sider } = Layout;

class Supplier extends Component {
    state = {
        bars:[]
    }
  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        fetch("http://192.241.145.208:8890/lims/tests/addSpecimen", {
            method: "POST",
            headers: {
              "Authorization":"Bearer "+localStorage.getItem("key")
            },
            body: JSON.stringify({
              name: values.name
            })
          })
            .then(res => res.json())
            .then(data => {
              this.setState({ bars: data });
              console.log("🔋 "+this.state.bars)

              var audio = new Audio(tickAudio)
              audio.play()
              notification.open({
                  
                message:this.state.bars.description,
                description:this.state.bars.error,
              })

            })
            .catch(console.log);
        
      }
    });
}

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Sides />

        <Content style={{ background: "#fff" }}>
          <div style={{ background: "#fff", padding: "30px" }}>
            <div className="dud" style={{ background: "#fff" }}>
              <PageHeader
                title="Add Specimen"
                style={{ paddingBottom: "130px" }}
              />
            </div>

            <div className="logdiv">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("name", {
                    rules: [
                      { required: false, message: "Please input a name" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="snippets"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Specimen Name"
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <Button
                  style={{width: 300}}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

const WrappedSupplier = Form.create({ name: "get_test" })(Supplier);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedSupplier;
