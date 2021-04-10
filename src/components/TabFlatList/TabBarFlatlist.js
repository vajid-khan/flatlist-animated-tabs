import React, { useRef, useState, useLayoutEffect } from "react";
import {Text, StatusBar, View, FlatList,Image, Dimensions, TouchableOpacity} from "react-native";
import Animated,{interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const {width, height} = Dimensions.get('window')

const DATA = [
	{
		title: 'abstract',
		img: require('../../images/abstract.jpg')
	},
	{
		title: 'animal',
		img: require('../../images/animal.jpg')
	},
	{
		title: 'ice',
		img: require('../../images/ice.jpg')
	},
	{
		title: 'mountains',
		img: require('../../images/mountain.jpg')
	},
	{
		title: 'girl',
		img: require('../../images/girl.jpg')
	},
];

const TabBarFlatList = () => {
	
	const containerRef = useRef();
	const flatListRef = useRef();
	const scrollX = useSharedValue(0);
	const [measures, setMeasures] = useState([]);
	const indicatorsRef = DATA.map(_=> useRef());

	useLayoutEffect(() => {
		setTimeout(() => {
			const _measures = [];
			indicatorsRef.map(ref => {
				ref.current.measureLayout(containerRef.current, (x,y, width) => {
					_measures.push({
						x,y,width
					});
					if(_measures.length === DATA.length){
						setMeasures(_measures)
					}
				});
			})
		}, 1000);
	},[])

	const onScroll = useAnimatedScrollHandler({
		onScroll:({contentOffset:{x}}) => {
			scrollX.value = x
		},
	});

	const style = useAnimatedStyle(()=> {
		const inputRange = DATA.map((_, index) => index*width)
		if(measures.length !== inputRange.length){
			return {}
		}
		return {
			width: interpolate(scrollX.value, inputRange, measures.map(m => m.width)),
			transform:[{
				translateX: interpolate(scrollX.value, inputRange, measures.map(m => m.x))
			}]
		}
	})

	return (
		<View>
			<StatusBar hidden/>
			<AnimatedFlatList
				data={DATA}
				horizontal
				ref={flatListRef}
				pagingEnabled
				bounces={false}
				onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
				keyExtractor={item=> item.title}
				renderItem = {({item}) => {
					return (
						<View
							style={{height,width}}
						>
							<Image
								source={item.img}
								style={{flex:1,height:undefined, width:undefined,resizeMode:'cover'}}
							/>
						</View>
					)
				}}
			/>
			<View
				style={[{position:'absolute'},{marginTop:50,marginHorizontal:10}]}
			>
				<View style={{flexDirection:'row',width:width-20,justifyContent:'space-between'}} ref={containerRef}>
					{
						DATA.map((data, index) => {
							return (
								<View 
									key={data.title}
								>
									<TouchableOpacity
										onPress={()=> flatListRef.current?.scrollToIndex({index})}
										ref={indicatorsRef[index]}
									>
										<Text
											style={{color:'#fff',fontSize:80/DATA.length}}
											numberOfLines={1}
										>
											{data.title.toUpperCase()}</Text>
									</TouchableOpacity>
								</View>
							)
						})
					}
				</View>
			{
				measures.length ? (
					<Animated.View
						style={[{
							height:2,
							borderRadius:3,
                            width: 0,
							backgroundColor:'#fff',
						},style]}
					/>
				):null
			}
			</View>
		</View>
	)
}
export {TabBarFlatList};
