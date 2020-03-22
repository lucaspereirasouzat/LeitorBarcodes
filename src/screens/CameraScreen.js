import React, { Component } from 'react';
import {
    Alert
} from 'react-native';
import { CameraKitCamera, CameraKitCameraScreen } from 'react-native-camera-kit';
// import CheckingScreen from './CheckingScreen';


export default class CameraScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            example: undefined
        };
    }

    async componentDidMount() {
        let response = await CameraKitCamera.requestDeviceCameraAuthorization();
    }

    onBottomButtonPressed(event) {
        const captureImages = JSON.stringify(event.captureImages);
        Alert.alert(
            `${event.type} button pressed`,
            `${captureImages}`,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }

    onReadCode = (res) => {
        console.log('re', res);

        if (res.nativeEvent.codeStringValue) {
            this.props.navigation.navigate('Product', {
                code: res.nativeEvent.codeStringValue
            })
        }
    }

    render() {

        return (
            <CameraKitCameraScreen
                actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
                // flashImages={{
                //   on: require('./../images/flashOn.png'),
                //   off: require('./../images/flashOff.png'),
                //   auto: require('./../images/flashAuto.png')
                // }}

                showFrame={true}
                scanBarcode={true}
                laserColor={"blue"}
                surfaceColor={"black"}
                frameColor={"yellow"}
                onReadCode={this.onReadCode}
                hideControls={true}

                // offsetForScannerFrame = {10}  
                // heightForScannerFrame = {300}  
                colorForScannerFrame={'blue'}
            />
        );
    }
}