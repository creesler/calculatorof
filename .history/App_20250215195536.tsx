import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FractionCalculator from './screens/FractionCalculator';
import MixedNumbersCalculator from './screens/MixedNumbersCalculator';
import DecimalConverter from './screens/DecimalConverter';
import BigNumberCalculator from './screens/BigNumberCalculator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Fraction Calculator' }}
        />
        <Stack.Screen name="BasicFractions" component={FractionCalculator} />
        <Stack.Screen name="MixedNumbers" component={MixedNumbersCalculator} />
        <Stack.Screen name="DecimalConverter" component={DecimalConverter} />
        <Stack.Screen name="BigNumbers" component={BigNumberCalculator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 