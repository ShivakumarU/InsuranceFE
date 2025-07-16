import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const numberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero Rupees Only';

  const makeGroup = (n) => {
    let str = '';
    if (n > 99) {
      str += a[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 0) {
      if (n < 20) str += a[n];
      else str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
    }
    return str.trim();
  };

  let result = '';
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const hundred = num % 1000;

  if (crore > 0) result += makeGroup(crore) + ' Crore ';
  if (lakh > 0) result += makeGroup(lakh) + ' Lakh ';
  if (thousand > 0) result += makeGroup(thousand) + ' Thousand ';
  if (hundred > 0) result += makeGroup(hundred) + ' ';

  return result.trim() + ' Rupees Only';
};

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  outerBorder: {
    border: '1pt solid black',
    padding: 15,
    height: '100%',
    width: '100%',
  },
  logo: {
    width: '98%',
    height: 70,
    marginBottom: 10,
  },
  innerBox: {
    border: '1pt solid black',
    padding: 10,
    width: '100%',
    height:'82%' ,
    marginTop: 15,
  },
  heading: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  rightTextBlock: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  leftTextBlock: {
    marginTop: 5,
  },
  tableBox: {
    border: '1pt solid black',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid black',
    alignItems: 'stretch',
    minHeight: 22,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  cellLeft: {
    width: '53%',
    padding: 5,
    justifyContent: 'center',
  },
  cellRight: {
    width: '47%',
    padding: 5,
    justifyContent: 'center',
    textAlign: 'right',
  },
  verticalDivider: {
    width: 0.5,
    backgroundColor: 'black',
  },
  amountInWords: {
    fontWeight: 'bold',
    padding: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bankTable: {
    width: '50%',
    border: '1pt solid black',
  },
  bankHeader: {
    fontWeight: 'bold',
    borderBottom: '1pt solid black',
    padding: 4,
    textAlign: 'center',
  },
  bankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1pt solid black',
  },
  signatureContainer: {
  position: 'absolute',
  right: 33,
  bottom: 68,
  alignItems: 'flex-end',
  },
  stamp: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  signature: {
    textAlign: 'right',
    fontSize: 11,
  },
  addressText:{
    fontSize:8.1,
    width:'100%', 
    textAlign:'left',
    padding:2,
    borderBottom: '1pt solid black',
    borderLeft: '1pt solid black',
    borderRight: '1pt solid black',
    paddingHorizontal:10,
    paddingVertical:3,
    fontWeight:'bold',
    fontFamily: 'Times-Roman'
  }
});

const logoURL = '/Letter Head logo and name.jpg';
const stamp = '/Stamp and Sign copy.jpg';
const today = new Date();
const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

const Invoice = ({ data }) => {
  const { insuranceCompany, refNumber, claimNumber, insuredName, invoiceAmount = 0 } = data;

  const bankRows = [
    { label: 'Bank Name :', value: 'HDFC Bank' },
    { label: 'A/C No :', value: '50100135745899' },
    { label: 'IFSC :', value: 'HDFC0000472' },
    { label: 'PAN :', value: 'CFTPM6851H' },
  ];

  const descriptions = [
    { label: 'Professional fee', amount: Number(invoiceAmount || 0).toFixed(2) },
    { label: 'Convenience', amount: '0.00' },
    { label: 'Petition enquiry', amount: '0.00' },
    { label: 'Owner enquiry', amount: '0.00' },
    { label: 'Driver enquiry', amount: '0.00' },
    { label: 'Spot verification', amount: '0.00' },
    { label: 'Salary verification', amount: '0.00' },
    { label: 'TAT incentive', amount: '0.00' },
    { label: 'GST Applicable : No', amount: '0.00' },
  ];

const totalWords = numberToWords(Number(invoiceAmount || 0));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder}>
          <Image src={logoURL} style={styles.logo} />
          <View style={styles.signatureContainer}>
            <Image src={stamp} style={styles.stamp} />
            <Text style={styles.signature}>
              For MAHESH KOLA{'\n'}Authorized signatory's Name{'\n'}Signature & Stamp
            </Text>
          </View>
          <View style={styles.innerBox}>
            <Text style={styles.heading}>TAX INVOICE</Text>

            <View style={styles.rightTextBlock}>
              <Text>Date: {formattedDate}</Text>
              <Text>Invoice Number: {refNumber}</Text>
              <Text>Claim Number: {claimNumber}</Text>
              <Text>Insured Name: {insuredName}</Text>
            </View>

            <View style={styles.leftTextBlock}>
              <Text>To:</Text>
              <Text>{insuranceCompany}</Text>
              <Text>Hyderabad</Text>
            </View>

            <View style={styles.tableBox}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={styles.cellLeft}><Text>Description</Text></View>
                <View style={styles.verticalDivider} />
                <View style={styles.cellRight}><Text>Amount (Rs)</Text></View>
              </View>

              {descriptions.map((item, i) => (
                <View style={styles.tableRow} key={i}>
                  <View style={styles.cellLeft}><Text>{item.label}</Text></View>
                  <View style={styles.verticalDivider} />
                  <View style={styles.cellRight}><Text>{item.amount}</Text></View>
                </View>
              ))}

              <View style={[styles.tableRow, { fontWeight: 'bold' }]}>
                <View style={styles.cellLeft}><Text>Total Amount</Text></View>
                <View style={styles.verticalDivider} />
                <View style={styles.cellRight}><Text>{Number(invoiceAmount || 0).toFixed(2)}</Text></View>
              </View>

              <Text style={styles.amountInWords}>{totalWords}</Text>
            </View>

            <View style={styles.footerRow}>
              <View style={styles.bankTable}>
                <Text style={styles.bankHeader}>Bank Details</Text>
                {bankRows.map((row, index) => (
                  <View
                    key={index}
                    style={[
                      styles.bankRow,
                      index === bankRows.length - 1 && { borderBottom: 0 }
                    ]}
                  >
                    <View style={styles.cellLeft}><Text>{row.label}</Text></View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.cellRight}><Text>{row.value}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.addressText}>Address for communication: Mahesh Kola, 3-5-214/A, Shanthi Nivas, Krishnanagar, Moulaali, Telangana- 500040,{'\n'}
Cell: 9553999072, Mail: Maheshkola.2020@gmail.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
