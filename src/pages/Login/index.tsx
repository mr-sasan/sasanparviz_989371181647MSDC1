import "./Style.css";
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
  IonToast,
} from "@ionic/react";

import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();
  const loginCodeRef = useRef<HTMLIonInputElement>(null);

  const [toastMessage, setToastMessage] = useState("");

  const loginHandler = (): void => {
    const loginCode = loginCodeRef.current!.value;

    if (!loginCode) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loginCode: loginCodeRef.current!.value }),
    };

    fetch("http://localhost:3000/login", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        // move to questions page
        if (result.error) {
          setToastMessage(result.message);
        } else {
          localStorage.setItem("token", result.token);
          history.push("/questions");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <IonPage>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        position="top"
        buttons={[
          {
            text: "باشه",
            role: "cancel",
            handler: () => {
              setToastMessage("");
            },
          },
        ]}
      />
      <IonContent fullscreen>
        <IonCard className="loginCard">
          <IonCardHeader color="primary">
            <h2 className="Title">فرم ورود به آزمون</h2>
          </IonCardHeader>

          <IonCardContent>
            <IonItem className="inputContainer">
              <IonLabel position="floating">کد ورود</IonLabel>
              <IonInput ref={loginCodeRef}></IonInput>
            </IonItem>
            <IonButton className="button" expand="full" onClick={loginHandler}>
              ورود
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
