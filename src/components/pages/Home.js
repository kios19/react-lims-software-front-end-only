import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import "../css/login.css";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,

  Alert,
  Card
} from "antd";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import bac from "../images/cover2.png";
import orb from "../images/person.flr";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tuktuk: null,
      loading: false,
      iconLoading: false,
      linda: [],
      bars: [],
      checkNick: ["Fill in all information"],
      checkNicktype: ["info"],
      checkcred: false,
      animationtype: "Pocket-Action",
      loger: [],
      animationcontent: orb
    };
  }
  state = {};

  enterLoading = () => {
    this.setState({ loading: true });
  };
  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };




  //🔥🔥🔥🔥🔥🔥🔥 mounting start
  componentDidMount() {

    fetch(process.env.REACT_APP_AUTH, {
      method: "GET",
      crossDomain: true,
      "Access-Control-Allow-Origin": "http://192.241.145.208:8890/lims/v1/auth",
      "Access-Control-Allow-Credentials": "true",
      headers: {
        Authorization: "Basic bGltc19hY2Nlc3M6MTJAITIzIzQk",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Access-Control-Allow-Credentials": "true",
        Accept: "*/*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ linda: data.payload.token });
        console.log(this.state.linda);
        var coconut = jwt_decode(this.state.linda);

        const d = new Date(0);
        d.setUTCSeconds(coconut.exp);
        console.log(d);
        localStorage.setItem("expiry", d);

      })
      .catch(console.log);
  }


  handleSubmit = e => {
    try {
      this.setState({ animationtype: "Running" });
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values from form: ", values);
          console.log("Bearer " + this.state.linda);
          //🔑🔑🔑🔑🔑🔑🔑
          localStorage.setItem("key", this.state.linda)
          var form = new FormData();
          form.append("email", values.username);
          form.append("password", values.password);

          fetch(process.env.REACT_APP_LOGIN, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.state.linda
            },
            body: JSON.stringify({
              email: values.username,
              password: values.password
            })
          })
            .then(res => res.json())
            .then(data => {
              this.setState({ bars: data });
              console.log("🔋 " + this.state.bars.message)
              this.setState({ checkNick: this.state.bars.message })
              if (String(this.state.checkNick).valueOf == String("NOT_FOUND").valueOf) {
                this.setState({ checkNicktype: "error" })
                console.log("⚠ ")
                this.setState({ animationtype: "Hello" })
                this.setState({ loading: false });
                this.setState({ iconLoading: false });
              }
              //console.log("bars" + this.state.bars.payload);
              //console.log(this.state.bars.payload.AuthToken);
              var token = this.state.bars.payload.AuthToken;
              var decode = jwt_decode(token);
              console.log(decode);
              console.log("🐌 " + decode["username"])
              var uname = decode["username"];
              var urole = decode["role"];
              var urights = decode["rights"];
              var uexpass = decode["passwordExpiry"];
              var uid = decode["id"];
              var ulast = decode["lastName"];
              var ufirst = decode["firstName"];
              var uphone = decode["phoneNumber"];
              var profa = decode["profIco"];
              var upic = profa["url"];



              if (this.state.bars.payload) {
                this.setState({ checkNicktype: "success" });
                //this.setState({ checkNick: "Successful" });
                localStorage.setItem("username", uname);
                localStorage.setItem("role", urole);
                localStorage.setItem("rights", urights);
                localStorage.setItem("ulast", ulast);
                localStorage.setItem("ufirst", ufirst);
                localStorage.setItem("uphone", uphone)

                localStorage.setItem("uid", uid)
                localStorage.setItem("ppic", upic);
                this.props.history.push({
                  pathname: "/dash"
                });
              }
            })
            .catch(console.log);
          /*
          this.setState({ checkNick: "Please recheck cridentials" });
          this.setState({ checkNicktype: "error" });
          this.setState({ loading: false });
          this.setState({ iconLoading: false });
          this.setState({ animationtype: "Hello" });*/
        }
      });
    } catch (err) {
      console.log("err: " + err);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div >
        <Row>
          <Col span={10} >
            <section class="stage">
              <figure class="ball">
                <span class="shadow"></span>
                <span class="iris"></span>
              </figure>
            </section>
          </Col>
          <Col span={8} className="logdiv">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item className="inputa">

                <img src={bac}
                  width={300}
                />
                {getFieldDecorator("info", {
                  rules: [
                    {
                      required: false,
                      message: (
                        <Alert
                          message="Login Failed Please Check cridentials"
                          type="error"
                          di
                        />
                      )
                    }
                  ]
                })(
                  <Alert
                    className="raytrace"
                    show="false"
                    message={this.state.checkNick}
                    type={this.state.checkNicktype}
                    showIcon
                  />
                )}
              </Form.Item>
              <Form.Item className="inputa">
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input className="raytrace"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item className="inputa">
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input className="raytrace"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item className="puta">

                <a className="login-form-forgot" href="">

                </a>
                <p>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="buttona"
                    style={{ width: "300px", height: "40px" }}
                    loading={this.state.loading}
                    onClick={this.enterLoading}
                  >
                    Log in
                  </Button>
                </p>

              </Form.Item>
            </Form>
          </Col>
          <Col span={9} />
        </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Home);

//ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));

export default WrappedNormalLoginForm;