
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera, Product } from "../screens";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Camera" options={{ title: 'Camera' }} component={Camera} />
                <Stack.Screen name="Product" options={{ title: 'Detalhes' }} component={Product} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;