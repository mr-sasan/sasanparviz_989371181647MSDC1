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
import "./Style.css";
import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Interfaces
import ITest from "../../Interfaces/ITest";
import IUserAsnwer from "../../components/QuestionsLoop/IUserAnswer";
import ITimeRemaining from "../../components/Countdown/ITimeRemaining";

// Components
import Countdown from "../../components/Countdown";
import QuestionsLoop from "../../components/QuestionsLoop";
import Roll from "../../components/Roll";

const Questions: React.FC = () => {
  const history = useHistory();
  const [test, setTest] = useState<ITest>();
  const [loading, setLoading] = useState(true);
  const [isRollOn, setRollStats] = useState(false);
  const [userAnswers, setUserAnswers] = useState<IUserAsnwer[]>();
  const [timeRemaining, setTimeRemaining] = useState<ITimeRemaining>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (): void => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bareer " + token,
      },
    };

    fetch("http://localhost:3000/test", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setTimeout(() => {
          setTest(result);
          setLoading(false);

          let countDownDate = new Date(result.endTimestamp).getTime();
          let interval = setInterval(() => {
            let now = new Date().getTime();

            let distance = countDownDate - now;

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeRemaining({
              days,
              hours,
              minutes,
              seconds,
            });

            if (distance <= 0) {
              clearInterval(interval);
            }
          }, 1000);
        }, 2000);
      })
      .catch((e) => console.log(e));
  };

  const sendData = (userRoll: number): void => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bareer " + token,
      },
      body: JSON.stringify({ userRoll, userAnswers, test }),
    };

    fetch("http://localhost:3000/test", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        setTimeout(() => {
          localStorage.removeItem("token");
          history.goBack();
        }, 20000);
      })
      .catch((e) => console.log(e));
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {loading && (
          <div className="center loading-box">
            <IonSpinner name="crescent" />
          </div>
        )}

        {test?.error && (
          <Countdown
            title="زمان باقی مانده تا شروع آزمون"
            endDate={test.startTimestamp}
            expiredEvent={fetchData}
          />
        )}
        {test && !test.error && (
          <div className={isRollOn ? "overallTimer top-2" : "overallTimer"}>
            <IonChip>
              <IonLabel>
                زمان کلی: {timeRemaining?.days} روز {timeRemaining?.hours} ساعت{" "}
                {timeRemaining?.minutes} دقیقه {timeRemaining?.seconds} ثانیه مانده
              </IonLabel>
            </IonChip>
          </div>
        )}
        {test && !test.error && !isRollOn && (
          <IonCard className="questionsCard">
            <IonCardHeader color="primary">
              <h2 className="Title">{test?.name}</h2>
            </IonCardHeader>
            <QuestionsLoop
              questions={test!.questions}
              endTimestamp={test!.endTimestamp}
              completedEvent={(userAnswers) => {
                setUserAnswers(userAnswers);
                setRollStats(true);
              }}
            />
          </IonCard>
        )}
        {isRollOn && (
          <IonCard className="questionsCard">
            <IonCardHeader color="primary">
              <h2 className="Title">گردونه شانس</h2>
            </IonCardHeader>
            <Roll
              completedEvent={(rnd) => {
                sendData(rnd);
              }}
            />
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Questions;
