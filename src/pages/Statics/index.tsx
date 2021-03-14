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
import { DataGrid, GridColDef, GridCellParams } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";

// Components
import Menu from "../../components/Menu";

class Statics extends React.Component {
  state = {
    selectedDate: "2021 17 May",
    data: [
      {
        id: "توزیع نمرات",
        color: "hsl(210, 76%, 38%)",
        data: [
          {
            x: "10",
            y: 102,
          },
          {
            x: "20",
            y: 43,
          },
        ],
      },
    ],
    rows: [
      {
        id: 1,
        loginCodeId: 1,
        name: "ساسان پرویز",
        score: 100,
        stats: "پذیرفته نشده",
      },
    ],
    currentPageUrl: window.location.href,
    isToastOpen: false,
    toastMessage: "",
  };

  columns: GridColDef[] = [
    { field: "id", headerName: "آیدی", width: 100 },
    { field: "loginCode", headerName: "کد ورود", width: 100 },
    { field: "name", headerName: "نام کاربر", width: 200 },
    { field: "score", headerName: "نمره", width: 200 },
    { field: "stats", headerName: "وضعیت", width: 200 },
    {
      field: "tools",
      headerName: "امکانات",
      sortable: false,
      width: 250,
      renderCell: (params: GridCellParams) => (
        <strong>
          <Button
            onClick={() => {
              this.sendAcceptUserData(params.getValue("id"));
            }}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}>
            پذیرفتن
          </Button>
        </strong>
      ),
    },
  ];

  sendAcceptUserData = (id: any) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };

    fetch("http://localhost:3001/test/acceptUser", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isToastOpen: true,
          toastMessage: result.message,
        });
        if (!result.error) {
          this.doFetch();
        }
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    setInterval(() => {
      if (window.location.href !== this.state.currentPageUrl) {
        this.setState({
          currentPageUrl: window.location.href,
        });
        this.doFetch();
      }
    }, 1000);

    this.doFetch();
  }

  doFetch = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const testId = window.location.href.split("?")[1];

    fetch("http://localhost:3001/test/statics/" + testId, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        result.chartData.forEach((item: { x: any; _id: any; y: any; count: any }) => {
          item.x = item._id;
          item.y = item.count;

          delete item._id;
          delete item.count;
        });

        let tableRows: { id: any; loginCode: any; name: any; score: any; stats: string }[] = [];
        result.tableData.map(
          (item: {
            _id: any;
            loginCodeId: { _id: any; fullName: any };
            score: any;
            accepted: boolean;
          }) => {
            tableRows.push({
              id: item._id,
              loginCode: item.loginCodeId._id,
              name: item.loginCodeId.fullName,
              score: item.score,
              stats: item.accepted === true ? "پذیرفته شده" : "پذیرفته نشده",
            });
          }
        );

        let newData = [...this.state.data];
        newData[0].data = result.chartData;
        this.setState({
          data: newData,
          rows: tableRows,
        });

        console.log(tableRows);
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
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>نمودار توزیع</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <div className="chartContainer">
                <ResponsiveLine
                  data={this.state.data}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                  }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "نمرات",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "تعداد",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(255, 255, 255, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(255, 255, 255, .03)",
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>لیست کاربران</IonCardTitle>
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

export default Statics;
