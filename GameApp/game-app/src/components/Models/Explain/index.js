import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Explain";

const show = props => {
  let component = null;
  const div = document.createElement("div");
  document.body.appendChild(div);

  const onClose = () => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);

    if (typeof props.onClose === "function") {
      props.onClose();
    }
  };

  ReactDOM.render(
    <Modal {...props} onClose={onClose} ref={c => (component = c)} isOpen>
      {props.content}
    </Modal>,
    div
  );
  return () => component.close();
};

const ModalBox = {}

  ModalBox.HashNiu = (props) => show({
    ...props,
    type: 'HashNiu'
  });
  
  ModalBox.InvateShareAlert = (props) => show({
    ...props,
    type: 'InvateShareAlert'
  });
  
  ModalBox.HashJc = (props) => show({
    ...props,
    type: 'HashJc'
  });
  
  ModalBox.HashYydb = (props) => show({
    ...props,
    type: 'HashYydb'
  });
  
  ModalBox.TopUpAlert = (props) => show({
    ...props,
    type: 'TopUpAlert'
  });
  ModalBox.WithdrawalAlert = (props) => show({
    ...props,
    type: 'WithdrawalAlert'
  });
  ModalBox.HomeRuleAlert = (props) => show({
    ...props,
    type: 'HomeRuleAlert'
  });
  ModalBox.ExchangeCoin = (props) => show({
    ...props,
    type: 'ExchangeCoin'
  });

export default ModalBox;
