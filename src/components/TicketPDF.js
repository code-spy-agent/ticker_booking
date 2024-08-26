import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register a default font
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
  },
  qrCodeSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  qrCode: {
    width: 150,
    height: 150,
  },
  bookingCode: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  terms: {
    fontSize: 10,
    marginBottom: 5,
  },
});

const TicketPDF = ({ movie, showTime, address, bookingCode, qrCodeUrl }) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.movieTitle}>{movie.Title}</Text>
        <Text style={styles.info}>Time: {showTime}</Text>
        <Text style={styles.info}>Address: {address}</Text>
      </View>
      <View style={styles.qrCodeSection}>
        <Image style={styles.qrCode} src={qrCodeUrl} />
        <Text style={styles.bookingCode}>Booking Code: {bookingCode}</Text>
      </View>
      <Text style={styles.termsTitle}>Terms and Conditions:</Text>
      <Text style={styles.terms}>1. This ticket is non-refundable and non-transferable.</Text>
      <Text style={styles.terms}>2. Please arrive at least 15 minutes before the show time.</Text>
      <Text style={styles.terms}>3. Outside food and beverages are not allowed in the theater.</Text>
      <Text style={styles.terms}>4. Please keep this ticket with you at all times during your visit.</Text>
    </Page>
  </Document>
);

export default TicketPDF;