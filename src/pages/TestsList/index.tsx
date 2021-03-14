import * as React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./style.css";
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import Menu from "../../components/Menu";

class TestsList extends React.Component {
  state = {
    rows: [],
  };

  componentDidMount() {
    fetch("http://localhost:3001/test/list")
      .then((res) => res.json())
      .then((result) => {
        result.forEach(
          (obj: { id: any; _id: any; startTimestamp: any; endTimestamp: any; createdAt: any }) => {
            obj.id = obj._id;
            obj.startTimestamp = new Date(obj.startTimestamp).toLocaleString();
            obj.endTimestamp = new Date(obj.endTimestamp).toLocaleString();
            obj.createdAt = new Date(obj.createdAt).toLocaleString();
            delete obj._id;
          }
        );
        this.setState({
          rows: result,
        });
      })
      .catch((e) => console.log(e));
  }

  columns: GridColDef[] = [
    { field: "id", headerName: "آیدی", width: 100 },
    { field: "name", headerName: "نام آزمون", width: 200 },
    { field: "startTimestamp", headerName: "تاریخ شروع آزمون", width: 200 },
    { field: "endTimestamp", headerName: "تاریخ اتمام آزمون", width: 200 },
    { field: "createdAt", headerName: "تاریخ تولید", width: 200 },
    {
      field: "tools",
      headerName: "امکانات",
      sortable: false,
      width: 250,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Link to={"/statics?" + params.getValue("id")}>
            <Button variant="contained" color="primary" size="small" style={{ marginLeft: 16 }}>
              آمار و ارقام
            </Button>
          </Link>
          <Link to={"/newUser?" + params.getValue("id")}>
            <Button variant="contained" color="primary" size="small" style={{ marginLeft: 16 }}>
              آزمون دهنده جدید
            </Button>
          </Link>
        </strong>
      ),
    },
  ];

  render() {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Menu />
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>لیست آزمون ها</IonCardTitle>
              <IonCardSubtitle>لیست تمامی آزمون ها و نمایش آمار و امکانات دیگر</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <div className="tableTestsList">
                <DataGrid
                  rows={this.state.rows}
                  columns={this.columns}
                  pageSize={5}
                  disableSelectionOnClick
                />
              </div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}

export default TestsList;
