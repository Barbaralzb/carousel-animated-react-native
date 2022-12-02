import React from "react"
import { Animated, View, StyleSheet, Dimensions, Text } from "react-native"

const {width, height} = Dimensions.get("screen")

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"]

const DATA = [
    {
        "key": "3571572",
        "title": "Multi-lateral intermediate moratorium",
        "description": "Ill back up the multi-byte XSS matrix, that should feed the SCSI application!",
        "image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
    },
    {
        "key": "3571747",
        "title": "Automated radical data-warehouse",
        "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
        "image": "https://image.flaticon.com/icons/png/256/3571/3571747.png"
    },
    {
        "key": "3571680",
        "title": "Inverse attitude-oriented system engine",
        "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
        "image": "https://image.flaticon.com/icons/png/256/3571/3571603.png"
    },
]

const Indicator = ({scrollX}) => {
    return (
        <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
            {DATA.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange : [0.8, 1.2, 0.8],
                    extrapolate: 'clamp'
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange : [0.6, 0.9, 0.6],
                    extrapolate: 'clamp'
                })
                return (
                <Animated.View
                    key={`indicator-${index}`}
                    style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "#fff",
                        opacity,
                        margin: 10,
                        transform : [
                            {
                                scale,
                            }
                        ]
                    }}
                />
                )
            })}
        </View>
    )
}

const Backdrop = ({scrollX}) => {
    const backgroundColor = scrollX.interpolate({
        inputRange : bgs.map((_, index) => index * width),
        outputRange : bgs.map((bg) => bg)
    })
    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFill,
                {
                    backgroundColor
                }
            ]}
        />
    )
}

const Square = ({scrollX}) => {

    const YOLO = Animated.modulo(Animated.divide(
        //Este modulo va de 0 a 1
        Animated.modulo(
            scrollX, width), 
            new Animated.Value(width)
    ), 1)

    const rotate = YOLO.interpolate({
        inputRange: [0, .5, 1],
        outputRange: ['35deg', '0deg', '35deg']
    })

    const translateX = YOLO.interpolate({
        inputRange: [0, .5, 1],
        outputRange: [0, -height, -0]
    })


    return (
        <Animated.View
            style={{
                height: height,
                width: height,
                backgroundColor: "#fff",
                borderRadius: 66,
                position: 'absolute',
                top: -height * 0.6,
                left: -height * 0.3,
                transform: [
                    {
                        rotate
                    },
                    {
                        translateX
                    }
                ]
            }}
        />
    )
}


const Swipe = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current

    return (
        <View style={styles.container}>
            <Backdrop scrollX={scrollX} />
            <Square scr scrollX={scrollX} />
            <Animated.FlatList
                data={DATA}
                keyExtractor={(item) => item.key}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x : scrollX}}}],
                    {useNativeDriver: false}
                )}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({item}) => {
                    return (
                        <View style={{ width, alignItems: "center", padding: 20 }}>
                            <View style={{ flex: .7, justifyContent: 'center' }}>
                                <item.image
                                    width={width / 2}
                                    height={width / 2}
                                    style={{
                                        resizeMode: "contain"
                                    }}
                                />
                            </View>
                            <View style={{flex : .3}}>
                                <Text style={{fontSize: 24, fontWeight: 800}}>{item.title}</Text>
                                <Text>{item.description}</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <Indicator scrollX={scrollX} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default Swipe
