import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Constants } from './webparts/Constant';


export class ServiceProvider {
    private wpcontext:WebPartContext;

    public constructor(context: WebPartContext) {
       this.wpcontext= context;
      }

    

    private httpClientOptionsForGlobal: IHttpClientOptions = {
        headers: new Headers({
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "a112a52b3cmsh46d30d4c18d206cp1b20b6jsn388bcdd35315"
        }),
        method: "GET",
        mode: "cors"
  };

  private httpClientOptionsForCounty: IHttpClientOptions = {
    headers: new Headers({
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "a112a52b3cmsh46d30d4c18d206cp1b20b6jsn388bcdd35315"
    }),
    method: "GET",
    mode: "cors"
};

  public async getTotals() {

   var response = await this.wpcontext.httpClient
  .get(Constants.Total_REST_URL, HttpClient.configurations.v1,this.httpClientOptionsForGlobal);
  console.log(response);

  var responeJson : any = await response.json();
  return responeJson;
  
  }

  public async getAllCountries() {

    var response = await this.wpcontext.httpClient
   .get(Constants.AllCountries_REST_URL, HttpClient.configurations.v1,this.httpClientOptionsForGlobal);
   console.log(response);
 
   var responeJson : any = await response.json();
   return responeJson;
   
   }

   public async getCountryData(countrycode, date) {
     var url = Constants.CountryData_REST_URL + "?day=" + date + "&country=" + countrycode;

    var response = await this.wpcontext.httpClient
   .get(url, HttpClient.configurations.v1,this.httpClientOptionsForCounty);
   console.log(response);
 
   var responeJson : any = await response.json();
   return responeJson;
   
   }
 
 

  
    
}