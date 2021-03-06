import { ErrorMessage, Label, Radio, RadioGroup } from "@datapunt/asc-ui";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { ComponentWrapper } from "../atoms";
import { removeQuotes } from "../utils";
import { QUESTION_ANSWERS } from "../utils/test-ids";

const Answers = ({
  className,
  answers,
  userAnswer,
  errors,
  questionId,
  onChange,
}) => (
  <ComponentWrapper data-testid={QUESTION_ANSWERS}>
    <RadioGroup className={className} name={questionId}>
      {answers &&
        answers.map((answer) => {
          const { label, formValue } = answer;
          const answerId = `${questionId}-${formValue}`;
          return (
            <Label
              htmlFor={answerId}
              key={answerId}
              label={removeQuotes(label)}
            >
              <Radio
                key={answerId}
                value={formValue}
                id={answerId}
                onChange={(e) => onChange(e)}
                checked={userAnswer === answer.label}
                error={errors[questionId]}
              />
            </Label>
          );
        })}
    </RadioGroup>
    {errors[questionId] && (
      <ErrorMessage message={errors[questionId].message} />
    )}
  </ComponentWrapper>
);

const StyledAnswers = styled(Answers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

Answers.propTypes = {
  answers: PropTypes.array,
  className: PropTypes.string,
  errors: PropTypes.any,
  questionId: PropTypes.string,
  onChange: PropTypes.func,
  userAnswer: PropTypes.string,
};

export default StyledAnswers;
