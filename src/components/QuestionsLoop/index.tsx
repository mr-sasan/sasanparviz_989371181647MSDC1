import React, { Component } from "react";
import "./style.css";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonIcon,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio,
  IonItemDivider,
  IonSpinner,
  IonChip,
} from "@ionic/react";

// Interfaces
import IUserAnswer from "./IUserAnswer";
import IQuestions from "../../Interfaces/IQuestion";

type QuestionsLoopProps = {
  questions: [IQuestions];
  endTimestamp: Date;
  completedEvent: (userAnswers: IUserAnswer[]) => void;
};

class QuestionsLoop extends Component<QuestionsLoopProps> {
  state = {
    userAnswers: [],
    currentQuestion: 0,
    currentAnswer: -1,
    timeRemaining: 0,
  };

  interval: NodeJS.Timeout = setInterval(() => {}, 99999999);
  time: number = this.props.questions[this.state.currentQuestion].time;

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeRemaining: --this.time,
      });

      let now = new Date().getTime();
      let countDownDate = new Date(this.props.endTimestamp).getTime();
      let distance = countDownDate - now;

      if (this.time <= 0 || distance <= 0) {
        const obj: IUserAnswer = {
          _id: this.props.questions[this.state.currentQuestion]._id,
          answerIndex: this.state.currentAnswer,
        };
        this.setState({
          userAnswers: [...this.state.userAnswers, obj],
        });

        if (this.state.currentQuestion + 1 >= this.props.questions.length) {
          this.props.completedEvent([...this.state.userAnswers, obj]);
          clearInterval(this.interval);
        } else {
          this.time = this.props.questions[this.state.currentQuestion + 1].time;
          this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            currentAnswer: -1,
          });
        }
      }
    }, 1000);
  }

  render() {
    return (
      <IonCardContent>
        <div className="QuestionStats">
          <IonChip>
            <IonLabel>
              سوال {this.state.currentQuestion + 1} از {this.props.questions.length}
            </IonLabel>
          </IonChip>
        </div>
        <div className="QuestionTime">
          <IonChip>
            <IonLabel>{this.state.timeRemaining} ثانیه مانده</IonLabel>
          </IonChip>
        </div>
        <IonList>
          <IonRadioGroup
            value={this.state.currentAnswer}
            onIonChange={(e) => this.setState({ currentAnswer: +e.detail.value })}>
            <IonListHeader className="question">
              <IonLabel>
                {this.state.currentQuestion + 1}.{" "}
                {this.props.questions[this.state.currentQuestion].title}
              </IonLabel>
            </IonListHeader>

            {this.props.questions[this.state.currentQuestion].answers.map((item, i) => {
              return (
                <IonItem key={"answer_" + i}>
                  <IonLabel>{item}</IonLabel>
                  <IonRadio slot="start" value={i} />
                </IonItem>
              );
            })}
          </IonRadioGroup>
        </IonList>

        <IonButton
          className="button"
          color="success"
          expand="block"
          disabled={this.state.currentAnswer === -1 ? true : false}
          onClick={() => {
            const obj: IUserAnswer = {
              _id: this.props.questions[this.state.currentQuestion]._id,
              answerIndex: this.state.currentAnswer,
            };
            this.setState({
              userAnswers: [...this.state.userAnswers, obj],
            });

            if (this.state.currentQuestion + 1 >= this.props.questions.length) {
              this.props.completedEvent([...this.state.userAnswers, obj]);
              clearInterval(this.interval);
            } else {
              this.time = this.props.questions[this.state.currentQuestion + 1].time;
              this.setState({
                currentQuestion: this.state.currentQuestion + 1,
                currentAnswer: -1,
              });
            }
          }}>
          ثبت جواب و سوال بعدی
        </IonButton>
      </IonCardContent>
    );
  }
}

export default QuestionsLoop;
