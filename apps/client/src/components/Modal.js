import { Close } from "@datapunt/asc-assets";
import {
  Modal as BaseModal,
  Button,
  Divider,
  Heading,
  Icon,
  TopBar,
} from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

import Markdown from "./Markdown";

const ModalBlock = styled.div`
  display: block;
  padding: 0 15px;
  margin: 15px 0;
`;

const Modal = ({ modalText }) => {
  const [explanationShown, toggleExplanationShown] = useState(false);

  return (
    <div style={{ marginBottom: 24 }}>
      <Button
        type="button"
        color="primary"
        onClick={() => toggleExplanationShown(!explanationShown)}
      >
        Toelichting
      </Button>
      <BaseModal
        style={{ top: "34%" }}
        aria-labelledby="Toelichting"
        aria-describedby="Toelichting"
        open={explanationShown}
        onClose={() => {
          toggleExplanationShown(!explanationShown);
        }}
      >
        <div style={{ minHeight: "50vh" }}>
          <TopBar>
            <Heading forwardedAs="h4" style={{ flexGrow: 1 }}>
              Toelichting
              <Button
                type="button"
                size={30}
                variant="blank"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExplanationShown(!explanationShown);
                }}
              >
                <Icon size={20}>
                  <Close />
                </Icon>
              </Button>
            </Heading>
          </TopBar>
          <Divider />
          <ModalBlock>
            <Markdown source={modalText} />
          </ModalBlock>
        </div>
      </BaseModal>
    </div>
  );
};

Modal.propTypes = {
  modalText: PropTypes.string,
};

export default Modal;
