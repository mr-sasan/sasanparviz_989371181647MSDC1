import * as React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./style.css";

// Components
import Menu from "../../components/Menu";

type IQuestion = {
  title: string;
  time: number;
  score: number;
  answers: [string];
  correctAnswer: number;
};

class NewTest extends React.Component {
  state = {
    name: "",
    selectedDate: new Date().toLocaleString(),
    questionList: [] as IQuestion[],
    isToastOpen: false,
    toastMessage: "",
  };

  questionInput: React.RefObject<HTMLIonInputElement>;
  answer1Input: React.RefObject<HTMLIonInputElement>;
  answer2Input: React.RefObject<HTMLIonInputElement>;
  answer3Input: React.RefObject<HTMLIonInputElement>;
  answer4Input: React.RefObject<HTMLIonInputElement>;
  timeInput: React.RefObject<HTMLIonInputElement>;
  scoreInput: React.RefObject<HTMLIonInputElement>;
  correctAnswerInput: React.RefObject<HTMLIonInputElement>;

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.questionInput = React.createRef();
    this.answer1Input = React.createRef();
    this.answer2Input = React.createRef();
    this.answer3Input = React.createRef();
    this.answer4Input = React.createRef();
    this.timeInput = React.createRef();
    this.scoreInput = React.createRef();
    this.correctAnswerInput = React.createRef();
  }

  componentDidMount() {}

  addNewQuestion = () => {
    const title = this.questionInput!.current!.value;
    const answer1 = this.answer1Input!.current!.value;
    const answer2 = this.answer2Input!.current!.value;
    const answer3 = this.answer3Input!.current!.value;
    const answer4 = this.answer4Input!.current!.value;
    const time = this.timeInput!.current!.value;
    const score = this.scoreInput!.current!.value;
    const correctAnswer = this.correctAnswerInput!.current!.value;

    if (!title || !answer1 || !answer2 || !time || !score || !correctAnswer) {
      this.setState({
        isToastOpen: true,
        toastMessage: "لطفا تمام فیلد های الظامی رو پر کنید",
      });
    }

    let answers = [];
    if (answer1) answers.push(answer1);
    if (answer2) answers.push(answer2);
    if (answer3) answers.push(answer3);
    if (answer4) answers.push(answer4);

    this.setState({
      questionList: [
        ...this.state.questionList,
        {
          title: title,
          time: +time!,
          score: +score!,
          answers,
          correctAnswer: +correctAnswer!,
        },
      ],
    });

    this.questionInput!.current!.value = "";
    this.answer1Input!.current!.value = "";
    this.answer2Input!.current!.value = "";
    this.answer3Input!.current!.value = "";
    this.answer4Input!.current!.value = "";
    this.timeInput!.current!.value = "";
    this.scoreInput!.current!.value = "";
    this.correctAnswerInput!.current!.value = "";
  };

  sendData = () => {
    if (this.state.name === "" || this.state.questionList.length <= 0) {
      this.setState({
        isToastOpen: true,
        toastMessage: "لطفا تمام فیلد های الظامی رو پر کنید",
      });
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        selectedDate: this.state.selectedDate,
        questionList: this.state.questionList,
      }),
    };
    fetch("http://localhost:3001/test/add", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonToast
            isOpen={this.state.isToastOpen}
            message={this.state.toastMessage}
            position="top"
            buttons={[
              {
                text: "باشه",
                role: "cancel",
                handler: () => {
                  this.setState({
                    isToastOpen: false,
                  });
                },
              },
            ]}
          />
          <Menu />
          <IonCard className="card">
            <IonCardHeader>
              <IonCardTitle>آزمون جدید</IonCardTitle>
              <IonCardSubtitle>
                اضافه کردن آزمون جدید (تاریخ پایان آزمون برابر است با تاریخ شروع آزمون بعلاوه مجموع
                زمان سوالات)
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">نام کامل آزمون</IonLabel>
                      <IonInput
                        value={this.state.name}
                        onIonChange={(e) => this.setState({ name: e.detail.value! })}></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel>تاریخ شروع آزمون</IonLabel>
                      <IonDatetime
                        doneText="ثبت"
                        cancelText="بستن"
                        displayFormat="YYYY/MM/DD h:mm A"
                        value={this.state.selectedDate}
                        onIonChange={(e) =>
                          this.setState({ selectedDate: e.detail.value! })
                        }></IonDatetime>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <IonItem>
                <IonLabel position="floating">متن سوال</IonLabel>
                <IonInput ref={this.questionInput}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">جواب اول</IonLabel>
                <IonInput ref={this.answer1Input}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">جواب دوم</IonLabel>
                <IonInput ref={this.answer2Input}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">جواب سوم (در صورت بی نیازی خالی بگذارید)</IonLabel>
                <IonInput ref={this.answer3Input}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">جواب چهارم (در صورت بی نیازی خالی بگذارید)</IonLabel>
                <IonInput ref={this.answer4Input}></IonInput>
              </IonItem>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">زمان (ثانیه)</IonLabel>
                      <IonInput ref={this.timeInput}></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">امتیاز (عدد)</IonLabel>
                      <IonInput ref={this.scoreInput}></IonInput>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">گزینه درست (1 یا 2 یا 3 یا 4)</IonLabel>
                      <IonInput ref={this.correctAnswerInput}></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <IonButton className="button" color="primary" onClick={this.addNewQuestion}>
                اضافه کردن سوال جدید
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="card">
            <IonCardHeader>
              <IonCardTitle>لیست سوالات</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {this.state.questionList.map((item, i) => {
                let answers: string = "";
                item.answers.map((item, i) => {
                  answers += i + 1 + ": " + item + "   ";
                });
                return (
                  <IonItem>
                    <p className="questions">
                      {i + 1}. {item.title} <br /> {answers}
                      <br /> گزینه صحیح: {item.correctAnswer} - امتیاز: {item.score} - زمان:
                      {item.time} ثانیه
                    </p>
                  </IonItem>
                );
              })}

              <IonButton
                onClick={this.sendData}
                className="button"
                size="large"
                expand="full"
                color="primary">
                ثبت آزمون
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default NewTest;
