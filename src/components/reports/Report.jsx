import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image, 
  Font
} from '@react-pdf/renderer';
import BookmanOldStyle from '../../fonts/BOOKOS.TTF';
import BookmanOldStyleBold from '../../fonts/BOOKOSB.TTF';

Font.register({
  family: 'BookmanOldStyle',
    fonts: [
    { src: BookmanOldStyle }, 
    { src: BookmanOldStyleBold , fontWeight: 'bold' }, 
  ]
});

const logoURL = "/Letter Head logo and name.jpg";
const stamp = '/Stamp and Sign copy.jpg'; 


const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 12,
    fontFamily: 'BookmanOldStyle',
    border: '1pt solid black'
  },
  outerBorder: {
    padding: 15,
  },
  logo: {
    width: '100%',
    height: 70,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableContainer: {
    border: '1pt solid black',
    marginTop: 12.5,
    marginLeft: 1,
    marginRight: 22
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  tableColLabel: {
    width: '25%',
    padding: 8,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    borderRight: '1pt solid black',
  },
  tableColValue: {
    width: '75%',
    padding: 8,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
  },
  bulletItem:{
    flexDirection:'row', 
    alignItems:'flex-start'
  },
  bulletSymbol:{
    width:10,
    fontSize:15,
    lineHeight:1.4
  },
  bulletContent:{
    lineHeight:1.3, 
    textAlign:'justify',
    flex:1, 
    marginLeft:5
  }
});

const Report = ({ data }) => {
  const tableData = [
    { label: "Claim No", value: data.claimNumber },
    { label: "Policy No", value: data.policyNumber },
    { label: "Policy Period", value: `${data.policyStartDate} to ${data.policyEndDate}` },
    { label: "Insured Name", value: data.insuredName },
    { label: "IV Number", value: data.ivNumber },
    { label: "Date of Loss", value: data.accidentDate },
    { label: "Loss Location", value: data.lossLocation },
    { label: "Remarks", value: data.causeOfLoss },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder}>
          <Image src={logoURL} style={styles.logo} />
          <View style={styles.headerRow}>
            <Text>Ref No : {data.refNumber}</Text>
            <Text>Date : {new Date().toLocaleDateString()}</Text>
          </View>

          <View style={{ marginTop: 15, marginBottom: 1 }}>
            <Text>To,</Text>
            <Text>M/s {data.insuranceCompany}.</Text>
            <Text>Hyderabad, Telangana State.</Text>
          </View>

          <View style={styles.tableContainer}>
            {tableData.map((item, index) => (
              <React.Fragment key={index}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColLabel}>
                    <Text>{index + 1}. {item.label}</Text>
                  </View>
                  <View style={styles.tableColValue}>
                    <Text>{item.value}</Text>
                  </View>
                </View>
                {index < tableData.length - 1 && <View style={styles.rowDivider} />}
              </React.Fragment>
            ))}
          </View>
          <Text style={{fontWeight:'bold', marginTop:15, textDecoration:'underline'}}>
            {data.insuredType && data.insuredType.charAt(0).toUpperCase() + data.insuredType.slice(1)} Version :
          </Text>
          <View>
                <Text style={{ marginTop: 9 , lineHeight:1.2, textIndent:40, textAlign:'justify'}}>
                  {`${data.insuredVerified === "yes" ?      
                  `${data.insuredType?.charAt(0).toUpperCase() + data.insuredType?.slice(1)} ${data.insuredName}, Occ: ${data.insuredOccupation} is having a vehicle with Reg.no: ${data.ivNumberInInsuredStatement}, using for ${data.insuredGender=== "she" ? `her`:`his`} ${data.ivUse}. This vehicle met with an accident on ${data.accidentDateInInsuredStatement} at ${data.accidentTimeInInsuredStatement} hrs while ${data.travellingPersonRelationInInsuredStatement} was travelling from ${data.travelFromInsuredStatement} to ${data.travelToInsuredStatement}, at ${data.accidentPlaceInInsuredStatement} ${data.accidentMannerInInsuredStatement}. At the time of accident, ${data.travellingPersonRelationInInsuredStatement} is travelling ${
                    data.totalPersonsInInsuredStatement === 1
                      ? "alone"
                      : data.totalPersonsInInsuredStatement === 2
                      ? "along with another person"
                      : `along with ${data.totalPersonsInInsuredStatement - 1} other persons`
                  }. In this accident, IV damaged ${
                  data.anyInjuryInInsured?.toLowerCase() === "injured"
                    ? `and ${data.injuredNameRelationInInsured} is injured.`
                    : data.anyInjuryInInsured?.toLowerCase() === "no one injured"
                    ? "but no one injured."
                    : ""
                  } Regarding this accident, ${
                    data.policeCaseInInsured === "yes"
                      ? `Police filed F.I.R at ${data.policeStationNameInInsured}.`
                      : data.policeCaseInInsured === "no"
                      ? "No police case filed."
                      : data.policeCaseInInsured === "Panchanama"
                      ? `Police issued panchanama only at ${data.policeStationNameInInsured}. `
                      : ""
                  } At the time of accident, IV driven by ${data.ivDriverNameInInsured} and ${data.driverGender} is ${data.driverDLInInsured}. For the same, ${data.insuredGender} provided ${
                    data.insuredGender === "he"
                      ? "his"
                      : data.insuredGender === "she"
                      ? "her"
                      : "their"
                  } statement ${
                    data.statementGivenInInsured === "yes"
                      ? "in written note"
                      : data.statementGivenInInsured === "no"
                      ? "orally only"
                      : ""
                  }.`
                  :`${data.insuredType?.charAt(0).toUpperCase() + data.insuredType?.slice(1)} ${data.insuredName}, Occ: ${data.insuredOccupation} is having a vehicle with Reg.no: ${data.ivNumberInInsuredStatement}. Insured raised the claim against the vehicle damage. For the same, we tried to verify the genuineness of the claim but we are unable to do so due to ${data.insuredNotVerifiedReason}.`}`}
                </Text>
                { data.insuredType === "insured" &&
                  <View style={{marginTop:15}} >
                    <Text style={{fontWeight:'bold', textDecoration:"underline"}}>
                      Driver Version : 
                    </Text>
                    <Text style={{marginTop:10,lineHeight:1.2, textIndent:40, textAlign:'justify'}}>
                      {`${data.driverVerified==="no"? `During the course of investigation, we are unable to meet the driver due to ${data.driverNotVisitReason}`
                      :`Driver - ${data.driverNameInDriver}, Occ: ${data.driverOccupation}, is driving insured vehicle with Reg.No: ${data.carNoInDriver} from ${data.travelFromInDriver} to ${data.travelToInDriver} ${data.ivTotalPersonsInDriver === 1
                      ? "alone"
                      : data.ivTotalPersonsInDriver === 2
                      ? "along with another person"
                      : `along with ${data.ivTotalPersonsInDriver - 1} other persons and met with accident at ${data.accidentPlaceInDriver} on ${data.accidentDateInDriver} at ${data.accidentTimeInDriver} hrs due to ${data.accidentMannerInDriver}. As a result IV damaged, ${
                      data.whoIsInjuredInDriver?.toLowerCase() === "injured"
                        ? `and ${data.injuredNameRelationInDriver} is injured.`
                        : data.whoIsInjuredInDriver?.toLowerCase() === "no one injured"
                        ? "but no one injured."
                        : ""
                      } Regarding this accident, ${
                    data.policeCaseInDriver === "yes"
                      ? `Police filed F.I.R at ${data.policeStationNameInDriver}.`
                      : data.policeCaseInDriver === "no"
                      ? "No police case filed."
                      : data.policeCaseInDriver === "Panchanama"
                      ? `Police issued panchanama only at ${data.policeStationNameInDriver}.} `
                      : ""
                  } As per ${data.driverGenderInDriver==="he" ? "his" : data.driverGenderInDriver==="she"?"her":""} version, at the time of accident IV driven by ${data.carDrivenByInDriver === "himself" ? "himself" :  data.carDrivenByInDriver === "herself" ? "herself" : data.carDrivenByInDriver === "other-person" ? "other person" : " "} (${data.driverNameInDriverStatement}), ${
                    data.driverGenderInDriver} is ${data.driverDLInDriver}. For the same ${data.driverGenderInDriver} provided ${data.driverGenderInDriver==="he" ? "his" : data.driverGenderInDriver==="she"?"her":""} statement ${
                    data.statementGivenInDriver === "yes"
                      ? "in written note"
                      : data.statementGivenInDriver === "no"
                      ? "orally only"
                      : ""
                  }.`}`}`}
                    </Text>
                  </View>
                }
                <View style={{marginTop:15}}>
                    <Text style={{fontWeight:'bold',  textDecoration:"underline"}}>Spot Verification :</Text>
                    <Text style={{marginTop:10,lineHeight:1.2, textIndent:40, textAlign:'justify'}}>
                       {`During the course of investigation, ${data.spotVerified === 'no' ? `we are unable to verify the accident spot. ${data.spotNotVerifiedReason}` : `we verified the accident spot. Spot details are ${data.spotMatching} with the version of accident. ${
                        data.spotPhotosTaken === 'yes' ? `We have enclosed the spot photos with this report.` : `However, spot photos are not enclosed with this report due to ${data.spotPhotosNotTakenReason}`
                       }
                       `}`}
                    </Text>
                </View>
                <View style={{marginTop:15}}>
                    <Text style={{fontWeight:'bold',  textDecoration:"underline"}}>
                       Garage Verification :
                    </Text>
                    <Text style={{marginTop:10,lineHeight:1.2, textIndent:40, textAlign:'justify'}}>
                       {`During the course of investigation, ${data.garageVisited === 'no' ? `we are unable to inspect the vehicle due to ${data.garageNotVisitedReason}.` : `we inspected IV and we noticed IV damages are ${data.damagesMatching} with the version of accident. IV is ${data.multipleDamages === 'yes' ? `having multiple damages.`: `not having any multiple damages.`} In our verification, ${
                        data.bloodMarks === 'yes' ? `we have noticed blood marks in vehicle at ${data.bloodMarksDescription}.` : `we didn't noticed any blood marks.`
                       } ${data.garagePhotosTaken === 'yes' ? `For the same, we have enclosed the vehicle photos with this report.` : `However, vehicle photos are not enclosed with thi report due to ${data.garagePhotosNotTakenReason}.`}`}`}
                    </Text>
                </View>
                <View style={{marginTop:15}}>
                       <Text style={{fontWeight:'bold',  textDecoration:"underline", marginBottom:10}}>
                          Investigation Findings :
                       </Text>
                       <View style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>
                            {`\u2022`}
                          </Text>
                          <Text style={styles.bulletContent}>
                            {`As per claim intimation, the accident was occured on ${data.accidentDate} at ${data.accidentTime} hrs and at the time of accident IV driver is ${data.ivDriver}.`}
                         </Text>
                       </View>
                       <View style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>
                            {`\u2022`}
                          </Text>
                          <Text style={styles.bulletContent}>
                            {`Based on claim intimation details, we ${data.insuredVerified === "no" ? `didn't verified the insured about the accident due to ${data.insuredNotVerifiedReason}.` : `verified with the insured about the accident. As per ${data.insuredGender === "she" ? "her" :"his"} version, the accident was occured while ${data.travellingPersonRelationInInsuredStatement} was travelling from ${data.travelFromInsuredStatement} to ${data.travelToInsuredStatement}, met with accident at ${data.accidentPlaceInInsuredStatement} on ${data.accidentDateInInsuredStatement} at ${data.accidentTimeInInsuredStatement} hrs ${data.insuredInVehicle==="yes"?`.`:`and ${data.insuredGender} is not in IV at the time of loss.`}`} `}
                         </Text>
                       </View>
                        {data.insuredVerified==="yes" && (
                        <View style={styles.bulletItem}>
                            <Text style={styles.bulletSymbol}>
                              {`\u2022`}
                            </Text>
                            <Text style={styles.bulletContent}>
                            {`Based on ${data.insuredType} version, we tried to verify ${data.insuredGender==="she" ? "her":"his"} google timeline ${
                                data.insuredGoogleTimeline==="corelating" ? `and found ${data.insuredGender==="she" ? "her":"his"} timeline is co-relating with ${data.insuredGender==="she" ? "her":"his"} version. We ${data.insuredTimelinePhotosAttached==='yes'?`attached the timeline photos with this report.`:`have not attached the timeline photos with this report because ${data.insuredGender} refused to share them, citing privacy concerns.`} ${
                                data.insuredAccidentPhotosInMobile === 'not co-operated'
                                ? `The insured did not cooperate when asked to check ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery.`
                                : `Then, we verified ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery and ${
                                    data.insuredAccidentPhotosInMobile === 'available'
                                      ? `found accident-related photos. These photos were captured ${data.insuredPhotosDateInfo} ${data.insuredPhotosSource === 'other person sent in whatsapp' ? `and were shared by another person [ ${data.insuredPhotosSenderName}-${data.insuredPhotosSenderNumber} ] through Whatsapp.` : `, and were found in ${data.insuredPhotosSource}.`}`
                                      : 'did not find any accident-related photos in the gallery.'
                                      }`}` 
                              : data.insuredGoogleTimeline==="not co-relating" ? `and found ${data.insuredGender==="she" ? "her":"his"} timeline is not co-relating with ${data.insuredGender==="she" ? "her":"his"} version. We ${data.insuredTimelinePhotosAttached==='yes'?`attached the timeline photos with this report.`:`have not attached the timeline photos with this report because ${data.insuredGender} refused to share them, citing privacy concerns.`} ${
                                data.insuredAccidentPhotosInMobile === 'not co-operated'
                                ? `The insured did not cooperate when asked to check ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery.`
                                : `Then, we verified ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery and ${
                                    data.insuredAccidentPhotosInMobile === 'available'
                                      ? `found accident-related photos. These photos were captured ${data.insuredPhotosDateInfo} ${data.insuredPhotosSource === 'other person sent in whatsapp' ? `and were shared by another person [ ${data.insuredPhotosSenderName}-${data.insuredPhotosSenderNumber} ] through Whatsapp.` : `, and were found in ${data.insuredPhotosSource}.`}`
                                      : 'did not find any accident-related photos in the gallery.'
                                      }`}`
                              : data.insuredGoogleTimeline==="no places visited" ? `, but ${data.insuredGender==="she" ? "her":"his"} google timeline is showing as no places visited. We ${data.insuredTimelinePhotosAttached==='yes'?`attached the timeline photos with this report.`:`have not attached the timeline photos with this report because ${data.insuredGender} refused to share them, citing privacy concerns.`} ${
                                data.insuredAccidentPhotosInMobile === 'not co-operated'
                                ? `The insured did not cooperate when asked to check ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery.`
                                : `Then, we verified ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery and ${
                                    data.insuredAccidentPhotosInMobile === 'available'
                                      ? `found accident-related photos. These photos were captured ${data.insuredPhotosDateInfo} ${data.insuredPhotosSource === 'other person sent in whatsapp' ? `and were shared by another person [ ${data.insuredPhotosSenderName}-${data.insuredPhotosSenderNumber} ] through Whatsapp.` : `, and were found in ${data.insuredPhotosSource}.`}`
                                      : 'did not find any accident-related photos in the gallery.'
                                      }`}` 
                              : data.insuredGoogleTimeline==="insured not-cooperated" ? `, but ${data.insuredGoogleTimeline}. ${ 
                                data.insuredAccidentPhotosInMobile === 'not co-operated' 
                                ? `The insured did not cooperate when asked to check ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery.` 
                                : `Then, we verified ${data.insuredGender === 'she' ? 'her' : 'his'} mobile gallery and ${
                                    data.insuredAccidentPhotosInMobile === 'available'
                                      ? `found accident-related photos. These photos were captured ${data.insuredPhotosDateInfo} ${
                                          data.insuredPhotosSource === 'other person sent in whatsapp'
                                            ? `and were shared by another person (${data.insuredPhotosSenderName}-${data.insuredPhotosSenderNumber}) through WhatsApp.`
                                            : `and were found in ${data.insuredPhotosSource}.`
                                        }`
                                      : 'did not find any accident-related photos in the gallery.'
                                  }`}`
                              : data.insuredGoogleTimeline==='basic mobile'? `, but we found ${data.insuredType} is using a basic featured mobile. Hence, we are unable to verify other accident-related details including photos.` 
                              : data.insuredGoogleTimeline==='damaged mobile' ? `but we found ${data.insuredType} mobile is in damaged condition. We have attached that mobile photo for your reference. Hence, we are unable to verify other accident-related details including photos.` : `` } `}
                           </Text>
                          </View>)
                        }
                        { data.insuredVerified==="yes" &&
                          (<View style={styles.bulletItem}>
                                <Text style={styles.bulletSymbol}>
                                  {`\u2022`}
                                </Text>
                                <Text style={styles.bulletContent}>
                                    {`${data.insuredInVehicle==='no' ? `` : `In the said accident, ${data.insuredType} ${data.insuredInjured==='no' ? `was not injured.` : `was injured and those injuries are ${data.insuredInjuriesCorelating==="no" ? `not co-relating with IV accident` : `co-relating with IV accident`} ${data.insuredHospitalized ==='no' ? `, and ${data.insuredGender} stated that ${data.insuredGender} was not treated in any hospital.` : `and ${data.insuredGender} was treated at ${data.insuredHospitalName}, ${data.insuredMedicalRecords==="not available"? `but ${data.insuredGender} was not having any medical records.`: `and ${data.insuredGender} also submitted mediacl records, we enclosed the same for your reference.`}`}`}`}`}
                                </Text>
                          </View>)
                        }
                        { data.insuredVerified==="yes" &&
                          (<View style={styles.bulletItem}>
                                  <Text style={styles.bulletSymbol}>
                                    {`\u2022`}
                                  </Text>
                                  <Text style={styles.bulletContent}>
                                    {`We have verified the ${data.insuredType}'s call data ${data.insuredCallData==="not available" ? `, but it was not availble for the accident date.` : `${data.insuredCallData==="match" ?`, it matches with the version provided, and we did not find any suspects.` : `${data.insuredCallData==="mismatch" ? `and found some differences in call log. So, we identified a few suspects and enclosed for your reference.`:``}`}`} ${data.insuredDLStatus==="not provided" ? `The ${data.insuredType} did not provide ${data.insuredGender==="he"?"his":"her"} driving license for verification`: `We have enquired with ${data.insuredType} DL and found that ${data.insuredGender} ${data.insuredDLStatus}`}.`}
                                </Text>
                          </View>
                          )
                        }
                        { data.insuredVerified==="yes" && data.insuredAddAnything==='yes' && (
                                  <View style={styles.bulletItem}>
                                    <Text style={styles.bulletSymbol}>
                                      {`\u2022`}
                                    </Text>
                                    <Text style={styles.bulletContent}>
                                            {data.insuredAdditionalComments} 
                                    </Text>
                                  </View>)
                        }
                        { data.insuredType==='insured' && data.driverVerified==='no'? ``: (
                            <>
                              {data.driverVerified==="yes" && (
                                <View style={styles.bulletItem}>
                                  <Text style={styles.bulletSymbol}>
                                    {`\u2022`}
                                  </Text>
                                  <Text style={styles.bulletContent}>
                                    {`Based on driver version, we tried to verify ${data.driverGenderInDriver==="she" ? "her":"his"} google timeline ${
                                        data.driverGoogleTimeline==="corelating" ? `and found ${data.driverGenderInDriver==="she" ? "her":"his"} timeline is co-relating with ${data.driverGenderInDriver==="she" ? "her":"his"} version. We ${data.driverTimelinePhotosAttached==='yes'?`attached the timeline photos with this report.`:`have not attached the timeline photos with this report because ${data.driverGenderInDriver} refused to share them, citing privacy concerns.`} ${
                                        data.driverAccidentPhotosInMobile === 'driver not-cooperated'
                                        ? `The driver did not cooperate when asked to check ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery.`
                                        : `Then, we verified ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery and ${
                                            data.driverAccidentPhotosInMobile === 'available'
                                              ? `found accident-related photos. These photos were captured ${data.driverAccidentPhotosDateInfo} ${data.driverPhotosSource === 'other person sent in whatsapp' ? `and were shared by another person [ ${data.driverPhotosSenderName}-${data.driverPhotosSenderNumber} ] through Whatsapp.` : `, and were found in ${data.driverPhotosSource}.`}`
                                              : 'did not find any accident-related photos in the gallery.'
                                              }`}` 
                                      : data.driverGoogleTimeline==="not co-relating" ? `and found ${data.driverGenderInDriver==="she" ? "her":"his"} timeline is not co-relating with ${data.driverGenderInDriver==="she" ? "her":"his"} version. We ${data.driverTimelinePhotosAttached==='yes'?`attached the timeline photos with this report.`:`have not attached the timeline photos with this report because ${data.driverGenderInDriver} refused to share them, citing privacy concerns.`} ${
                                        data.driverAccidentPhotosInMobile === 'driver not-cooperated'
                                        ? `The driver did not cooperate when asked to check ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery.`
                                        : `Then, we verified ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery and ${
                                            data.driverAccidentPhotosInMobile === 'available'
                                              ? `found accident-related photos. These photos were captured ${data.driverAccidentPhotosDateInfo} ${data.driverPhotosSource === 'other person sent in whatsapp' ? `and were shared by another person [ ${data.driverPhotosSenderName}-${data.driverPhotosSenderNumber} ] through Whatsapp.` : `, and were found in ${data.driverPhotosSource}.`}`
                                              : 'did not find any accident-related photos in the gallery.'
                                              }`}`
                                      : data.driverGoogleTimeline==="no places visited" ? `, but ${data.driverGenderInDriver==="she" ? "her":"his"} google timeline is showing as no places visited. We ${data.driverTimelinePhotosAttached==='yes'?`attached the timeline photos with this report.`:`have not attached the timeline photos with this report because ${data.driverGenderInDriver} refused to share them, citing privacy concerns.`} ${
                                        data.driverAccidentPhotosInMobile === 'driver not-cooperated'
                                        ? `The driver did not cooperate when asked to check ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery.`
                                        : `Then, we verified ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery and ${
                                            data.driverAccidentPhotosInMobile === 'available'
                                              ? `found accident-related photos. These photos were captured ${data.driverAccidentPhotosDateInfo} ${data.driverPhotosSource === 'other person sent in whatsapp' ? `and were shared by another person [ ${data.driverPhotosSenderName}-${data.driverPhotosSenderNumber} ] through Whatsapp.` : `, and were found in ${data.driverPhotosSource}.`}`
                                              : 'did not find any accident-related photos in the gallery.'
                                              }`}` 
                                      : data.driverGoogleTimeline==="driver not-cooperated" ? `, but ${data.driverGoogleTimeline}. ${ 
                                        data.driverAccidentPhotosInMobile === 'driver not-cooperated' 
                                        ? `The driver did not cooperate when asked to check ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery.` 
                                        : `Then, we verified ${data.driverGenderInDriver === 'she' ? 'her' : 'his'} mobile gallery and ${
                                            data.driverAccidentPhotosInMobile === 'available'
                                              ? `found accident-related photos. These photos were captured ${data.driverAccidentPhotosDateInfo} ${data.driverPhotosSource === 'other person sent in whatsapp' ? `and were shared by another person (${data.driverPhotosSenderName}–${data.driverPhotosSenderNumber}) through WhatsApp.` : `and were found in ${data.driverPhotosSource}.`}`
                                              : 'did not find any accident-related photos in the gallery.'
                                          }`}`
                                      : data.driverGoogleTimeline==='basic mobile'? `, but we found driver is using a basic featured mobile. Hence, we are unable to verify other accident-related details including photos.` 
                                      : data.driverGoogleTimeline==='damaged mobile' ? `but we found driver mobile is in damaged condition. We have attached that mobile photo for your reference. Hence, we are unable to verify other accident-related details including photos.` : `` } `}
                                  </Text>
                                </View>)
                                } 
                                { data.driverVerified==="yes" &&
                                (<View style={styles.bulletItem}>
                                  <Text style={styles.bulletSymbol}>
                                    {`\u2022`}
                                  </Text>
                                  <Text style={styles.bulletContent}>
                                    {`${data.driverInVehicle==='no' ? `` : `In the said accident, driver ${data.driverInjured==='no' ? `was not injured.` : `was injured and those injuries are ${data.driverInjuriesCorelating==="no" ? `not co-relating with IV accident` : `co-relating with IV accident`} ${data.driverHospitalized ==='no' ? `, and ${data.driverGenderInDriver} stated that ${data.driverGenderInDriver} was not treated in any hospital.` : `and ${data.driverGenderInDriver} was treated at ${data.driverHospitalName}, ${data.driverMedicalRecords==="not available"? `but ${data.driverGenderInDriver} was not having any medical records.`: `and ${data.driverGenderInDriver} also submitted mediacl records, we enclosed the same for your reference.`}`}`}`}`}
                                  </Text>
                                </View>)
                                }
                                { data.driverVerified==="yes" &&
                                (<View style={styles.bulletItem}>
                                  <Text style={styles.bulletSymbol}>
                                    {`\u2022`}
                                  </Text>
                                  <Text style={styles.bulletContent}>
                                        {`We have verified the driver call data ${data.driverCallData==="not available" ? `, but it was not availble for the accident date.` : `${data.driverCallData==="match" ?`, it matches with the version provided, and we did not find any suspects.` : `${data.driverCallData==="mismatch" ? `and found some differences in call log. So, we identified a few suspects and enclosed for your reference.`:``}`}`} ${data.driverDLStatus==="not provided" ? `The driver did not provide ${data.driverGenderInDriver==="he"?"his":"her"} driving license for verification`: `We have enquired with driver DL and found that ${data.driverGenderInDriver} ${data.driverDLStatus}`}.`}
                                  </Text>
                                </View>)
                                }
                                { data.driverVerified==="yes" && data.driverAddAnything==='yes' && (
                                  <View style={styles.bulletItem}>
                                    <Text style={styles.bulletSymbol}>
                                      {`\u2022`}
                                    </Text>
                                    <Text style={styles.bulletContent}>
                                            {data.driverAdditionalComments} 
                                    </Text>
                                  </View>)
                                  }
                            </>
                         )
                        }
                        {data.anyOccupantInIV === "no" && (
                         <View style={styles.bulletItem}>
                            <Text style={styles.bulletSymbol}>
                              {`\u2022`}
                            </Text>
                            <Text style={styles.bulletContent}>
                              {`During our verification, it was stated that no other person occupied the IV apart from the individuals mentioned above.`}
                            </Text>
                          </View>
                        )}

                        {data.anyOccupantInIV === "yes" && data.anyOccupantVerified === "no" && (
                          <View style={styles.bulletItem}>
                            <Text style={styles.bulletSymbol}>
                              {`\u2022`}
                            </Text>
                            <Text style={styles.bulletContent}>
                              {`During our verification, it was stated that total ${data.totalPersonsInInsuredStatement} persons were travelling including above mentioned individuals. But we did not verify any occupants due to ${data.occupantNotVerifiedReason}.`}
                            </Text>
                          </View>
                        )}
                        {data.anyOccupantInIV === "yes" && data.anyOccupantVerified === "yes" && (
                          <View style={styles.bulletItem}>
                            <Text style={styles.bulletSymbol}>
                              {`\u2022`}
                            </Text>
                            <Text style={styles.bulletContent}>
                                {`${data.occupantFindings}`}
                            </Text>
                          </View>
                        )}
                        {data.anyOccupantInIV === "yes" && data.occupantsAddAnything==="yes" && 
                         (<View style={styles.bulletItem}>
                            <Text style={styles.bulletSymbol}>
                              {`\u2022`}
                            </Text>
                            <Text style={styles.bulletContent }>
                              {`${data.occupantsAdditionalComments}`}
                            </Text>
                         </View>)
                        }
                        {
                        <View style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>
                              {`\u2022`}
                          </Text>                       
                          <Text style={styles.bulletContent}>
                            {`During the course of investigation, we observed ${data.overSeating==="no" ? `that there was no over-seating in the IV at the time of the accident.` : `that the IV exceeded its permitted seating capacity, and the evidence is supported by ${data.overSeatingEvidence}.`}`}
                          </Text>
                        </View>
                        }
                        {data.policeCaseFiledOthers==="no" && (
                          <View style={styles.bulletItem}>
                            <Text style={styles.bulletSymbol}>
                                {`\u2022`}
                            </Text>
                            <Text style={styles.bulletContent}>
                              {`Regarding this accident there is no police case filed in any police station.`}
                            </Text>
                          </View>)
                        }
                        {(data.policeCaseFiledOthers==="yes" || data.policeCaseFiledOthers==="panchanama-only") && (
                          <View style={styles.bulletItem}>
                            <Text style={styles.bulletSymbol}>
                              {`\u2022`}
                            </Text>
                            <Text style={styles.bulletContent}>
                              {`Regarding this accident, police filed ${data.policeCaseFiledOthers==="yes"? `F.I.R` : `panchanama only`} at ${data.policeStationNameOthers} and as per police records, IV driven by ${data.asPerPsDriverName} and accident date is ${data.asPerPsAccidentDate}. We have enclosed those records with this report.`}
                            </Text>
                          </View>)
                        }
                        {<View style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>
                            {`\u2022`}
                          </Text>
                          <Text style={styles.bulletContent}>
                            {`We verified the IV documents such as RC, RC Extract and Policy copy, and found ${data.insuredNameMatchInRC ==='matching' ? `no deviation in the insured name.` : `deviation in the insured name. The evidence is ${data.insuredNameMismatchReason}.`}`}
                          </Text> 
                        </View>                          
                        }
                        {<View style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>
                            {`\u2022`}
                          </Text>
                          <Text style={styles.bulletContent}>
                            {`We verified TS E-Challan with reference to insured vehicle and noticed ${data.tsEChallan} and relevant evidence has been enclosed for your review`}
                          </Text> 
                        </View>                         
                        }
                        {<View style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>
                            {`\u2022`}
                          </Text>
                          <Text style={styles.bulletContent}>
                            {`As per their version, in the said accident ${data.thirdPartyVehicleInvolved==="no" ? `there is no TP vehicle involved.` : `TP vehicle involved and details are ${data.thirdPartyDetails}.`}`}
                          </Text>   
                        </View>                       
                        }                    
                                              
                </View>
                {data.anyOtherInfo==="yes" && (
                  <View style={{marginTop:15}}>
                      <Text style={{fontWeight:'bold',  textDecoration:"underline", marginBottom:15}}>
                        Additional Findings :
                      </Text>
                      <Text style={{lineHeight:1.3, textAlign:'justify'}}>
                          {`${data.otherInfoDescription}`}
                      </Text>
                  </View> )
                }               
                <View style={{marginTop:15}}>
                    <Text style={{fontWeight:'bold',  textDecoration:"underline", marginBottom:15, fontSize:14}}>
                       Conclusion :
                    </Text>
                    <Text style={{lineHeight:1.3, textAlign:'justify', textIndent:40}}>
                        {`Based on documents and evidences, ${data.conclusionOpinion ==="payable" ? `there is no suspicious information has noted. IV documents are in order and IV driving person has valid DL.` : `we found ${data.suspectsEvidenceReason}` }. Supporting evidence is enclosed. Hence, insurer can take appropriate decision as per terms and conditions of policy.` }
                    </Text>
                </View>
                <Text style={{fontWeight:'bold',  textDecoration:"underline", marginTop:45, textAlign:'center'}}>
                    {`Issued without Prejudice  
                    Strictly for internal purpose only`}
                </Text>
                <View style={{textAlign:'center', marginTop: 30, alignItems:'flex-end', marginRight:20}}>
                    <Text><Image src={stamp} style={{width:60, height:60}} /></Text>
                    <Text style={{textAlign:'right', marginTop:10}}>
                      Mahesh Kola{'\n'}Authorized Signatory
                    </Text>
                </View>
                {/* <View style={{flexDirection:"column", textAlign:'center', fontSize:15, marginTop:20}}> 
                  <Text style={{textDecoration:'underline', marginBottom:20}}> Insured Visit Photos :</Text>
                  <Text>
                    <Image src="http://localhost:5001/uploads/d4d0594e-c39a-4ddc-a7cb-42c597aa547a.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt="" />
                    <Image src="http://localhost:5001/uploads/7129a975-9135-4ab8-b365-a878eaf79e76.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt=""/>
                  </Text>
                </View>
                <View style={{flexDirection:"column", textAlign:'center', fontSize:15, marginTop:20}}> 
                  <Text style={{textDecoration:'underline', marginBottom:20}}>Driver Visit Photos :</Text>
                  <Text>
                    <Image src="http://localhost:5001/uploads/d4d0594e-c39a-4ddc-a7cb-42c597aa547a.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt="" />
                    <Image src="http://localhost:5001/uploads/7129a975-9135-4ab8-b365-a878eaf79e76.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt=""/>
                  </Text>
                </View>
                <View style={{flexDirection:"column", textAlign:'center', fontSize:15, marginTop:20}}> 
                  <Text style={{textDecoration:'underline', marginBottom:20}}>Spot Photos :</Text>
                  <Text>
                    <Image src="http://localhost:5001/uploads/d4d0594e-c39a-4ddc-a7cb-42c597aa547a.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt="" />
                    <Image src="http://localhost:5001/uploads/7129a975-9135-4ab8-b365-a878eaf79e76.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt=""/>
                    <Image src="http://localhost:5001/uploads/d4d0594e-c39a-4ddc-a7cb-42c597aa547a.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt="" />
                    <Image src="http://localhost:5001/uploads/7129a975-9135-4ab8-b365-a878eaf79e76.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt=""/>
                 </Text>
                </View>
                <View style={{flexDirection:"column", textAlign:'center', fontSize:15, marginTop:20}}> 
                  <Text style={{textDecoration:'underline', marginBottom:20}}>Garage Photos :</Text>
                  <Text>
                    <Image src="http://localhost:5001/uploads/d4d0594e-c39a-4ddc-a7cb-42c597aa547a.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt="" />
                    <Image src="http://localhost:5001/uploads/7129a975-9135-4ab8-b365-a878eaf79e76.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt=""/>
                    <Image src="http://localhost:5001/uploads/d4d0594e-c39a-4ddc-a7cb-42c597aa547a.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt="" />
                    <Image src="http://localhost:5001/uploads/d4d0594e-c39a-4ddc-a7cb-42c597aa547a.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt="" />
                    <Image src="http://localhost:5001/uploads/7129a975-9135-4ab8-b365-a878eaf79e76.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt=""/>
                    <Image src="http://localhost:5001/uploads/7129a975-9135-4ab8-b365-a878eaf79e76.jpg" style={{width:200,height:100,objectFit: 'cover'}} alt=""/>
                 </Text>
                </View> */}
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Report;
