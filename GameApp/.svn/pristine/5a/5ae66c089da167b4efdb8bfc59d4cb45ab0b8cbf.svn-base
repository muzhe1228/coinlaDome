import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Motion, spring, presets } from "react-motion";
import { bindMethods } from "common/util";
import TopUpAlert from "pages/Alert/TopUp";
import WithdrawalAlert from "pages/Alert/Withdrawal";
import HomeRuleAlert from "pages/Alert/HomeRule/index";
import ExchangeCoin from "pages/Alert/ExchangeCoin";
import ScrollH from "components/scrollH";
import {
  ExolainShade,
  ExolainWrapper,
  ModalTitle,
  ModalContent,
  ExplainContWrapper,
  ModalFooter
} from "./style";

const modalOpenClass = "modal-open";

const toggleBodyClass = isOpen => {
  const body = document.body;
  if (isOpen) {
    body.classList.add(modalOpenClass);
  } else {
    body.classList.remove(modalOpenClass);
  }
};

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      test: 1
    };
    toggleBodyClass(props.isOpen);
    bindMethods(
      [
        "selectType",
        "onCancelClick",
        "onOkClick",
        "close",
        "onRest",
        "FooterBtn"
      ],
      this
    );
  }
  componentWillReceiveProps(nextProps) {
    if ("isOpen" in nextProps) {
      this.setState({
        isOpen: nextProps.isOpen
      });
      toggleBodyClass(nextProps.isOpen);
    }
  }
  close() {
    this.setState({
      isOpen: false
    });
    toggleBodyClass(false);
    return false;
  }
  onCancelClick() {
    this.props.onCancel();
    this.close();
  }
  onOkClick() {
    this.props.onOk();
    this.close();
  }
  onRest() {
    const { isOpen } = this.state;
    if (!isOpen) {
      this.props.onClose();
    }
    this.props.onRest();
  }
  selectType(type) {
    switch (type) {
      case "HashNiu":
        return <ExplainCont />;
      case "HashJc":
        return <ExplainCont />;
      case "HashYydb":
        return <ExplainCont />;
      case "TopUpAlert":
        return <TopUpAlert />;
      case "WithdrawalAlert":
        return <WithdrawalAlert />;
      case "ExchangeCoin":
        return <ExchangeCoin close={this.close} />;
      default:
        return;
    }
  }
  FooterBtn(isButton) {
    const { okText, cancelText } = this.props;
    switch (isButton) {
      case 0:
        return;
      case 1:
        return (
          <Fragment>
            <button>{okText}</button>;
            <button onClick={this.close}>{cancelText}</button>
          </Fragment>
        );
      case 2:
        return <button className="OkBtn">{okText}</button>;
      default:
        return;
    }
  }
  render() {
    const {
      title,
      children,
      className,
      okText,
      cancelText,
      onOk,
      onCancel,
      type,
      maskClosable,
      onClose,
      style,
      scrollH,
      titleStyle,
      isButton
    } = this.props;
    const { isOpen } = this.state;
    return (
      <Motion
        defaultStyle={{
          opacity: 0.8,
          scale: 0.8
        }}
        style={{
          opacity: spring(isOpen ? 1 : 0, presets.stiff),
          scale: spring(isOpen ? 1 : 0.8, presets.stiff)
        }}
        onRest={this.onRest}
      >
        {({ opacity, scale }) => (
          <ExolainShade
            className={className}
            style={{ opacity }}
            onClick={maskClosable ? this.close : () => {}}
          >
            <ExolainWrapper
              onClick={e => {
                e.stopPropagation();
              }}
              style={{
                opacity,
                transform: `scale(${scale})`,
                ...style
              }}
            >
              <p className="close animated" onClick={this.close}>
                <i className="iconfont">&#xe619;</i>
              </p>
              <ModalTitle style={titleStyle}>{title}</ModalTitle>
              <ModalContent  isButton={isButton}>
                <ScrollH>{this.selectType(type)}</ScrollH>
              </ModalContent>
             
            </ExolainWrapper>
          </ExolainShade>
        )}
      </Motion>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  maskClosable: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.string,
  onRest: PropTypes.func,
  isButton: PropTypes.number //1双按钮，2单个按钮,0默认没有
};

Modal.defaultProps = {
  className: "",
  maskClosable: true,
  onCancel: () => {},
  onOk: () => {},
  okText: "确定",
  cancelText: "取消",
  type: "alert",
  onRest: () => {},
  isButton: 0
};

const ExplainCont = props => {
  return (
    <ExplainContWrapper>
      <p>在ETH哈希值当中,从后往前取20个字符，5个字符为一手牌，总共4手牌。</p>
      <div className="HashNum">
        <p>······</p>
        <p>
          <span className="color1">7ce68</span>
          <span>庄</span>
        </p>
        <p>
          <span className="color2">48cdc</span>
          <span>天</span>
        </p>
        <p>
          <span className="color3">ea2d9</span>
          <span>地</span>
        </p>
        <p>
          <span className="color4">e26d3</span>
          <span>玄</span>
        </p>
      </div>
      <p>
        其中字母为10，三张之和为10的整数倍则成牛，否则没牛。剩余两张相
        加取个位为点数，点数是几则为牛几，五张之和为10的整数倍，则为牛
        牛。牛几即几倍，牛牛十倍。 例如：48cdc则为牛2。
        点数相同时取最大数字比大小，字母和0最大，1最小；点数和数字均相
        同时庄大。牛3以内（含牛3），相同点数时庄大。
        其中字母为10，三张之和为10的整数倍则成牛，否则没牛。剩余两张相
        加取个位为点数，点数是几则为牛几，五张之和为10的整数倍，则为牛
        牛。牛几即几倍，牛牛十倍。 例如：48cdc则为牛2。
        点数相同时取最大数字比大小，字母和0最大，1最小；点数和数字均相
        同时庄大。牛3以内（含牛3），相同点数时庄大。
      </p>
    </ExplainContWrapper>
  );
};
