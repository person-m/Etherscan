import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Keyboard } from 'react-native'
import i18n from '../utils/i18n';
import { ViewWT, TextWT } from '../components'
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { GET_THEME } from '../graphql/reactivities/ThemeVariable';
import { ETHERSCAN_APIKEY } from '@env'
import Color from '../utils/Color';

export const LookupScreen = ({route}) => {
  const { loading, error, data } = useQuery(GET_THEME);
  const [address, setAddress] = useState<string>('');
  const [searchNb, setSearchNb] = useState<number>(1);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const { navigate } = useNavigation();

  const onPress = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    const param = {
      module: 'account',
      action: 'txlist',
      address: address,
      sort: 'desc',
      apikey: ETHERSCAN_APIKEY
    };
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=${encodeURIComponent(param.module)}&action=${encodeURIComponent(param.action)}&address=${encodeURIComponent(param.address)}&sort=${encodeURIComponent(param.sort)}&apikey=${encodeURIComponent(param.apikey)}`)

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setTransactions(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  let addressProps = route?.params?.address;
  if (addressProps && route?.params?.searchNb === searchNb) {
    setSearchNb(searchNb + 1);
    setAddress(addressProps);
    setTransactions([]);
  }

  const renderItem = ({ item }) => {
    const icon = data.theme.type === 'dark' ? 
    require('../images/exchange_dark.png') :
    require('../images/exchange_light.png')

    return (
      <View style={styles.buttonItem}>

        <Image source={icon} style={styles.logoExchange} />
        <View>
          <TouchableOpacity onPress={() =>
            navigate('TransactionInfo', { item })
          }>
            <TextWT style={{color: data.theme.textColorPrimary}}>{`${item.value} ETH`}</TextWT>
          </TouchableOpacity>
          <TouchableOpacity>
            <TextWT style={[{
              color: data.theme.textColorSecondary
              }, styles.ToText]}>
                {`To: ${item.to}`}
            </TextWT>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const flatListItemSeparator = () => {
    return (
      <View
        style={styles.flatListSeparator}
      />
    );
  }

  const renderTitle = () => {
    return (
      <View style={styles.titleView}>
        <TextWT style={styles.title}>{i18n.t('Lookup.Title')}</TextWT>
      </View>
    )
  }

  const renderTextInput = () => {
    return (
      <TextInput
        style={[{
          backgroundColor: data.theme.bgColorSecondary,
          color: data.theme.textColorPrimary
        }, styles.textInput
        ]}
        placeholder={i18n.t('Lookup.Placeholder')}
        onChangeText={newAddress => setAddress(newAddress)}
        defaultValue={address}
      />
    )
  }

  const renderLookupButton = () => {
    return (
      <TouchableOpacity
        style={[{ backgroundColor: data.theme.colorAccentPrimary }, styles.button]}
        onPress={onPress}
        disabled={isLoading}
      >
        <Text style={[{ color:data.theme.textColorPrimary }, styles.textButton]}>
          {isLoading ? i18n.t('Lookup.ButtonLoading') : i18n.t('Lookup.Button')}
        </Text>
    </TouchableOpacity>
    )
  }

  const renderTextRecentTransactions = () => {
    return (
      transactions.result ?
        (<View style={styles.recentTextView}>
          <TextWT>{`${transactions.result.length} ${i18n.t('Lookup.Recent')}`}</TextWT>
        </View>) :
        <></>
    );
  }

  const renderFlatList = () => {
    return (
      <FlatList
        data={transactions.result}
        ItemSeparatorComponent = {flatListItemSeparator}
        renderItem={renderItem}
        keyExtractor={item => item.hash}
        extraData={transactions.result}
      />
    )
  }

  return (
    <ViewWT style={styles.container}>
      {renderTitle()}
      {renderTextInput()}
      {renderLookupButton()}
      {renderTextRecentTransactions()}
      {renderFlatList()}
    </ViewWT>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    alignItems: 'center',
    marginVertical: 20
  },
  recentTextView: {
    alignItems: 'center',
    marginVertical: 30
  },
  title: {
    fontSize: 12
  },
  textInput: {
    height: 50,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: '5%',
    paddingHorizontal: '5%',
    marginBottom: 20
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoExchange: {
    alignSelf: 'center',
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,

  },
  buttonItem: {
    flexDirection: 'row',
    margin: 10,
  },
  ToText: {
    fontSize: 12
  },
  flatListSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: Color.BLACK,
  }
})