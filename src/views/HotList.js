import { Dimensions, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
const { width, height } = Dimensions.get('window');
import SearchInput from '../component/SearchInput'
import MovieList from '../component/MovieList'
import SoonList from '../component/SoonList'
export default class HotList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SearchInput city={true} navigation={this.props.navigation}></SearchInput>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#000',
                        height: 2
                    }}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#000'
                    tabBarInactiveTextColor='#959595'
                    tabBarTextStyle={{ fontSize: 14 }}
                    locked={false}
                >
                    <View tabLabel='正在热映' style={{ marginBottom: 50 }}>
                        <MovieList navigation={this.props.navigation} />
                    </View>
                    <View tabLabel='即将上映' style={{ marginBottom: 50 }}>
                        <SoonList navigation={this.props.navigation} />
                    </View>
                </ScrollableTabView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        paddingTop: 25,
        backgroundColor: '#fff'
    }
})