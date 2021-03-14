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

type RollProps = {
  completedEvent: (rnd: number) => void;
};

const Roll = ({ completedEvent }: RollProps) => {
  const [rollRotate, setRollRotate] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const randomRoll = (): void => {
    const rnd = Math.round(Math.random() * 10);
    setRollRotate(36 * rnd + 360);
    setButtonDisabled(true);
    completedEvent(rnd);
  };
  return (
    <IonCardContent>
      <div className="rollIndicator"></div>
      <div className="rollSuperParent">
        <div id="rollContainer" className="trans3d">
          <div id="rollcParent">
            <section
              id="rollItemsContainer"
              className="trans3d"
              style={{
                transform:
                  "translate3d(0px, 0px, -500px) rotateY(-" + rollRotate + "deg) translateX(10%)",
              }}>
              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>10</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>20</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>30</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>40</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>50</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>60</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>70</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>80</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>90</span>
                </div>
              </figure>

              <figure className="rollItem trans3d">
                <div className="rollItemInner trans3d">
                  <span>100</span>
                </div>
              </figure>
            </section>
          </div>
        </div>
      </div>
      <IonButton
        onClick={randomRoll}
        disabled={buttonDisabled}
        className="buttonRoll"
        color="primary">
        چرخوندن گردونه شانس
      </IonButton>
    </IonCardContent>
  );
};
export default Roll;
