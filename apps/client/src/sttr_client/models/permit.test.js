import Checker from "./checker";
import Decision from "./decision";
import Permit from "./permit";
import Question from "./question";
import Rule from "./rule";

const getChecker = (questions) => {
  const d1 = new Decision("dummy", questions, [
    new Rule([false], "no"),
    new Rule([true, false], "not sure"),
    new Rule([true, true], "yes"),
  ]);
  const dummy = new Decision(
    "dummy",
    [d1],
    [
      new Rule(["no"], "nope"),
      new Rule(["not sure"], "what?"),
      new Rule(["yes"], "hell yeah"),
    ]
  );
  return new Checker([new Permit("drivers-licence", [dummy])]);
};
const getQuestions = () => [
  new Question({
    id: "aaa",
    type: "boolean",
    text: "Are you older then 18 years?",
    prio: 10,
  }),
  new Question({
    id: "bbb",
    type: "boolean",
    text: "Do you live in the Netherlands?",
    prio: 20,
  }),
];

describe("Permit", () => {
  test("getDecisionById", () => {
    const d = new Decision("somedummy", getQuestions(), [
      new Rule([false], "no"),
    ]);
    const permit = new Permit("myperm", [d]);
    expect(permit.getDecisionById("somedummy")).toBe(d);
  });
  test("simple sttr checker", () => {
    const questions = getQuestions();
    const checker = getChecker(questions);
    let question = checker.next();
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);

    // Change the values a bit on the first question
    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe("nope");
    question.setAnswer(true);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);

    // Answer and move to next question
    question = checker.next();
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe(undefined);
    question.setAnswer(false);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe("what?");
    question.setAnswer(true);
    expect(checker.permits[0].getOutputByDecisionId("dummy")).toBe("hell yeah");

    question = checker.next();
    expect(question).toBe(null);
  });
});
