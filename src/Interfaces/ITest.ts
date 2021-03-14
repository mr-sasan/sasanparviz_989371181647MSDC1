import IQuestions from "./IQuestion";

export default interface ITest {
  error: boolean;
  _id: String;
  name: String;
  startTimestamp: Date;
  endTimestamp: Date;
  questions: [IQuestions];
  createdAt: Date;
  updatedAt: Date;
}
