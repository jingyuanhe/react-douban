import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, { Component } from 'react';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
const { width, height } = Dimensions.get('window');
import Star from '../component/Star';
const movieInfo = 'https://douban.uieee.com/v2/movie/subject';
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 3,
      data: [],
      ready: true,
    }
  }
  componentDidMount() {
    const { state: { params: { id } } } = this.props.navigation;
    let formData = new FormData();
    formData.append('apikey', '0b2bdeda43b5688921839c8ecb20399b')
    formData.append('city', '北京')
    formData.append('client', 'something')
    formData.append('udid', 'dddddddddddddddddddddd')
    fetch(`${movieInfo}/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          ready: false,
          data: data,
        });
      })
  }
  render() {
    const {
      title,
      year,
      countries,
      genres,
      summary,
      ratings_count,
      mainland_pubdate,
      durations,
      photos,
      images,
      casts,
      rating,
      popular_comments
    } = this.state.data;
    return (
      <ScrollView bounces={false} scrollEventThrottle={1}>
        {
          this.state.ready ? <ActivityIndicator size="large" style={{ marginTop: 100 }}></ActivityIndicator> :
            <View style={{ backgroundColor: '#F4F9F5' }}>
              <View style={styles.poster}>
                <Image source={{ uri: images.large }} style={{
                  width: width / 2,
                  height: 280
                }} />
              </View>
              <View style={styles.movieInfo}>
                <View>
                  <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 5 }}>{title}</Text>
                  <Text style={styles.smallFont}>{year} / {countries} / {genres}</Text>
                  <Text style={styles.smallFont}>上映时间: {mainland_pubdate}({countries})</Text>
                  <Text style={styles.smallFont}>片长: {durations}</Text>
                </View>
                <View style={styles.infoSquare}>
                  <Text style={styles.smallFont}>豆瓣评分</Text>
                  <Text style={{ fontSize: 20, fontWeight: '600' }}>{rating.average}</Text>
                  <View style={{ marginBottom: 3, marginTop: 2 }}>
                    <Star value={rating.stars} width={11} height={11} />
                  </View>
                  <Text style={styles.smallFont}>{ratings_count}人</Text>
                </View>
              </View>
              <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
                <TouchableOpacity style={{
                  padding: 10,
                  paddingLeft: 50,
                  paddingRight: 50,
                  borderColor: '#FFAE36',
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                  <Text style={{ color: '#FFAE36' }}>想看</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  padding: 10,
                  paddingLeft: 60,
                  paddingRight: 60,
                  borderColor: '#FFAE36',
                  borderWidth: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                }}>
                  <Text style={{ color: '#FFAE36' }}>看过</Text>
                  <View style={{ marginTop: 2 }}>
                    <Star value="50" width={10} height={10} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ paddingRight: 10, paddingLeft: 10 }}>
              <View style={{ marginTop: 30, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
                <Text>选座购票</Text>
                <TouchableOpacity
                  onPress={() => alert('点击了购买')}>
                  <Text style={{ color: '#FF645A', fontSize: 10 }}>$33起></Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 12, marginTop: 20, color: '#9B9B9B', }}>剧情简介</Text>
                <View>
                  <Text style={styles.introduce} numberOfLines={this.state.num} ellipsizeMode='tail'
                  >{summary}
                  </Text>
                  <TouchableOpacity onPress={() => {
                    this.setState({ num: 0 });
                  }}><Text style={{ color: "#2CBA48" }}>{this.state.num != 0 && '展开'}</Text></TouchableOpacity>
                </View>
              </View>
              </View>
            </View>
        }
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  poster: {
    backgroundColor: '#2A362C',
    height: 310,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'

  },
  introduce: {
    color: '#343334',
  },
  movieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  infoSquare: {
    backgroundColor: '#FFFFFF',
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9B9B9B',
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.5,

  },
  smallFont: {
    fontSize: 11,
    color: '#9B9B9B',
  }
})