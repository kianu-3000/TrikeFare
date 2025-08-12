
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SpecialSectionPage from './SpecialSection.js';
import { MapSection } from '../MapSection.js';
import { TaripaSection } from '../TaripaSection.js';
import { useDestination } from '../../../../context/AuthContext.js';
import { Constants } from '../../../../constants/constants.js';

const StackNav = createNativeStackNavigator();
export function SpecialPage() {
    const { startLoc, setStartLoc, destLoc, setDestLoc } = useDestination();
    // console.log(`Start Location: ${startLoc} \n End Location: ${destLoc}`);
    return (
        <StackNav.Navigator initialRouteName='SpecialSection'>

            <StackNav.Screen name='SpecialSection' options={{ headerShown: false }}>
                {(props) => <SpecialSectionPage {...props} />}
            </StackNav.Screen>

            <StackNav.Screen name='MapSection' options={{ headerShown: false }}>
                {(props) => <MapSection {...props} backRoute={'SpecialSection'} isSpecialPage={true} />}
            </StackNav.Screen>

            <StackNav.Screen name='TaripaSection' options={{ headerShown: false }}>
                {(props) => <TaripaSection {...props} routeName={'SpecialSection'} />}
            </StackNav.Screen>

        </StackNav.Navigator>
    )
}