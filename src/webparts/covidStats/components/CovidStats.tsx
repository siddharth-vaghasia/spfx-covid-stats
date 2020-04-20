import * as React from 'react';
import styles from './CovidStats.module.scss';
import { ICovidStatsProps } from './ICovidStatsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Overview from '../components/Overview';
import ByCountries from '../components/ByCountries';


export default class CovidStats extends React.Component<ICovidStatsProps, {}> {
  public render(): React.ReactElement<ICovidStatsProps> {
    // return (
    //   <div className={ styles.covidStats }>
    //     <div className={ styles.container }>
    //       <div className={ styles.row }>
    //         <div className={ styles.column }>
    //           <span className={ styles.title }>Welcome to SharePoint!</span>
    //           <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
    //           <p className={ styles.description }>{escape(this.props.description)}</p>
    //           <a href="https://aka.ms/spfx" className={ styles.button }>
    //             <span className={ styles.label }>Learn more</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );

    return(

      <React.Fragment>
        <Overview context={this.props.context}>
        </Overview>
        <ByCountries context={this.props.context}>
        </ByCountries>
      </React.Fragment>

    );
  }
}
