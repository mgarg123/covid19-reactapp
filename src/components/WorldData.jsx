import React, { Component, Fragment } from 'react'
//import CountryDailyTrends from './CountryDailyTrends'
//import DeathVsRecovered from './DeathVsRecovered'
import Header from './Header'
import Footer from './Footer'
//import axios from 'axios'

class WorldData extends Component {
    constructor(props) {
        super(props)
        //console.log(this.props);
        this.state = {
            isDark: true,
        }
    }

    
    isDarkModeActive = (isDark) => {
        this.setState({ isDark: isDark })
    }

    render() {
        //console.log(this.props.worldPatientsData);
        var PatientsData = this.props.worldPatientsData;
        var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        var worldCountryList = [];        
        country_list.map( function(cd){
            var countryData = [];

            if( PatientsData != undefined  && PatientsData[cd] != undefined ){
                countryData.name = cd;
                let patientDataInSpecificCountry = PatientsData[cd];
                let pdscconfirmedCase = 0;
                patientDataInSpecificCountry.map( function(pdsc){
                    pdscconfirmedCase = pdsc.confirmed;
                })
                countryData.confirmedCase = pdscconfirmedCase;
                worldCountryList.push(countryData);
            }
        });
        
        worldCountryList.sort(function(a,b){
            return parseInt(b.confirmedCase)  - parseInt(a.confirmedCase);
        })

        let worldCountryListing = worldCountryList.map( function(wcl){
            var link =  wcl.name.toLowerCase();
            link = link.replace(' ', '-');
            return(                
                <tr>
                    <td>></td>
                    <td><a href={'/world-data/'+link}>{wcl.name}</a></td>
                    <td>{wcl.confirmedCase}</td>
                </tr>
            )
        })
        
        return (
            <Fragment>
                <Header isDarkCallBack={this.isDarkModeActive} />
                <div className="country-data"
                    style={{
                        display: "flex",
                        flexDirection: `${window.screen.width <= 767 ? 'column' : 'row'}`,
                        marginBottom: '10px',
                        background: `${this.state.isDark ? '#262626' : '#fff'}`
                    }}
                >
                    <div className="state-table-container">                   
                        <table className="state-table">
                            <thead>
                                <tr >
                                    <th></th>
                                    <th>Country Name</th>
                                    <th>Confirmed Cases</th>
                                </tr>
                            </thead>
                            <tbody>
                                {worldCountryListing}
                            </tbody>
                        </table>
                    </div>    
                    
                </div>
                <Footer isDark={this.state.isDark} />
            </Fragment>
        )
    }
}

export default WorldData
