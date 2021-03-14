export default interface IQuestion {
  _id: String;
  title: String;
  time: number;
  score: number;
  answers: [String];
}
