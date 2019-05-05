import React, { Component } from "react";
import { BackGround, Header, MainPage, InputDiv } from "./style";
import Logout from "images/home/logout.png";
import ScrollH from "components/scrollH";
import Message from "./Message";
import axios from "axios";
// import Socket from "socket.io";
// import 'http://192.168.10.200:8035/im/08eihk.html'
import InputOutJSTool from './ImputOutJSTool'
import { connect } from "react-redux";
import { actionCreators as UserInfoActionCreators } from "components/Header/store";
import { withRouter } from "react-router-dom";

class CustomerService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      inputValue: ""
    };

    this.BackHome = this.BackHome.bind(this);
    this.CreateMessageUI = this.CreateMessageUI.bind(this);
    this.GetInputValue = this.GetInputValue.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.ReceiveMessage = this.ReceiveMessage.bind(this);
    this.GetHistory = this.GetHistory.bind(this);
    this.CreateSocket = this.CreateSocket.bind(this);
  }
  render() {
    const { inputValue, dataArray } = this.state;
    return (
      <BackGround>
        <Header>
          <h1>客服</h1>
          <p onClick={this.BackHome}>
            <img src={Logout} alt="回到大厅" />
          </p>
        </Header>
        <MainPage>
          <ScrollH scrollToEndFlag={true} data={dataArray}>
            {this.CreateMessageUI()};
          </ScrollH>
          <InputDiv>
            <input
              placeholder={"请输入您的问题"}
              value={inputValue}
              onChange={this.GetInputValue}
            />
            <i className={"iconfont"}>&#xe681;</i>
            <span onClick={this.SendMessage}>发送</span>
          </InputDiv>
        </MainPage>

        {/* <Socket
        url={
          "ws://192.168.10.200:8036/socket.io/?userid=3ba5431de10917033daa91f9f6e619da&orgi=cskefu&session=44C364F74941908BD09D51344CA57F24&appid=1dy1im&osname=&browser=&nickname=Guest_0kyoho&title=recaptcha%2Brsa%2Baes%E8%81%94%E5%90%88%E4%BD%BF%E7%94%A8&url=http%3A%2F%2F192.168.10.200%3A7001%2Fuac%2Fhello&traceid=a747402051994c6595a3b2b827bfa1b2&EIO=3&transport=websocket"
        }
        onMessage={this.ReceiveMessage}
        onCreate={this.GetSocket}
      /> */}
      </BackGround>
    );
  }

  componentDidMount() {
    InputOutJSTool.asyncLoadScripts('http://192.168.10.200:8035/im/08eihk.html', function(){
      
    });
    this.GetHistory();
    this.CreateSocket();
  }

  BackHome() {
    this.props.history.push("/");
  }

  CreateMessageUI() {
    const { userInfo } = this.props;
    const { dataArray } = this.state;
    return dataArray.map((item, index) => {
      if (item.calltype === "呼入") {
        //接受系统的消息
        return <Message messageType={"right"} item={item} key={index} nickFirst={userInfo.get("nick").substring(0,1)}/>;
      } else if (item.calltype === "呼出") {
        //发送的消息
        return <Message messageType={"left"} item={item} key={index} nickFirst={userInfo.get("nick").substring(0,1)}/>;
      }
    });
  }

  GetInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  //获取历史消息
  GetHistory() {
    let _this = this;
    axios
      .get("http://192.168.10.200:8035/im/history/message", {
        params: { userid: "3ba5431de10917033daa91f9f6e619da", orgi: "cskefu" }
      })
      .then(function(response) {
        console.log("历史消息", response.data.content);
        _this.setState(
          {
            dataArray: response.data.content.reverse()
          },
          () => {
            console.log("存入历史消息", _this.state.dataArray);
          }
        );
      })
      .catch(function(error) {});
  }

  //发送消息
  SendMessage() {
    const { inputValue, dataArray, ws, decorator } = this.state;
    var object = {
      message: inputValue,
      calltype: "呼入"
    };
    this.setState(
      {
        dataArray: dataArray.concat(object),
        inputValue: ""
      },
      () => {
        // Socket.emit('message', {
        //   appid: "1dy1im",
        //   message: "fuck",
        //   orgi: "cskefu",
        //   session: "44C364F74941908BD09D51344CA57F24",
        //   type: "writing",
        //   userid: "3ba5431de10917033daa91f9f6e619da"
        // });
      }
    );
  }

  //接收消息
  ReceiveMessage(msg) {
    console.log("接受到系统发来的消息:", msg);
  }

  CreateSocket() {
    // Socket = Socket.io(
    //   "ws://192.168.10.200:8036/im/user?userid=3ba5431de10917033daa91f9f6e619da&orgi=cskefu&session=44C364F74941908BD09D51344CA57F24&appid=1dy1im&osname=&browser=&nickname=Guest_0kyoho&title=recaptcha%2Brsa%2Baes%E8%81%94%E5%90%88%E4%BD%BF%E7%94%A8&url=http%3A%2F%2F192.168.10.200%3A7001%2Fuac%2Fhello&traceid=a747402051994c6595a3b2b827bfa1b2&EIO=3",
    //   { transports: ["websocket", "polling"] }
    // );

    // Socket.emit('message', {
    //   appid: "1dy1im",
    //   message: "fuck",
    //   orgi: "cskefu",
    //   session: "44C364F74941908BD09D51344CA57F24",
    //   type: "writing",
    //   userid: "3ba5431de10917033daa91f9f6e619da"
    // });

    // Socket.on('message', function(msg){
      
    // });
  }
}

const mapState = state => {
  return {
    userInfo: state.getIn(["header", "userInfo"])
  };
};

export default withRouter(
  connect(
    mapState,
    null
  )(CustomerService)
);