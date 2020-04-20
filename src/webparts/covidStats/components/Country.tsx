import * as React from 'react';
import styles from './CovidStats.module.scss';
import { ICovidStatsProps } from './ICovidStatsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {ServiceProvider} from '../../../ServiceProvider';
import * as moment from 'moment';
// import {Modal} from 'office-ui-fabric-react';
import { Dialog, DialogFooter,DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
export interface ICountryProps {
  context:WebPartContext;
  country:string;
  oncloseDailog:any;
}


export interface ICountryState {
  data:any;
  date:Date;
  isdataloaded:boolean;
  hidedailog:boolean;
}


export default class Country extends React.Component<ICountryProps, ICountryState> {

  private serviceProvider;

  public constructor(props: ICountryProps, state: ICountryState) {
    super(props);
    this.serviceProvider = new ServiceProvider(this.props.context);

    var d = new Date();
    d.setDate(d.getDate() - 1);
    
    this.state = {
      data:null,
      date: d,
      isdataloaded:false,
      hidedailog:false
    };

  }

  public render(): React.ReactElement<ICountryProps> {
       return(

      <React.Fragment>
        {this.state.isdataloaded &&
        <Dialog
        hidden={this.state.hidedailog}
        onDismiss={this._closeDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: this.state.data?this.state.data.country:"Country Data not found",
          subText:this.state.data?'Stats as of ' + this.state.data.day + ' ' +  this.state.data.time:""
            
        }}
        modalProps={{
          isBlocking: false
        }}
      >
        {this.state.data &&
        <React.Fragment>
        <h3>New:{this.state.data.cases.new}</h3>
        <h3>Active: {this.state.data.cases.active}</h3>
        <h3>Critical: {this.state.data.cases.critical}</h3>
        <h3>Recovered: {this.state.data.cases.recovered}</h3>
        <h3>Total: {this.state.data.cases.total}</h3>
        <h3>New Deaths: {this.state.data.deaths.new}</h3>
        <h3>Total Deaths: {this.state.data.deaths.total}</h3>
        <h3>Total Test Conducted: {this.state.data.tests.total}</h3>
        </React.Fragment>
      }

        <DialogFooter>
            <DefaultButton onClick={this._closeDialog} text="Close" />
            
          </DialogFooter>

        </Dialog>

        }
      </React.Fragment>

    );
  }

  private _closeDialog = (): void => {
    this.setState({hidedailog:true});
    this.props.oncloseDailog();
  }

  public async  componentDidMount(){
    this.getData();
  }

  private getData(){
   var d= moment(this.state.date);
    this.serviceProvider.
    getCountryData(this.props.country,d.format("YYYY-MM-DD")) 
      .then(
        (result: any): void => {
           console.log(result);
           this.setState({data:result.response[0]});
           this.setState({isdataloaded:true});
        }
      )
      .catch(error => {
        console.log(error);
      });

  }

  // public async componentWillUnmount(){
  //   this.setState({hidedailog:true});

  // }
}
