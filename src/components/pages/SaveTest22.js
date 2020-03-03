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

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
// rowSelection objects indicates the need for row selection

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}




class EditableCell extends React.Component {

  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}


class Supplier extends Component {
  //🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 🧰 

  constructor(props) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: 'units',
        dataIndex: 'units',
        width: '15%',
        editable: false,
      },
      {
        title: 'parameter',
        dataIndex: 'parameter',
        width: '35%',
        editable: false,
      },
      {
        title: 'lowerLimit',
        dataIndex: 'lowerLimit',
        width: '10%',
        editable: false,
      },
      {
        title: 'upperLimit',
        dataIndex: 'upperLimit',
        width: '10%',
        editable: false,
      },
      {
        title: 'values',
        dataIndex: 'value',
        width: '15%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
              <a disabled={editingKey !== ''} onMouseEnter={() => this.edit(record.key)} onClick={() => this.edit(record.key)}>
                Edit
            </a>
            );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.bars];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ bars: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ bars: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }



  state = {
    datas: [],
    ongoings: [],
    alls: [],
    uname: [],
    ppic: [],
    role: [],
    bars: [],
    avastyle: [],
    hustler: [],
    top: 10,
    bottom: 10,
    chukua:[],
    riba:[],
    notmessage:[],
    noticon:[],
    notcolor:[],
    nottitle:[],
    notmoji:[],
  };

  handleSubmit = e => {
    try {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);



          fetch("http://192.241.145.208:8890/lims/tests/saveResult", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.state.linda
            },
            body: JSON.stringify({
              orderId: localStorage.getItem("oda"),
              testId: sessionStorage.getItem("sptestid"),
              results: JSON.stringify(this.state.hustler)
            })
          })
            .then(res => res.json())
            .then(data => {
              this.setState({riba:data})
              console.log(this.state.riba)


              if(String(this.state.riba.status).valueOf == String(200).valueOf){
                this.setState({noticon:"smile"})
                this.setState({notcolor:'#3333FF'})
                this.setState({nottitle:"okay"})
                this.setState({notmoji: "👍" })

                notification.open({
                  message:this.state.riba.message,
                  description:this.state.riba.error,

  
                })

                this.props.history.push("/verify")
              }
              else{
                this.setState({noticon:"frown"})
                this.setState({notcolor:'#FF0000'})
                this.setState({notmessage:"error"})
                this.setState({notmoji: "🌵"  })

                notification.open({
                  message:this.state.riba.message,
                  description:this.state.riba.error,
                  
                })
              }
            })
            .catch(console.log);

        }
      });
    } catch (err) {
      console.log("err: " + err);
    }
  };

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
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('selectedRows: ', selectedRows);
        this.setState({hustler: selectedRows}) 
        this.state.hustler = selectedRows
        console.log("🇦🇫", this.state.hustler)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Sides />

        <Content style={{ background: "#fff" }}>

          
          <div style={{ background: "#fff", padding: "30px" }}>
            <div className="dud" style={{ background: "#fff" }}>
              <PageHeader
                title="Save Result"
                style={{ paddingBottom: "130px" }}
              />
            </div>
            <div>
              <Form layout="vertical" onSubmit={this.handleSubmit}>


                <Row gutter={16} className="logdivspace">
                  
                  <Col span={8}>
                    <Form.Item label="Patient Name">
                      {getFieldDecorator("patientname", {
                        initialValue: sessionStorage.getItem("sppatientname"),
                        rules: [
                          {
                            required: true,
                            message: "Please enter patient name"
                          }
                        ]
                      })(<Input className="raytrace" placeholder="Please enter patient name" />)}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Test id">
                      {getFieldDecorator("testid", {
                        initialValue: sessionStorage.getItem("sptestid"),
                        rules: [
                          { required: true, message: "Please enter test id" }
                        ]
                      })(<Input className="raytrace" placeholder="Please enter test id" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="logdivspace">
                  <Col span={8}>
                    <Form.Item label="Test Name">
                      {getFieldDecorator("testname", {
                        initialValue: sessionStorage.getItem("sptestname"),
                        rules: [
                          { required: true, message: "Please enter test name" }
                        ]
                      })(<Input className="raytrace" placeholder="Please enter test name" />)}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Specimen">
                      {getFieldDecorator("specimen", {
                        initialValue: sessionStorage.getItem("spspecimen"),
                        rules: [
                          { required: true, message: "Please enter specimen" }
                        ]
                      })(<Input className="raytrace" placeholder="Please enter specimen" />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="logdivsp">
                  <Col span={8}></Col>
                </Row>
                <Row className="logdiv">

                  <Form.Item>

                      <EditableContext.Provider value={this.props.form}>
                      <Table
                        
                        style={{ width: 1100}}
                        components={components}
                        bordered
  
                        rowSelection={rowSelection}
                        dataSource={this.state.bars}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                          onChange: this.cancel,
                        }}
                      />
                    </EditableContext.Provider>

                  </Form.Item>

                </Row>
                <Affix className="logdivspace" offsetBottom={this.state.bottom}>
                <Button
                      type="primary"
                      htmlType="submit"
                      className="buttona"
                      style={{ width: "300px" }}
                      loading={this.state.loading}
                      onClick={this.enterLoading}
                    >
                      Save
                  </Button>
                  </Affix>
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
