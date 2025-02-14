import React, { Component, Fragment } from 'react'
//import CountryDailyTrends from './CountryDailyTrends'
//import DeathVsRecovered from './DeathVsRecovered'
import Header from './Header'
import Footer from './Footer'
import WorldDataList from './WorldDataList'
import '../css/world.css'
import WorldCase from './WorldCase'
import { connect } from 'react-redux'
import Typical from 'react-typical'

class WorldData extends Component {
    constructor(props) {
        super(props)
        //console.log(this.props);
        this.state = {
            isDark: props.isDark,
            countrySearchVal: '',
            patientsData: props.worldPatientsData,
            showData: [],
            showDataMain: [],
            indiaStat: {},
            disableTypingAnimation: false
        }
    }

    componentDidMount() {

        if (this.state.patientsData !== undefined) {
            let allCountry = Object.keys(this.props.worldPatientsData).map(x => x)

            // console.log(this.props.worldPatientsData);
            let patData = []
            let cnt = 0
            //eslint-disable-next-line
            for (let i in this.props.worldPatientsData) {
                let obj = {}
                let country = allCountry[cnt++]
                let confirmed = (country === 'India' ? parseInt(this.props.indiaStat) :
                    this.props.worldPatientsData[country][this.props.worldPatientsData[country].length - 1].confirmed)

                obj = {
                    country: country,
                    confirmed: confirmed
                }
                patData.push(obj)
            }
            patData.sort((x, y) => y.confirmed - x.confirmed)
            patData.map((y, index) => y.index = index + 1)
            this.setState({ showData: patData, showDataMain: patData })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.worldPatientsData !== this.props.worldPatientsData) {
            let allCountry = Object.keys(this.props.worldPatientsData).map(x => x)
            let patData = []
            let cnt = 0
            //eslint-disable-next-line
            for (let i in this.props.worldPatientsData) {
                let obj = {}
                let country = allCountry[cnt++]
                let confirmed = (country === 'India' ? parseInt(this.props.indiaStat) :
                    this.props.worldPatientsData[country][this.props.worldPatientsData[country].length - 1].confirmed)


                obj = {
                    country: country,
                    confirmed: confirmed
                }
                patData.push(obj)
            }
            patData.sort((x, y) => y.confirmed - x.confirmed)
            patData.map((y, index) => y.index = index + 1)
            this.setState({ showData: patData, showDataMain: patData })
        }

        if (this.state.countrySearchVal !== prevState.countrySearchVal) {
            if (this.state.countrySearchVal.length === 0) {
                this.setState({ showData: this.state.showDataMain })
            } else {
                let data = this.state.showDataMain.filter(x => x.country.toLowerCase().includes(prevState.countrySearchVal.toLowerCase()))
                this.setState({ showData: data })
            }

        }
    }

    render() {
        // console.log(this.props.worldPatientsData);
        // var PatientsData = this.props.worldPatientsData;
        // var country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
        // var worldCountryList = [];
        // country_list.map(function (cd) {
        //     var countryData = [];

        //     if (PatientsData != undefined && PatientsData[cd] != undefined) {
        //         countryData.name = cd;
        //         let patientDataInSpecificCountry = PatientsData[cd];
        //         let pdscconfirmedCase = 0;
        //         patientDataInSpecificCountry.map(function (pdsc) {
        //             pdscconfirmedCase = pdsc.confirmed;
        //         })
        //         countryData.confirmedCase = pdscconfirmedCase;
        //         worldCountryList.push(countryData);
        //     }
        // });

        // worldCountryList.sort(function (a, b) {
        //     return parseInt(b.confirmedCase) - parseInt(a.confirmedCase);
        // })

        // let worldCountryListing = worldCountryList.filter(x => x.includes(this.state.countrySearchVal)).map((wcl, index) => {
        //     var link = wcl.name;
        //     link = link.replace(' ', '-');
        //     return (
        //         <tr style={{ background: `${index % 2 !== 0 ? this.state.isDark ? '#1c1c1c' : '#eee' : ''}` }}>
        //             <td>></td>
        //             <td><Link to={`/world-data/${link}`}>{wcl.name}</Link></td>
        //             <td>{wcl.confirmedCase}</td>
        //         </tr>
        //     )
        // })

        return (
            <Fragment>
                <Header />
                <div className="world-parent">
                    <WorldCase isDark={this.props.isDark} />
                    <div className="country-data"
                        style={{
                            display: "flex",
                            flexDirection: `column`,
                            // marginBottom: '10px',
                            background: `${this.props.isDark ? '#262626' : '#fff'}`,
                            color: `${this.props.isDark ? '#fff' : '#222'}`
                        }}
                    >
                        <div className='search-country' style={{
                            width: '100%',
                            margin: '20px 0px 0px 0px'
                        }}>
                            <div style={{ width: 'fit-content', margin: '0 auto', position: "relative" }}>
                                <input type="text"
                                    value={this.state.countrySearchVal}
                                    name="countryname"
                                    id="countryname"
                                    style={{
                                        width: '250px',
                                        height: '35px',
                                        padding: '8px 8px',
                                        border: 'none',
                                        boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.8' : '0.4'})`,
                                        borderRadius: '4px',
                                        fontSize: '17px'
                                    }}
                                    onChange={(event) => this.setState({ countrySearchVal: event.target.value })}
                                    onFocus={() => this.setState({ disableTypingAnimation: true })}
                                    onBlur={() => this.setState({ disableTypingAnimation: false })}
                                />
                                {
                                    this.state.disableTypingAnimation ? <></> : <Typical
                                        steps={["India", 1000, "Australia", 1000, "Brazil", 1000, "United Kingdom", 1000]}
                                        loop={Infinity}
                                        wrapper="span" />
                                }
                            </div>

                        </div>
                        <WorldDataList showData={this.state.showData} isDark={this.props.isDark} />
                    </div>
                </div>

                <Footer isDark={this.state.isDark} />
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        isDark: state.theme.isDark
    }
}

export default connect(mapStateToProps, null)(WorldData)
