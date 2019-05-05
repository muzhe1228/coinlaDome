import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "pages/App";
import Home from "pages/Home";
import Hxjc from "pages/Hxjc/loadable";
import Yydb from "pages/Yydb/loadable";
import YydbId from "pages/Yydb_id/loadable";
import BullFight from "pages/BullFight";
import HxNiu from "pages/HxNiu";
import UserInfo from "pages/UserInfo/loadable"; //个人资料
import TaskCenter from "pages/TaskCenter/loadable"; //任务中心
import Payments from "pages/Payments/loadable"; //收支明细
import GameRecord from "pages/GameRecord/loadable"; //游戏记录
import MessageCenter from "pages/MessageCenter/loadable"; //消息中心
import SecuritySetting from "pages/SecuritySetting/loadable"; //安全设置
import InvateShareAlert from "pages/InviteShare";
import DownApp from "pages/DownLoad";
import NoMatch from "pages/NoMatch"; //404页面
import CustomerService from "pages/CustomerService";

class Routers extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/hxjc" component={Hxjc} />
            <Route exact path="/yydb" component={Yydb} />
            <Route exact path="/yydb/:dbId" component={YydbId} />
            <Route exact path="/bull_fight" component={BullFight} />
            <Route exact path="/bull_fight/:roomId" component={HxNiu} />
            <Route exact path="/user_info/:name?" component={UserInfo} />
            <Route exact path="/task_center" component={TaskCenter} />
            <Route exact path="/payments" component={Payments} />
            <Route exact path="/game_record" component={GameRecord} />
            <Route exact path="/security_setting" component={SecuritySetting} />
            <Route exact path="/message_center" component={MessageCenter} />
            <Route exact path="/customer_service" component={CustomerService} />
            <Route exact path="/invite" component={InvateShareAlert} />
            <Route exact path="/down" component={DownApp} />
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

export default Routers;
