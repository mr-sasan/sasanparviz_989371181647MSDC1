import * as React from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

const Menu: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <IonButton
        onClick={() => {
          history.push("/tests");
        }}>
        لیست آزمون ها
      </IonButton>
      <IonButton
        onClick={() => {
          history.push("/newTest");
        }}>
        آزمون جدید
      </IonButton>
    </>
  );
};

export default Menu;
