import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
	constructor({id, mid, singer, name, album, duration, image, url}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}

	getLyric() {
		if (this.lyric) {
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve, reject) => {
			getLyric(this.mid).then((res) => {
				if (res.retcode === ERR_OK) {
					this.lyric = Base64.decode(res.lyric)
					resolve(this.lyric)
				} else {
          reject('no lyric')
				}
			})
		})
	}
}

export function createSong(musicData, vkey) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=5739245663&vkey=${vkey}&uin=0&fromtag=66`
	})
}

 export function filterSinger(singer) {
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
		// console.log(s.name)
	})
	return ret.join('/')
}

// http://dl.stream.qqmusic.qq.com/C400000sU9jC3bN2dY.m4a?guid=5739245663&vkey=EFA894960EC25C45664A81E3DA6D91CCA34773B3910BA6B18B8D883C7EBA9DBED88E42B0000C697F06D5A7349B5D7CCB4ED21BE1025B6ACA&uin=0&fromtag=66

// http://dl.stream.qqmusic.qq.com/C400000sU9jC3bN2dY.m4a?guid=5739245663&vkey=3E67FD768890ACA60DCEEF697D78BAFDBE78791C03340C1D60A24BFD9B728FBDB62C30838CABA2CA0739ED9EA881B47529A3AA8C57E36A84&uin=5738&fromtag=66

// http://dl.stream.qqmusic.qq.com/C400000sU9jC3bN2dY.m4a?guid=5739245663&vkey=A191628C8DB67F31AED8B780D7478FB6EAE9339774F822D77C822D54BC2E8B23AE5427A43745BB253B2D1301DFF330C81AA68DF8E302BDB4&uin=0&fromtag=66