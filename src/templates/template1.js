import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import parse from 'html-react-parser';

// Sample HTML content
const htmlContent =
  '<h1>Hello PDF</h1><p>This is a <b>bold</b> text with a <i>italic</i> word.</p>';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 12,
    color: '#555',
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  heading1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  heading2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 5,
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
    borderTopColor: '#D32F2F',
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

// **Function to Convert HTML to React-PDF Components**
// Function to convert parsed HTML to React-PDF components
const renderHtmlToPdf = (html) => {
  return parse(html, {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'h1':
            return (
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{domNode.children[0].data}</Text>
            );
          case 'p':
            return <Text style={{ marginBottom: 10 }}>{domNode.children[0].data}</Text>;
          case 'b':
            return <Text style={{ fontWeight: 'bold' }}>{domNode.children[0].data}</Text>;
          case 'i':
            return <Text style={{ fontStyle: 'italic' }}>{domNode.children[0].data}</Text>;
          default:
            return <Text>{domNode.children[0]?.data || ''}</Text>;
        }
      }
    },
  });
};

// **PDF Document Component**
const MyPDF = ({ pages }) => (
  <Document>
    {/* <Page size='A4' style={styles.page}>
      <View>{renderHtmlToPdf(htmlContent)}</View>
    </Page> */}
    {pages.map((page, pageIndex) => (
      <Page size='A4' style={styles.page} key={pageIndex}>
        {page.sections.map((section, sectionIndex) => (
          <View key={sectionIndex}>{renderHtmlToPdf(section.text)}</View>
        ))}

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
