import React, { useRef } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./style.css";

// Components
import Menu from "../../components/Menu";

class NewUser extends React.Component {
  state = {
    isToastOpen: false,
    toastMessage: "",
    userCode: "",
    fullName: "",
  };

  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  sendData = () => {
    if (this.state.fullName) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: this.state.fullName }),
      };
      const testId = window.location.href.split("?")[1];

      fetch("http://localhost:3001/test/addUser/" + testId, requestOptions)
        .then((res) => res.json())
        .then((result) => {
          if (result.error) {
            this.setState({
              isToastOpen: true,
              toastMessage: result.message,
            });
          } else {
            this.setState({
              isToastOpen: true,
              toastMessage: result.message,
              userCode: result.code,
            });
          }
        })
        .catch((e) => console.log(e));
    } else {
      this.setState({
        isToastOpen: true,
        toastMessage: "لطفا فیلد نام را پر کنید",
      });
    }
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
          <IonCard className="card center">
            <IonCardHeader>
              <IonCardTitle>آزمون دهنده جدید</IonCardTitle>
              <IonCardSubtitle>اضافه کردن آزمون دهنده جدید به یک آزمون</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">نام کامل آزمون دهنده</IonLabel>
                <IonInput
                  value={this.state.fullName}
                  onIonChange={(e) => this.setState({ fullName: e.detail.value })}></IonInput>
              </IonItem>
              <IonButton onClick={this.sendData} className="button" color="primary">
                ثبت
              </IonButton>
              <IonText color="primary">
                <h2>کد شرکت در آزمون این کاربر: {this.state.userCode}</h2>
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default NewUser;
