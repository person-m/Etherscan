import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TextWT, ViewWT } from '../components'
import Color from '../utils/Color'

export const TransactionInfoScreen = ( {route} ) => {

  const transaction = route.params.item;

  const renderItem = (item) => {
    return (
      <View>
        <TextWT style={styles.textItem}>{item}</TextWT>
        <View  style={{
          height: 1,
          width: "100%",
          backgroundColor: Color.BLACK,
        }}/>
      </View>
    );
  }

  return (
    <ViewWT style={styles.container}>
      <ScrollView>
        {renderItem(`blockHash: ${transaction.blockHash}`)}
        {renderItem(`blockNumber: ${transaction.blockNumber}`)}
        {renderItem(`confirmations: ${transaction.confirmations}`)}
        {renderItem(`contractAddress: ${transaction.contractAddress}`)}
        {renderItem(`cumulativeGasUsed: ${transaction.cumulativeGasUsed}`)}
        {renderItem(`from: ${transaction.from}`)}
        {renderItem(`functionName: ${transaction.functionName}`)}
        {renderItem(`gas: ${transaction.gas}`)}
        {renderItem(`gasPrice: ${transaction.gasPrice}`)}
        {renderItem(`gasUsed: ${transaction.gasUsed}`)}
        {renderItem(`hash: ${transaction.hash}`)}
        {renderItem(`input: ${transaction.input}`)}
        {renderItem(`isError: ${transaction.isError}`)}
        {renderItem(`nonce: ${transaction.nonce}`)}
        {renderItem(`timeStamp: ${transaction.timeStamp}`)}
        {renderItem(`to: ${transaction.to}`)}
        {renderItem(`transactionIndex: ${transaction.transactionIndex}`)}
        {renderItem(`txreceipt_status: ${transaction.txreceipt_status}`)}
        {renderItem(`value: ${transaction.value}`)}
      </ScrollView>
    </ViewWT>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textItem: {
    margin: 10
  }
})