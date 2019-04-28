<template>
  <div id="app">
    <m-header></m-header>
    <div class="tab">
			<router-link tag="div" class="tab-item" to="/recommend">
				<span class="tab-link">推荐</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/singer">
				<span class="tab-link">歌手</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/rank">
				<span class="tab-link">排行</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/search">
				<span class="tab-link">搜索</span>
			</router-link>
    </div>
    <keep-alive>
			<router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import Player from 'components/player/player'

export default {
  name: 'App',
  components: {
		MHeader,
		Player
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "common/stylus/variable"

	.tab
		display: flex
		height: 44px
		line-height: 44px
		font-size: $font-size-medium
		.tab-item
			flex: 1
			text-align: center
			.tab-link
				padding-bottom: 5px
				color: $color-text-l
			&.router-link-active
				.tab-link
					color: $color-theme
					border-bottom: 2px solid $color-theme
</style>
