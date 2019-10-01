import Vue from 'vue'
import VueRouter from 'vue-router'
import LatestMovie from '@/components/LatestMovie'
import Movie from '@/components/Movie'

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
			path: '/',
			name: 'LatestMovie',
			components: LatestMovie
		},
		{
			path: '/movie/:id',
			name: 'Movie',
			props: true,
			components: Movie
		}
	]
})