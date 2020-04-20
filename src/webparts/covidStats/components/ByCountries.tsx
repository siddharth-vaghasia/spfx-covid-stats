import * as React from 'react';
import styles from './CovidStats.module.scss';
import { ICovidStatsProps } from './ICovidStatsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {ServiceProvider} from '../../../ServiceProvider';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn,SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import Country from '../components/Country';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
export interface IByCountriesProps {
  context:WebPartContext;
}


export interface IByCountriesState {
  data:any;
  showmodal:boolean;
  selectedCountry:string;
  
}


export default class OverViewStats extends React.Component<IByCountriesProps, IByCountriesState> {

  private serviceProvider;
  private _columns: IColumn[];
  private alldata:any;
  
  public constructor(props: IByCountriesProps, state: IByCountriesState) {
    super(props);
    this.serviceProvider = new ServiceProvider(this.props.context);

    this.state = {
      data:{},
      showmodal:false,
      selectedCountry:""
      
    };

    this._columns = [
      { key: 'country', name: 'Country', fieldName: 'country', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'confirmed', name: 'Confirmed', fieldName: 'confirmed', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'recovered', name: 'Recovered', fieldName: 'recovered', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'critical', name: 'Critical', fieldName: 'critical', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'deaths', name: 'Deaths', fieldName: 'deaths', minWidth: 100, maxWidth: 200, isResizable: true },
      // { key: 'country', name: 'Country', fieldName: 'country', minWidth: 100, maxWidth: 200, isResizable: true },
      // { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    // this._selection = new Selection({
    //   onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() }),
    // });

  }

 

  public render(): React.ReactElement<IByCountriesProps> {
       return(

      <React.Fragment>
<TextField
          
          label="Filter by country:"
          onChange={this._onFilter}
          styles={{ root: { maxWidth: '300px' } }}
        />

<DetailsList
            compact={true}
            items={this.state.data}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            //  selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            
            onItemInvoked={(item)=>this._onItemInvoked(item)}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            selectionMode={SelectionMode.single}
          />
        
        {this.state.showmodal &&
        <Country oncloseDailog={()=>this.onchildCloseDailog()} context={this.props.context} country={this.state.selectedCountry}>

        </Country>
        }

      </React.Fragment>

    );
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      data: text ? this.alldata.filter(i => i.country.toLowerCase().indexOf(text) > -1) : this.alldata,
    });
  }

  private _onItemInvoked(item: any): void {
    // alert(`Item invoked: ${item}`);
    this.setState({selectedCountry:item.country,
      showmodal:true});
  }
  
  private onchildCloseDailog(){
    this.setState({selectedCountry:"",
      showmodal:false});

  }


  public async  componentDidMount(){
    this.getData();
  }

  private getData(){
    this.serviceProvider.
    getAllCountries() 
      .then(
        (result: any): void => {
           console.log(result);
           this.setState({data:result});
           this.alldata= result;
        }
      )
      .catch(error => {
        console.log(error);
      });

  }
}
