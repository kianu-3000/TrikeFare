import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
import { CustomCard } from '../../../components/CustomCard';
import { CustomModal } from '../../../components/CustomModal';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getHistory } from '../../../services/service';
import CustomLoadingBar from '../../../components/CustomLoadingBar';
import CustomLoading from '../../../components/CustomLoading';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function History() {
    const [isModal, setIsModal] = useState(false);
    const [viewData, setViewData] = useState({});
    const [getHistoryData, setGetHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getHist = async () => {
        try {
            setIsLoading(true);
            const data = await getHistory();
            setIsLoading(false);
            setGetHistoryData(data.users);
            console.log("New data updateds:", getHistoryData);
        } catch (err) {
            console.log('Error getting data: ' + err)
        }
    }
    useEffect(() => {
        getHist();
    }, [])

    useEffect(() => {
        if (getHistoryData) {
            console.log("New data updateds:", getHistoryData);
        }
    }, [getHistoryData]);

    const openModal = (trigger, data) => {
        setIsModal(trigger);
        if (data) {
            viewData.name = data.passengerid
            viewData.date = data.created_at
            viewData.pickUpLoc = data.location_from
            viewData.dropOffLoc = data.location_to
            viewData.distance = data.distance
            viewData.fare = data.fare
        }
    }

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE, position: 'relative' }, globalStyle.container]}>
            {/* Header */}
            {
                isLoading ? <CustomLoading /> : null
            }
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>History</CustomText>
            </View>

            {/* Main Content */}
            <ScrollView style={style.main}>
                {
                    getHistoryData.map((data, index) => {
                        return (
                            <CustomCard details={data} key={index} pressFunc={() => openModal(true, data)} />
                        )
                    })
                }
            </ScrollView>
            {/* Modal Content */}
            {
                isModal ? <CustomModal pressFunc={() => openModal(false, {})}>
                    <View style={style.modalContainer}>
                        {/* modal top bar */}
                        <View style={style.modalTopBar}>
                            <Ionicons name={'person-circle'} size={64} color={Constants.COLORS.BLACK} />
                            <View style={{ marginLeft: Constants.MARGIN.SMALL }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name={'star'} size={30} color={Constants.COLORS.YELLOW} />
                                    <CustomText style={[style.textHeader, { fontSize: Constants.SIZE.MEDIUM }]}>5</CustomText>
                                </View>
                                <CustomText style={style.textHeader}>
                                    {viewData.name}
                                </CustomText>
                                <CustomText style={style.textHeader}>
                                    {viewData.plateNumber}
                                </CustomText>
                            </View>
                        </View>
                        {/* modal details */}
                        <View style={{ paddingTop: Constants.PADDING.SMALL }}>
                            <CustomText style={style.text}>
                                Date: <CustomText style={[style.detailsText]}>{viewData.date}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Time: <CustomText style={[style.detailsText]}>{viewData.time}</CustomText>
                            </CustomText>
                            <CustomText style={[style.text]}>
                                Pickup Location: <CustomText style={[style.detailsText]}>{viewData.pickUpLoc}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Drop-off Location: <CustomText style={[style.detailsText]}>{viewData.dropOffLoc}</CustomText>
                            </CustomText>
                            <CustomText style={style.text}>
                                Fare: <CustomText style={[style.detailsText]}>{viewData.fare}</CustomText>
                            </CustomText>
                        </View>

                    </View>
                </CustomModal> : null
            }
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        padding: Constants.PADDING.SMALL,
        overflow: 'scroll'
    },
    text: {
        fontFamily: 'Montserrat'
    },
    textHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR
    },
    modalContainer: {
        flex: 1,
    },
    modalTopBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsText: {
        fontFamily: 'Montserrat-Bold'
    }
});