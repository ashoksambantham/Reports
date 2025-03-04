import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { JSDOM } from 'jsdom';

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
const renderHTMLContent = (html) => {
  const dom = new JSDOM(html);
  const nodes = dom.window.document.body.childNodes;

  const elements = [];

  nodes.forEach((node, index) => {
    if (node.nodeName === 'P') {
      elements.push(
        <Text key={index} style={styles.text}>
          {node.textContent}
        </Text>
      );
    } else if (node.nodeName === 'STRONG' || node.nodeName === 'B') {
      elements.push(
        <Text key={index} style={styles.boldText}>
          {node.textContent}
        </Text>
      );
    } else if (node.nodeName === 'H1') {
      elements.push(
        <Text key={index} style={styles.heading1}>
          {node.textContent}
        </Text>
      );
    } else if (node.nodeName === 'H2') {
      elements.push(
        <Text key={index} style={styles.heading2}>
          {node.textContent}
        </Text>
      );
    } else if (node.nodeName === 'IMG') {
      const src = node.getAttribute('src');
      if (src) {
        elements.push(<Image key={index} src={src} style={styles.image} />);
      }
    } else {
      elements.push(
        <Text key={index} style={styles.text}>
          {node.textContent}
        </Text>
      );
    }
  });

  return elements;
};

// **PDF Document Component**
const MyPDF = ({ pages }) => (
  <Document>
    {pages.map((page, pageIndex) => (
      <Page size='A4' style={styles.page} key={pageIndex}>
        <View>
          {page.sections.map((section, sectionIndex) => (
            <View key={sectionIndex}>{renderHTMLContent(section.text)}</View>
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
