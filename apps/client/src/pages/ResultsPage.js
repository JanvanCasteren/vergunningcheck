import React from "react";
import { useHistory } from "react-router-dom";
import { Paragraph } from "@datapunt/asc-ui";

import withFinalChecker from "../hoc/withFinalChecker";
import { routes, geturl, getslug } from "../routes";
import { RESULTS_PAGE } from "../utils/test-ids";
import Layout from "../components/Layouts/DefaultLayout";
import Form from "../components/Form";
import Nav from "../components/Nav";
import QuestionAnswerTable from "../components/QuestionAnswerTable";
import DebugDecisionTable from "../components/DebugDecisionTable";
import Helmet from "react-helmet";

const ResultsPage = ({ topic, checker }) => {
  const history = useHistory();
  const { slug } = topic;

  const onGoToQuestion = (index) => {
    const q = checker.rewindTo(index);
    history.push(
      geturl(routes.questions, {
        slug,
        question: getslug(q.text),
      })
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>Uitkomsten - {topic.text.heading}</title>
      </Helmet>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(geturl(routes.conclusion, { slug }));
        }}
        data-testid={RESULTS_PAGE}
      >
        <Paragraph strong>
          Hieronder kunt u per vraag uw gegeven antwoord teruglezen en eventueel
          wijzigen. Als u een wijziging doet moet u misschien enkele vragen
          opnieuw beantwoorden.
        </Paragraph>

        <QuestionAnswerTable
          topic={topic}
          checker={checker}
          onGoToQuestion={onGoToQuestion}
        />

        <Nav
          onGoToPrev={() => onGoToQuestion(checker.stack.length - 1)}
          showPrev
          showNext
        />
        <DebugDecisionTable checker={checker} />
      </Form>
    </Layout>
  );
};

export default withFinalChecker(ResultsPage);
