import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { BleManager } from 'react-native-ble-plx';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isBluetoothActive: true
        };
        this.bleManager = new BleManager();
    }

    componentDidMount() {
        this.bleManager.onStateChange(this.handleBluetoothState);
        this.bleManager.state().then(this.handleBluetoothState);
    }
    
    componentWillUnmount() {
        this.bleManager.destroy();
        this.bleManager = null;
    }

    handleBluetoothState(state) {
        if (state === 'PoweredOn') {
            this.setState({ isBluetoothActive: true });
        } else {
            this.setState({ isBluetoothActive: false });
        }
    }

    async toogleBluetoothState() {
        // ANDROID Only
        const isBluetoothActive = this.state.isBluetoothActive;
        if (isBluetoothActive) {
            await this.bleManager.disable();
        } else {
            await this.bleManager.enable();
        }
    }

    render() {
        const { isBluetoothActive } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.toogleBluetoothState}>
                    <View style={[styles.bleContainer, isBluetoothActive ? styles.bleActive : styles.bleEnable]}>
                        <Text style={[styles.bleText, isBluetoothActive ? styles.bleActiveText : styles.bleEnableText]}>{isBluetoothActive ? 'Bluetooth On' : 'Bluetooth Not Available'}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.bleButtonsContainer}>
                    <RectButton style={styles.buttonScan}><Text>Start Scan</Text></RectButton>
                    <RectButton style={styles.buttonScan}><Text>Stop Scan</Text></RectButton>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },
    bleContainer: {
        width: '100%',
        textAlign: 'center',
        padding: 16,
        borderRadius: 16
    },
    bleText: {
        textAlign: 'center',
        fontSize: 18
    },
    bleActive: {
        backgroundColor: '#1BF516A0',
    },
    bleActiveText: {
        color: '#307E2E',
    },
    bleEnable: {
        backgroundColor: '#F51616A0',
    },
    bleEnableText: {
        color: '#5E0F0F',
    },
    bleButtonsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonScan: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 8
    }
});


export default Home;