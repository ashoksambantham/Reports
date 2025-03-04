import React, { useState, useRef } from 'react';
import { convert } from 'html-to-text';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    backgroundColor: '#ffffff', // Light gray background for the page
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Dark text color
  },
  sectionContainer: {
    flexDirection: 'row', // Side by side layout
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  section: {
    width: '48%', // 2 columns with spacing
    padding: 15,
    marginBottom: 20,
    borderRadius: 5, // Rounded corners
  },
  text: {
    fontSize: 12,
    color: '#555', // Medium gray for readability
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 5, // Rounded edges for the image
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#D32F2F', // Red color like the screenshot
    paddingTop: 5,
  },
  pageNumber: {
    color: 'white',
    backgroundColor: '#D32F2F',
    padding: 4,
    fontSize: 10,
    borderRadius: 2,
  },
  reportText: {
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  yearText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

// PDF Document Component
const MyPDF = ({ pages }) => (
  <Document>
    {pages.map((page, pageIndex) => (
      <Page size='A4' style={styles.page} key={pageIndex}>
        <View style={styles.sectionContainer}>
          {page.sections.map((section) => (
            <>
              <View key={section.id} style={styles.section}>
                {section.text && (
                  <Text style={styles.text}>{convert(section.text, { wordwrap: false })}</Text>
                )}
                {section.content && section.content.includes('<img') && (
                  <Image
                    src={section.content.match(/src="([^"]+)"/)[1]} // Extract image URL
                    style={styles.image}
                  />
                )}
              </View>
              {/* Footer Section */}
            </>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.pageNumber}>{pageIndex + 1}</Text>
          <Text>
            <Text style={styles.reportText}>ESG REPORT</Text> -
            <Text style={styles.yearText}> 2023-24</Text>
          </Text>
        </View>
      </Page>
    ))}
  </Document>
);

export default MyPDF;
