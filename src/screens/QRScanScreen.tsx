import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import i18n from '../utils/i18n';
import { ViewWT } from '../components';
import Color from '../utils/Color';

export const QRScanScreen = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [searchNb, setSearchNb] = useState<number>(0);

  const { navigate } = useNavigation();

  useEffect(() => {
    navigate('Lookup', {address, searchNb}, searchNb)
  }, [searchNb]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setAddress(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderFooter = () => {
    return (
      <ViewWT>
        <View style={styles.addressView}>
          <Text style={styles.addressText}>{i18n.t('QRScan.Address')} {address}</Text>
        </View>
        <View style={styles.viewButtonStyle}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.textButtonStyle}>{i18n.t('QRScan.Rescan')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              setSearchNb(searchNb + 1)
            }}
          >
            <Text style={styles.textButtonStyle}>{i18n.t('QRScan.Lookup')}</Text>
          </TouchableOpacity>
        </View>
      </ViewWT>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end'    
  },
  addressView: {
    backgroundColor: Color.BLACK
  },
  addressText: {
    color: Color.WHITE
  },
  buttonStyle: {
    backgroundColor: Color.BLACK,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 25,
    borderRadius: 5,
    width: 140,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'magenta'
  },
  textButtonStyle: {
    color: Color.WHITE
  },
  viewButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25
  }
});
