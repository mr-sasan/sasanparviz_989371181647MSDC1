import React, { useEffect, useState } from "react";
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
} from "@ionic/react";

import ITimeRemaining from "./ITimeRemaining";

type CountdownProps = {
  title: string;
  endDate: Date;
  expiredEvent: () => void;
};

const Countdown = ({ title, endDate, expiredEvent }: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState<ITimeRemaining>();

  let countDownDate = new Date(endDate).getTime() + 10000;
  let interval: NodeJS.Timeout;
  useEffect(() => {
    interval = setInterval(() => {
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
        expiredEvent();
      }
    }, 1000);
  }, []);

  return (
    <IonCard className="questionsCard">
      <IonCardHeader color="primary">
        <h5 className="Title">{title}</h5>
      </IonCardHeader>
      <IonCardContent class="content">
        <span className="number">{timeRemaining?.days}</span>
        <span className="text">روز</span>
        <span className="number">{timeRemaining?.hours}</span>
        <span className="text">ساعت</span>
        <span className="number">{timeRemaining?.minutes}</span>
        <span className="text">دقیقه</span>
        <span className="number">{timeRemaining?.seconds}</span>
        <span className="text">ثانیه</span>
      </IonCardContent>
    </IonCard>
  );
};
export default Countdown;
