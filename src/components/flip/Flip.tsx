import React, { useState } from "react";
import {processColor} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';

const colors = ['gold', 'black']

interface Props{}

const Flip:React.FC<Props> = (props) => {

    const [isFlip, setFlip] = useState(0);
    const animatedValue = useSharedValue(0);
    const btnColor = useSharedValue(colors[1]);
    const containerColor = useSharedValue(colors[0]);

    const flip = () => {
        // @ts-ignore
        btnColor.value = withTiming(processColor(colors[isFlip === 0?0:1]), {duration:3000});
        //@ts-ignore
        containerColor.value = withTiming(processColor(colors[isFlip === 0?1:0]), {duration:3000});
        animatedValue.value = withTiming(isFlip === 0 ? 1: 0,{duration:3000});
        setFlip(f=> f === 0? 1:0)
    }

    const style = useAnimatedStyle(() => {
        const input = [0, 0.5, 1]
        return {
            backgroundColor: btnColor.value,
            transform:[{perspective:400},
                {
                translateY: interpolate(animatedValue.value, input, [0,-250,0], Extrapolate.CLAMP),
            },{
                rotateY: interpolate(animatedValue.value, input, [0,-Math.PI/4,-Math.PI], Extrapolate.CLAMP),
            },{
                scale: interpolate(animatedValue.value, input, [1,10,1], Extrapolate.CLAMP)
            }]
        }
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: containerColor.value,
        }
    });

    return (
        <Animated.View style={[containerStyle,{flex:1,backgroundColor:'gold', justifyContent:'flex-end',paddingBottom:60}]}>
            <Animated.View style={[style,{backgroundColor:'black',height:80, width:80, borderRadius:80, alignSelf:'center', justifyContent:'center'}]}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={flip}
                    style={{justifyContent:'center', alignItems:'center'}}
                >
                    <Icon name={'arrow-left'} color={"white"} size={40}/>
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
    )
}

export {Flip};